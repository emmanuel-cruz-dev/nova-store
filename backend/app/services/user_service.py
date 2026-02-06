from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Dict, Any, Optional

from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, get_password_hash
from app.schemas.user import UserUpdate, UserResponse, UserChangePassword
from app.models.user import User
from app.utils.enums import UserRole


class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repo = UserRepository(db)

    def get_user_profile(self, user: User) -> UserResponse:
        """Get current user profile"""
        return UserResponse.model_validate(user)

    def update_profile(self, user: User, update_data: UserUpdate) -> UserResponse:
        """Update current user profile"""
        update_dict = update_data.model_dump(exclude_unset=True)

        if 'email' in update_dict and update_dict['email'] != user.email:
            existing = self.user_repo.get_by_email(update_dict['email'])
            if existing and existing.id != user.id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )

        updated_user = self.user_repo.update(user, update_dict)
        return UserResponse.model_validate(updated_user)

    def change_password(self, user: User, password_data: UserChangePassword) -> Dict[str, Any]:
        """Change current user password"""
        if not verify_password(password_data.current_password, user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect"
            )

        hashed_password = get_password_hash(password_data.new_password)
        updated_user = self.user_repo.update_password(user, hashed_password)

        return {
            "message": "Password changed successfully",
            "user": UserResponse.model_validate(updated_user)
        }

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
        """Get all users with filters (admin only)"""
        if not current_user.is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin access required"
            )

        skip = (page - 1) * limit

        users, total = self.user_repo.get_all(
            skip=skip,
            limit=limit,
            role=role,
            search=search,
            is_active=is_active,
            registered_since=registered_since
        )

        users_response = [UserResponse.model_validate(user) for user in users]

        return {
            "users": users_response,
            "total": total,
            "page": page,
            "limit": limit,
            "pages": (total + limit - 1) // limit if limit > 0 else 0
        }