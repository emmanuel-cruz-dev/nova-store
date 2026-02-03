from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from enum import Enum

class RoleEnum(str, Enum):
    customer = "customer"
    admin = "admin"
    super_admin = "super_admin"

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar: Optional[str] = None

class UserResponse(UserBase):
    id: int
    role: RoleEnum
    avatar: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True