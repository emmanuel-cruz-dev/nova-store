from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
from datetime import datetime

from app.utils.enums import OrderStatus, PaymentMethod


class OrderItemBase(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0, le=100)


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    product_name: str
    product_price: float
    product_image: Optional[str] = None
    quantity: int
    subtotal: float

    model_config = ConfigDict(from_attributes=True)


class ShippingInfo(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=20)
    address: str = Field(..., min_length=5, max_length=200)
    city: str = Field(..., min_length=2, max_length=50)
    state: str = Field(..., min_length=2, max_length=50)
    zip_code: str = Field(..., min_length=3, max_length=20)
    country: str = Field(..., min_length=2, max_length=50)


class PaymentInfo(BaseModel):
    method: PaymentMethod
    transaction_id: Optional[str] = None
    paid_at: Optional[datetime] = None


class OrderCreate(BaseModel):
    items: List[OrderItemCreate] = Field(..., min_items=1)
    shipping_info: ShippingInfo
    payment_method: PaymentMethod
    notes: Optional[str] = Field(None, max_length=500)


class OrderUpdateStatus(BaseModel):
    status: OrderStatus


class OrderResponse(BaseModel):
    id: int
    user_id: Optional[int]
    status: OrderStatus
    total: float
    subtotal: float
    tax: float = 0.0
    shipping_cost: float = 0.0
    shipping_info: ShippingInfo
    payment_method: PaymentMethod
    payment_status: str = "pending"
    notes: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime] = None
    items: List[OrderItemResponse]

    model_config = ConfigDict(from_attributes=True)


class OrderSummary(BaseModel):
    """Summary of order without items (for listing)"""
    id: int
    user_id: Optional[int]
    status: OrderStatus
    total: float
    created_at: datetime
    items_count: int = 0
    customer_name: str

    model_config = ConfigDict(from_attributes=True)


class GuestOrderCreate(OrderCreate):
    """Para usuarios no registrados"""
    create_account: bool = False
    password: Optional[str] = Field(None, min_length=6)


class OrderStats(BaseModel):
    total_orders: int = 0
    total_revenue: float = 0.0
    average_order_value: float = 0.0
    pending_orders: int = 0
    completed_orders: int = 0