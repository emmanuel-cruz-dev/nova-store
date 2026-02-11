from typing import Generator, Optional, Callable
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.core.security import get_subject_from_token
from app.repositories.user_repository import UserRepository
from app.models.user import User
from app.utils.permissions import has_admin_access, is_super_admin, check_permission
from app.utils.enums import UserRole

security = HTTPBearer(auto_error=False)


def get_db() -> Generator[Session, None, None]:
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
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        subject = get_subject_from_token(credentials.credentials)
        user_repo = UserRepository(db)

        user = user_repo.get_by_id(int(subject)) if subject.isdigit() else user_repo.get_by_email(subject)

        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive",
            )

        request.state.user = user
        return user
    except HTTPException:
        raise
    except Exception as e:
        print(f"Auth error: {e}")
        raise HTTPException(status_code=401, detail="Invalid credentials")

def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    return current_user


def get_optional_user(
    request: Request,
    db: Session = Depends(get_db),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> Optional[User]:
    if credentials is None:
        return None

    try:
        return get_current_user(request, db, credentials)
    except HTTPException:
        return None


def require_role(*allowed_roles: UserRole) -> Callable:
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
    if not has_admin_access(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin or Super Admin access required"
        )
    return current_user


def get_current_super_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    if not is_super_admin(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super Admin access required"
        )
    return current_user


def require_permission(required_role: UserRole) -> Callable:
    def permission_checker(current_user: User = Depends(get_current_user)) -> User:
        if not check_permission(current_user.role, required_role):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Insufficient permissions. Required: {required_role.value}"
            )
        return current_user
    return permission_checker