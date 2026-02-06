from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.core.dependencies import get_db, get_current_user, get_optional_user
from app.services.auth_service import AuthService
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse, RefreshTokenRequest
from app.schemas.user import UserResponse
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login")
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Login user and get access token"""
    auth_service = AuthService(db)
    token, user = auth_service.login(credentials)

    return {
        "tokens": token.model_dump(),
        "user": user.model_dump()
    }


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    user_data: RegisterRequest,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Register new user"""
    auth_service = AuthService(db)
    token, user = auth_service.register(user_data)

    return {
        "tokens": token.model_dump(),
        "user": user.model_dump(),
        "message": "Registration successful"
    }


@router.post("/refresh")
def refresh_token(
    refresh_request: RefreshTokenRequest = Body(...),
    db: Session = Depends(get_db)
) -> TokenResponse:
    """Refresh access token using refresh token"""
    auth_service = AuthService(db)
    return auth_service.refresh_token(refresh_request.refresh_token)


@router.post("/logout")
def logout() -> Dict[str, Any]:
    """Logout user"""
    auth_service = AuthService(None)
    return auth_service.logout()


@router.get("/me", response_model=UserResponse)
def get_current_user_info(
    current_user: User = Depends(get_current_user)
) -> UserResponse:
    """Get current authenticated user info"""
    auth_service = AuthService(None)
    return auth_service.verify_token(current_user)


@router.get("/check")
def check_auth(
    user: User = Depends(get_optional_user)
) -> Dict[str, Any]:
    """Check authentication status"""
    if user:
        return {
            "authenticated": True,
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role.value,
                "first_name": user.first_name,
                "last_name": user.last_name
            },
            "is_admin": user.is_admin
        }
    return {"authenticated": False}