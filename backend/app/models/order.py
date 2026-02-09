from sqlalchemy import Column, Integer, String, Float, DateTime, Enum as SQLEnum, ForeignKey, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.base import Base
from app.utils.enums import OrderStatus, PaymentMethod, PaymentStatus
from app.schemas.order import ShippingInfo


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    status = Column(SQLEnum(OrderStatus), default=OrderStatus.PENDING, nullable=False, index=True)

    subtotal = Column(Float, nullable=False, default=0.0)
    tax = Column(Float, nullable=False, default=0.0)
    shipping_cost = Column(Float, nullable=False, default=0.0)
    total = Column(Float, nullable=False)

    payment_method = Column(SQLEnum(PaymentMethod), nullable=False)
    payment_status = Column(SQLEnum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False)
    payment_transaction_id = Column(String(100), nullable=True)
    payment_paid_at = Column(DateTime(timezone=True), nullable=True)

    shipping_first_name = Column(String(100), nullable=False)
    shipping_last_name = Column(String(100), nullable=False)
    shipping_email = Column(String(255), nullable=False)
    shipping_phone = Column(String(50), nullable=False)
    shipping_address = Column(String(500), nullable=False)
    shipping_city = Column(String(100), nullable=False)
    shipping_state = Column(String(100), nullable=False)
    shipping_zip_code = Column(String(20), nullable=False)
    shipping_country = Column(String(100), nullable=False)

    notes = Column(Text, nullable=True)
    is_guest_order = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

    @property
    def customer_name(self) -> str:
        """Get customer full name"""
        return f"{self.shipping_first_name} {self.shipping_last_name}"

    @property
    def shipping_info(self) -> ShippingInfo:
        """Get shipping info as a ShippingInfo object"""
        return ShippingInfo(
            first_name=self.shipping_first_name,
            last_name=self.shipping_last_name,
            email=self.shipping_email,
            phone=self.shipping_phone,
            address=self.shipping_address,
            city=self.shipping_city,
            state=self.shipping_state,
            zip_code=self.shipping_zip_code,
            country=self.shipping_country
        )

    @property
    def shipping_address_full(self) -> str:
        """Get full shipping address"""
        return f"{self.shipping_address}, {self.shipping_city}, {self.shipping_state} {self.shipping_zip_code}, {self.shipping_country}"

    def __repr__(self):
        return f"<Order(id={self.id}, status={self.status}, total={self.total})>"


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="SET NULL"), nullable=True)

    product_name = Column(String(200), nullable=False)
    product_price = Column(Float, nullable=False)
    product_image = Column(String(500), nullable=True)

    quantity = Column(Integer, nullable=False)
    subtotal = Column(Float, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    order = relationship("Order", back_populates="items")
    product = relationship("Product")

    def __repr__(self):
        return f"<OrderItem(id={self.id}, product='{self.product_name}', quantity={self.quantity})>"