from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Tuple, Dict, Any
import logging

from app.repositories.user_repository import UserRepository
from app.core.security import (
    verify_password, get_password_hash,
    create_access_token, create_refresh_token,
    decode_access_token
)
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.user import UserResponse, UserCreate
from app.models.user import User
from app.utils.enums import UserRole

logger = logging.getLogger(__name__)


class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repo = UserRepository(db)

    def login(self, credentials: LoginRequest) -> Tuple[TokenResponse, UserResponse]:
        """Authenticate user and generate token"""
        user = self.user_repo.get_by_email(credentials.email)

        if not user:
            logger.warning(f"Login attempt with non-existent email: {credentials.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )

        if not user.is_active:
            logger.warning(f"Login attempt for inactive user: {credentials.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Account is deactivated"
            )

        if not verify_password(credentials.password, user.password):
            logger.warning(f"Failed login attempt for user: {credentials.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )

        access_token = create_access_token(
            subject=str(user.id),
            data={"email": user.email, "role": user.role.value}
        )

        refresh_token = create_refresh_token(str(user.id))

        token_response = TokenResponse(
            access_token=access_token,
            token_type="bearer",
            refresh_token=refresh_token,
            expires_in=1800
        )

        user_response = UserResponse.model_validate(user)

        logger.info(f"Successful login for user: {user.email}")
        return token_response, user_response

    def register(self, user_data: RegisterRequest) -> Tuple[TokenResponse, UserResponse]:
        """Register new user"""
        existing_user = self.user_repo.get_by_email(user_data.email)
        if existing_user:
            logger.warning(f"Registration attempt with existing email: {user_data.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        user_create = UserCreate(
            email=user_data.email,
            password=user_data.password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            role=UserRole.CUSTOMER
        )

        hashed_password = get_password_hash(user_data.password)
        user_dict = user_create.model_dump()
        user_dict["password"] = hashed_password

        new_user = self.user_repo.create(user_dict)

        access_token = create_access_token(
            subject=str(new_user.id),
            data={"email": new_user.email, "role": new_user.role.value}
        )

        refresh_token = create_refresh_token(str(new_user.id))

        token_response = TokenResponse(
            access_token=access_token,
            token_type="bearer",
            refresh_token=refresh_token,
            expires_in=1800
        )

        user_response = UserResponse.model_validate(new_user)

        logger.info(f"New user registered: {new_user.email}")
        return token_response, user_response

    def verify_token(self, user: User) -> UserResponse:
        """Verify token and return user info"""
        return UserResponse.model_validate(user)

    def refresh_token(self, refresh_token: str) -> TokenResponse:
        """Refresh access token using refresh token"""
        payload = decode_access_token(refresh_token)
        if not payload or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )

        user_id = payload.get("sub")
        user = self.user_repo.get_by_id(int(user_id))

        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )

        access_token = create_access_token(
            subject=str(user.id),
            data={"email": user.email, "role": user.role.value}
        )

        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            refresh_token=refresh_token,
            expires_in=1800
        )

    def logout(self) -> Dict[str, Any]:
        """Logout user (client should discard tokens)"""
        return {"message": "Successfully logged out"}