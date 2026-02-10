from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Dict, Any, Optional

from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, get_password_hash
from app.schemas.user import (
    UserResponse, UserUpdate, UserChangePassword,
    UserUpdateRole
)
from app.models.user import User
from app.utils.permissions import can_manage_user, has_admin_access, is_super_admin
from app.utils.pagination import calculate_skip, create_pagination_response, validate_pagination_params
from app.utils.enums import UserRole

class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repo = UserRepository(db)


    def get_user_profile(self, user: User) -> UserResponse:
        return UserResponse.model_validate(user)

    def update_profile(self, user: User, update_data: UserUpdate) -> UserResponse:
        update_dict = update_data.model_dump(exclude_unset=True)

        if 'email' in update_dict and update_dict['email'] != user.email:
            existing = self.user_repo.get_by_email(update_dict['email'])
            if existing:
                raise HTTPException(status_code=400, detail="Email already registered")

        updated_user = self.user_repo.update(user, update_dict)
        return UserResponse.model_validate(updated_user)

    def change_password(self, user: User, password_data: UserChangePassword) -> Dict[str, Any]:
        if not verify_password(password_data.current_password, user.password):
            raise HTTPException(status_code=400, detail="Current password is incorrect")

        hashed_password = get_password_hash(password_data.new_password)
        self.user_repo.update_password(user, hashed_password)
        return {"message": "Password changed successfully"}


    def get_all_users(
        self,
        current_user: User,
        page: int = 1,
        limit: int = 10,
        role: Optional[UserRole] = None,
        search: Optional[str] = None,
        is_active: Optional[bool] = True,
        registered_since: Optional[str] = None
    ) -> Dict[str, Any]:
        if not has_admin_access(current_user):
            raise HTTPException(status_code=403, detail="Admin access required")

        page, limit = validate_pagination_params(page, limit)
        skip = calculate_skip(page, limit)

        users, total = self.user_repo.get_all(
            skip=skip, limit=limit, role=role,
            search=search, is_active=is_active,
            registered_since=registered_since
        )

        items = []
        for u in users:
            user_data = UserResponse.model_validate(u).model_dump()
            user_data["order_count"] = len(u.orders)
            items.append(user_data)

        return create_pagination_response(items, total, page, limit)

    def get_user_by_id(self, user_id: int, current_user: User) -> UserResponse:
        target_user = self.user_repo.get_by_id(user_id)
        if not target_user:
            raise HTTPException(status_code=404, detail="User not found")

        self._check_management_permission(current_user, target_user)
        return UserResponse.model_validate(target_user)

    def update_user_role(self, user_id: int, role_data: UserUpdateRole, current_user: User) -> UserResponse:
        if not is_super_admin(current_user):
            raise HTTPException(status_code=403, detail="Only super admins can change roles")

        target_user = self.user_repo.get_by_id(user_id)
        if not target_user:
            raise HTTPException(status_code=404, detail="User not found")

        if target_user.id == current_user.id:
            raise HTTPException(status_code=400, detail="Cannot change your own role")

        updated_user = self.user_repo.update(target_user, {"role": role_data.role})
        return UserResponse.model_validate(updated_user)

    def delete_user(self, user_id: int, current_user: User, hard: bool = False) -> Dict[str, str]:
        target_user = self.user_repo.get_by_id(user_id)
        if not target_user:
            raise HTTPException(status_code=404, detail="User not found")

        self._check_management_permission(current_user, target_user)

        if target_user.id == current_user.id:
            raise HTTPException(status_code=400, detail="Cannot delete yourself from here")

        if hard and is_super_admin(current_user):
            self.user_repo.hard_delete(target_user)
        else:
            self.user_repo.soft_delete(target_user)

        return {"message": f"User {'permanently' if hard else 'soft'} deleted successfully"}


    def _check_management_permission(self, manager: User, target: User):
        if manager.id == target.id:
            return

        if not can_manage_user(manager, target):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions to manage this user (Hierarchy violation)"
            )