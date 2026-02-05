from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.repositories.user_repository import UserRepository
from app.schemas.user import UserUpdate, UserResponse
from app.models.user import User


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