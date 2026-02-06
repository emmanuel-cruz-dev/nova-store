from typing import Generator, Optional, Callable
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.core.security import get_subject_from_token
from app.repositories.user_repository import UserRepository
from app.models.user import User
from app.utils.enums import UserRole

security = HTTPBearer(auto_error=False)


def get_db() -> Generator[Session, None, None]:
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> User:
    """Get current authenticated user from JWT token"""

    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials

    try:
        subject = get_subject_from_token(token)

        user_repo = UserRepository(db)

        if subject.isdigit():
            user = user_repo.get_by_id(int(subject))
        else:
            user = user_repo.get_by_email(subject)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Inactive user",
                headers={"WWW-Authenticate": "Bearer"},
            )

        request.state.user = user

        return user

    except HTTPException:
        raise
    except Exception as e:
        print(f"Authentication error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """Get current active user (alias for clarity)"""
    return current_user


def get_optional_user(
    request: Request,
    db: Session = Depends(get_db),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> Optional[User]:
    """Get current user if authenticated, None otherwise (for public endpoints)"""
    if credentials is None:
        return None

    try:
        return get_current_user(request, db, credentials)
    except HTTPException:
        return None


def require_role(*allowed_roles: UserRole) -> Callable:
    """Dependency factory to require specific roles"""
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Required roles: {', '.join([r.value for r in allowed_roles])}"
            )
        return current_user
    return role_checker


def get_current_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    """Get current user if admin or super_admin"""
    if current_user.role not in [UserRole.ADMIN, UserRole.SUPER_ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin or Super Admin access required"
        )
    return current_user


def get_current_super_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    """Get current user if super_admin only"""
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super Admin access required"
        )
    return current_user


def check_permission(user: User, required_role: UserRole) -> bool:
    """Check if user has required role level"""
    role_hierarchy = {
        UserRole.CUSTOMER: 1,
        UserRole.ADMIN: 2,
        UserRole.SUPER_ADMIN: 3
    }

    user_level = role_hierarchy.get(user.role, 0)
    required_level = role_hierarchy.get(required_role, 0)

    return user_level >= required_level


def require_permission(required_role: UserRole) -> Callable:
    """Dependency factory for role hierarchy (higher or equal level)"""
    def permission_checker(current_user: User = Depends(get_current_user)) -> User:
        if not check_permission(current_user, required_role):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Required permission level: {required_role.value}"
            )
        return current_user
    return permission_checker