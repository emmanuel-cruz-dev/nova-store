from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

from app.utils.enums import ProductCategory, StockLevel


class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    stock: int = Field(..., ge=0)
    category: ProductCategory
    brand: str = Field(..., min_length=1, max_length=100)
    is_active: bool = True
    image: Optional[str] = None
    rating: float = Field(default=0.0, ge=0.0, le=5.0)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    stock: Optional[int] = Field(None, ge=0)
    category: Optional[ProductCategory] = None
    brand: Optional[str] = Field(None, min_length=1, max_length=100)
    is_active: Optional[bool] = None
    image: Optional[str] = None
    rating: Optional[float] = Field(None, ge=0.0, le=5.0)


class ProductResponse(ProductBase):
    id: int
    stock_level: Optional[StockLevel] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def model_validate(cls, obj, **kwargs):
        if hasattr(obj, 'stock_level'):
            data = {
                **super().model_validate(obj).model_dump(),
                "stock_level": obj.stock_level
            }
            return cls(**data)
        return super().model_validate(obj, **kwargs)


class ProductWithSales(ProductResponse):
    total_sold: int = 0
    revenue: float = 0.0

    model_config = ConfigDict(from_attributes=True)