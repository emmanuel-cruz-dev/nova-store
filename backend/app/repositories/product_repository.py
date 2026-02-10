from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from datetime import datetime, timedelta, timezone

from app.models.product import Product
from app.models.order import OrderItem
from app.utils.enums import ProductCategory, StockLevel


class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, product_id: int) -> Optional[Product]:
        """Get product by ID"""
        return self.db.query(Product).filter(Product.id == product_id).first()

    def get_by_ids(self, product_ids: List[int]) -> List[Product]:
        """Get multiple products by IDs"""
        return self.db.query(Product).filter(Product.id.in_(product_ids)).all()

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        category: Optional[ProductCategory] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        is_active: Optional[bool] = True,
        stock_level: Optional[StockLevel] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> Tuple[List[Product], int]:
        """Get all products with filters and pagination"""
        query = self.db.query(Product)

        if is_active is not None:
            query = query.filter(Product.is_active == is_active)

        if category:
            query = query.filter(Product.category == category)

        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    Product.name.ilike(search_pattern),
                    Product.brand.ilike(search_pattern),
                    Product.description.ilike(search_pattern)
                )
            )

        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)

        if stock_level:
            if stock_level == StockLevel.CRITICAL:
                query = query.filter(Product.stock <= 5)
            elif stock_level == StockLevel.LOW:
                query = query.filter(Product.stock > 5, Product.stock <= 20)
            elif stock_level == StockLevel.OK:
                query = query.filter(Product.stock > 20, Product.stock <= 100)
            elif stock_level == StockLevel.HIGH:
                query = query.filter(Product.stock > 100)

        if sort_by == "price":
            order_column = Product.price
        elif sort_by == "name":
            order_column = Product.name
        elif sort_by == "rating":
            order_column = Product.rating
        else:
            order_column = Product.created_at

        if sort_order == "asc":
            query = query.order_by(order_column.asc())
        else:
            query = query.order_by(order_column.desc())

        total = query.count()

        products = query.offset(skip).limit(limit).all()

        return products, total

    def create(self, product_data: dict) -> Product:
        product = Product(**product_data)
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

    def update(self, product: Product, update_data: dict) -> Product:
        for key, value in update_data.items():
            if value is not None:
                setattr(product, key, value)
        self.db.commit()
        self.db.refresh(product)
        return product

    def soft_delete(self, product: Product) -> Product:
        product.is_active = False
        self.db.commit()
        self.db.refresh(product)
        return product

    def hard_delete(self, product: Product) -> None:
        self.db.delete(product)
        self.db.commit()

    def update_stock(self, product: Product, quantity_change: int) -> Product:
        product.stock += quantity_change

        if product.stock < 0:
            product.stock = 0

        self.db.commit()
        self.db.refresh(product)
        return product


    def count_all(self) -> int:
        return self.db.query(Product).count()

    def count_active(self) -> int:
        return self.db.query(Product).filter(Product.is_active == True).count()

    def count_by_category(self, category: ProductCategory) -> int:
        return self.db.query(Product).filter(
            Product.category == category,
            Product.is_active == True
        ).count()

    def count_low_stock(self, threshold: int = 10) -> int:
        return self.db.query(Product).filter(
            Product.stock <= threshold,
            Product.stock > 0,
            Product.is_active == True
        ).count()

    def count_out_of_stock(self) -> int:
        """Count out of stock products"""
        return self.db.query(Product).filter(
            Product.stock <= 0,
            Product.is_active == True
        ).count()

    def get_top_selling(self, limit: int = 10) -> List[Tuple]:
        results = (
            self.db.query(
                Product,
                func.sum(OrderItem.quantity).label("total_sold")
            )
            .join(OrderItem, Product.id == OrderItem.product_id)
            .group_by(Product.id)
            .order_by(func.sum(OrderItem.quantity).desc())
            .limit(limit)
            .all()
        )
        return results

    def get_new_arrivals(self, days: int = 30, limit: int = 10) -> List[Product]:
        cutoff_date = datetime.now(timezone.utc) - timedelta(days=days)
        return (
            self.db.query(Product)
            .filter(
                Product.created_at >= cutoff_date,
                Product.is_active == True
            )
            .order_by(Product.created_at.desc())
            .limit(limit)
            .all()
        )

    def get_by_price_range(
        self,
        min_price: float,
        max_price: float,
        limit: int = 50
    ) -> List[Product]:
        return (
            self.db.query(Product)
            .filter(
                Product.price >= min_price,
                Product.price <= max_price,
                Product.is_active == True
            )
            .order_by(Product.price.asc())
            .limit(limit)
            .all()
        )