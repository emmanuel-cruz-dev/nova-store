from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime, timedelta, timezone

from app.models.user import User
from app.utils.enums import UserRole


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return self.db.query(User).filter(User.id == user_id).first()

    def get_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        return self.db.query(User).filter(
            User.email == email,
            User.is_active == True
        ).first()

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        role: Optional[UserRole] = None,
        search: Optional[str] = None,
        is_active: Optional[bool] = None,
        registered_since: Optional[str] = None
    ) -> Tuple[List[User], int]:
        """Get all users with filters and pagination"""
        query = self.db.query(User)

        if is_active is not None:
            query = query.filter(User.is_active == is_active)
        else:
            query = query.filter(User.is_active == True)

        if role:
            query = query.filter(User.role == role)

        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    User.first_name.ilike(search_pattern),
                    User.last_name.ilike(search_pattern),
                    User.email.ilike(search_pattern)
                )
            )

        if registered_since:
            now = datetime.now(timezone.utc)
            cutoff = None

            if registered_since == "today":
                cutoff = datetime(now.year, now.month, now.day)
            elif registered_since == "week":
                cutoff = now - timedelta(days=7)
            elif registered_since == "month":
                cutoff = now - timedelta(days=30)
            elif registered_since == "3months":
                cutoff = now - timedelta(days=90)
            elif registered_since == "older":
                cutoff = now - timedelta(days=90)
                query = query.filter(User.created_at < cutoff)
                cutoff = None

            if cutoff:
                query = query.filter(User.created_at >= cutoff)

        total = query.count()

        users = query.order_by(User.created_at.desc()).offset(skip).limit(limit).all()

        return users, total

    def create(self, user_data: dict) -> User:
        """Create a new user"""
        user = User(**user_data)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self, user: User, update_data: dict) -> User:
        """Update user"""
        for key, value in update_data.items():
            if value is not None:
                setattr(user, key, value)

        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def soft_delete(self, user: User) -> User:
        """Soft delete user (mark as inactive)"""
        user.is_active = False
        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def hard_delete(self, user: User) -> None:
        """Permanently delete user (only for admins)"""
        self.db.delete(user)
        self.db.commit()

    def restore(self, user: User) -> User:
        """Restore soft-deleted user"""
        user.is_active = True
        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def count_by_role(self, role: UserRole) -> int:
        """Count users by role"""
        return self.db.query(User).filter(
            User.role == role,
            User.is_active == True
        ).count()

    def get_users_by_role_level(self, max_role: UserRole) -> List[User]:
        """Get users with role level <= max_role"""
        role_hierarchy = {
            UserRole.CUSTOMER: 1,
            UserRole.ADMIN: 2,
            UserRole.SUPER_ADMIN: 3
        }

        max_level = role_hierarchy[max_role]
        allowed_roles = [
            role for role, level in role_hierarchy.items()
            if level <= max_level
        ]

        return self.db.query(User).filter(
            User.role.in_(allowed_roles),
            User.is_active == True
        ).all()

    def update_password(self, user: User, new_password_hash: str) -> User:
        """Update user password"""
        user.password = new_password_hash
        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def verify_email(self, user: User) -> User:
        """Mark user email as verified"""
        user.email_verified = True
        user.verification_token = None
        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def set_reset_token(self, user: User, token: str, expires_hours: int = 1) -> User:
        """Set password reset token"""
        user.reset_token = token
        user.reset_token_expires = datetime.now(timezone.utc) + timedelta(hours=expires_hours)
        self.db.commit()
        self.db.refresh(user)
        return user

    def clear_reset_token(self, user: User) -> User:
        """Clear password reset token"""
        user.reset_token = None
        user.reset_token_expires = None
        self.db.commit()
        self.db.refresh(user)
        return user