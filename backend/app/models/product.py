from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.base import Base
from app.utils.enums import ProductCategory, StockLevel


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, index=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0, nullable=False)
    rating = Column(Float, default=0.0)
    category = Column(SQLEnum(ProductCategory), nullable=False, index=True)
    brand = Column(String(100), nullable=False, index=True)
    is_active = Column(Boolean, default=True, nullable=False)
    image = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
        )

    order_items = relationship("OrderItem", back_populates="product")

    @property
    def stock_level(self) -> StockLevel:
        if self.stock <= 0:
            return StockLevel.CRITICAL
        elif self.stock <= 10:
            return StockLevel.LOW
        elif self.stock <= 50:
            return StockLevel.OK
        else:
            return StockLevel.HIGH

    @property
    def formatted_price(self) -> str:
        return f"${self.price:.2f}"

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price})>"