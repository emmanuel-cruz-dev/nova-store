from typing import List, Optional, Tuple
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, exists
from datetime import datetime, timedelta, timezone

from app.models.user import User
from app.models.order import Order
from app.utils.enums import UserRole


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_by_email(self, email: str) -> Optional[User]:
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
        has_orders: Optional[bool] = None,
        registered_since: Optional[str] = None
    ) -> Tuple[List[User], int]:
        query = self.db.query(User).options(joinedload(User.orders))

        if is_active is not None:
            query = query.filter(User.is_active == is_active)

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

        if has_orders is not None:
            if has_orders:
                subquery = exists().where(Order.user_id == User.id)
                query = query.filter(subquery)
            else:
                subquery = exists().where(Order.user_id == User.id)
                query = query.filter(~subquery)

        if registered_since:
            now = datetime.now(timezone.utc)

            deltas = {
                "week": timedelta(days=7),
                "month": timedelta(days=30),
                "3months": timedelta(days=90)
            }

            if registered_since == "today":
                cutoff = now.replace(hour=0, minute=0, second=0, microsecond=0)
                query = query.filter(User.created_at >= cutoff)
            elif registered_since in deltas:
                query = query.filter(User.created_at >= now - deltas[registered_since])
            elif registered_since == "older":
                cutoff = now - timedelta(days=90)
                query = query.filter(User.created_at < cutoff)

        total = query.count()

        users = query.order_by(User.created_at.desc()).offset(skip).limit(limit).all()

        return users, total

    def create(self, user_data: dict) -> User:
        user = User(**user_data)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self, user: User, update_data: dict) -> User:
        for key, value in update_data.items():
            if value is not None:
                setattr(user, key, value)

        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def soft_delete(self, user: User) -> User:
        user.is_active = False
        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def hard_delete(self, user: User) -> None:
        self.db.delete(user)
        self.db.commit()

    def restore(self, user: User) -> User:
        user.is_active = True
        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def count_by_role(self, role: UserRole) -> int:
        return self.db.query(User).filter(
            User.role == role,
            User.is_active == True
        ).count()

    def get_users_by_role_level(self, max_role: UserRole) -> List[User]:
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
        user.password = new_password_hash
        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def verify_email(self, user: User) -> User:
        user.email_verified = True
        user.verification_token = None
        user.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(user)
        return user

    def set_reset_token(self, user: User, token: str, expires_hours: int = 1) -> User:
        user.reset_token = token
        user.reset_token_expires = datetime.now(timezone.utc) + timedelta(hours=expires_hours)
        self.db.commit()
        self.db.refresh(user)
        return user

    def clear_reset_token(self, user: User) -> User:
        user.reset_token = None
        user.reset_token_expires = None
        self.db.commit()
        self.db.refresh(user)
        return user