from fastapi import APIRouter, Depends, Query, status, Path
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from app.core.dependencies import (
    get_db, get_current_user, get_current_admin,
    get_current_super_admin
)
from app.services.user_service import UserService
from app.schemas.user import (
    UserResponse, UserUpdate, UserChangePassword,
    UserDeleteAccount, UserUpdateRole, UserCreate
)
from app.models.user import User
from app.utils.enums import UserRole

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Get current user profile"""
    user_service = UserService(db)
    return user_service.get_user_profile(current_user)


@router.put("/me", response_model=UserResponse)
def update_my_profile(
    update_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Update current user profile"""
    user_service = UserService(db)
    return user_service.update_profile(current_user, update_data)


@router.patch("/me", response_model=UserResponse)
def partial_update_my_profile(
    update_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Partially update current user profile (PATCH method)"""
    user_service = UserService(db)
    return user_service.update_profile(current_user, update_data)


@router.post("/me/change-password")
def change_password(
    password_data: UserChangePassword,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Change current user password"""
    user_service = UserService(db)
    return user_service.change_password(current_user, password_data)


@router.delete("/me", status_code=status.HTTP_200_OK)
def delete_my_account(
    delete_data: UserDeleteAccount,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Delete current user account"""
    user_service = UserService(db)
    return user_service.delete_account(current_user, delete_data)


@router.get(
    "",
    dependencies=[Depends(get_current_admin)]
)
def get_all_users(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    role: Optional[UserRole] = Query(None, description="Filter by role"),
    search: Optional[str] = Query(None, description="Search in name or email"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    has_orders: Optional[bool] = Query(None, description="Filter by order activity"),
    registered_since: Optional[str] = Query(
        None,
        description="Filter by registration date: today, week, month, 3months, older"
    ),
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get all users (admin only)"""
    user_service = UserService(db)
    return user_service.get_all_users(
        current_user=current_user,
        page=page,
        limit=limit,
        role=role,
        search=search,
        is_active=is_active,
        has_orders=has_orders,
        registered_since=registered_since
    )


@router.post(
    "",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_admin)]
)
def create_user(
    user_data: UserCreate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Create new user (admin only)"""
    user_service = UserService(db)
    return user_service.create_user(user_data, current_user)


@router.get(
    "/{user_id}",
    response_model=UserResponse,
    dependencies=[Depends(get_current_admin)]
)
def get_user(
    user_id: int = Path(..., ge=1, description="User ID"),
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Get user by ID (admin only)"""
    user_service = UserService(db)
    return user_service.get_user_by_id(user_id, current_user)


@router.put(
    "/{user_id}",
    response_model=UserResponse,
    dependencies=[Depends(get_current_admin)]
)
def update_user(
    user_id: int = Path(..., ge=1, description="User ID"),
    update_data: UserUpdate = None,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Update user (admin only)"""
    user_service = UserService(db)
    return user_service.update_user(user_id, update_data, current_user)


@router.patch(
    "/{user_id}",
    response_model=UserResponse,
    dependencies=[Depends(get_current_admin)]
)
def partial_update_user(
    user_id: int = Path(..., ge=1, description="User ID"),
    update_data: UserUpdate = None,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Partially update user (admin only) - PATCH method"""
    user_service = UserService(db)
    return user_service.update_user(user_id, update_data, current_user)


@router.patch(
    "/{user_id}/role",
    response_model=UserResponse,
    dependencies=[Depends(get_current_super_admin)]
)
def update_user_role(
    user_id: int = Path(..., ge=1, description="User ID"),
    role_data: UserUpdateRole = None,
    current_user: User = Depends(get_current_super_admin),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Update user role (super admin only)"""
    user_service = UserService(db)
    return user_service.update_user_role(user_id, role_data, current_user)


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_current_admin)]
)
def delete_user(
    user_id: int = Path(..., ge=1, description="User ID"),
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Delete/deactivate user (admin only)"""
    user_service = UserService(db)
    return user_service.delete_user(user_id, current_user)


@router.post(
    "/{user_id}/restore",
    response_model=UserResponse,
    dependencies=[Depends(get_current_admin)]
)
def restore_user(
    user_id: int = Path(..., ge=1, description="User ID"),
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Restore deactivated user (admin only)"""
    user_service = UserService(db)
    return user_service.restore_user(user_id, current_user)


@router.get("/roles/all", dependencies=[Depends(get_current_admin)])
def get_all_roles() -> Dict[str, Any]:
    """Get all available user roles"""
    return {
        "roles": [
            {"value": role.value, "label": role.value.replace("_", " ").title()}
            for role in UserRole
        ]
    }