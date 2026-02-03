from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    price: float
    stock: int
    category: str
    brand: str
    description: Optional[str] = None
    is_active: bool = True
    image: Optional[HttpUrl] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None
    image: Optional[HttpUrl] = None

class ProductResponse(ProductBase):
    id: int
    rating: float = 0
    created_at: datetime

    class Config:
        from_attributes = True
