from typing import List, Optional, Tuple, Dict, Any
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, desc, asc
from datetime import datetime, timedelta, timezone

from app.models.order import Order, OrderItem
from app.utils.enums import OrderStatus, PaymentStatus


class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, order_id: int) -> Optional[Order]:
        return (
            self.db.query(Order)
            .options(joinedload(Order.items))
            .filter(Order.id == order_id)
            .first()
        )

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        user_id: Optional[int] = None,
        status: Optional[OrderStatus] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> Tuple[List[Order], int]:
        query = self.db.query(Order).options(joinedload(Order.items))

        if user_id is not None:
            query = query.filter(Order.user_id == user_id)

        if status:
            query = query.filter(Order.status == status)

        if start_date:
            query = query.filter(Order.created_at >= start_date)
        if end_date:
            query = query.filter(Order.created_at <= end_date)

        order_column = getattr(Order, sort_by, Order.created_at)
        if sort_order == "asc":
            query = query.order_by(asc(order_column))
        else:
            query = query.order_by(desc(order_column))

        total = query.count()

        orders = query.offset(skip).limit(limit).all()

        return orders, total

    def create(self, order_data: Dict[str, Any], items_data: List[Dict[str, Any]]) -> Order:
        order = Order(**order_data)
        self.db.add(order)
        self.db.flush()

        for item_data in items_data:
            item = OrderItem(
                order_id=order.id,
                **item_data
            )
            self.db.add(item)

        self.db.commit()
        self.db.refresh(order)
        return order

    def update_status(self, order: Order, status: OrderStatus) -> Order:
        order.status = status
        order.updated_at = datetime.utcnow()

        if status == OrderStatus.COMPLETED:
            order.payment_status = PaymentStatus.PAID

        self.db.commit()
        self.db.refresh(order)
        return order

    def update_payment_status(self, order: Order, payment_status: PaymentStatus, transaction_id: Optional[str] = None) -> Order:
        order.payment_status = payment_status
        order.payment_transaction_id = transaction_id

        if payment_status == PaymentStatus.PAID:
            order.payment_paid_at = datetime.now(timezone.utc)

        order.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(order)
        return order

    def soft_delete(self, order: Order) -> Order:
        order.status = OrderStatus.CANCELLED
        order.updated_at = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(order)
        return order

    def hard_delete(self, order: Order) -> None:
        self.db.delete(order)
        self.db.commit()


    def count_all(self) -> int:
        return self.db.query(Order).count()

    def count_by_status(self, status: OrderStatus) -> int:
        return self.db.query(Order).filter(Order.status == status).count()

    def count_by_user(self, user_id: int) -> int:
        return self.db.query(Order).filter(Order.user_id == user_id).count()

    def get_total_revenue(self, include_cancelled: bool = False) -> float:
        query = self.db.query(func.sum(Order.total))

        if not include_cancelled:
            query = query.filter(Order.status != OrderStatus.CANCELLED)

        result = query.scalar()
        return result or 0.0

    def get_average_order_value(self, include_cancelled: bool = False) -> float:
        query = self.db.query(func.avg(Order.total))

        if not include_cancelled:
            query = query.filter(Order.status != OrderStatus.CANCELLED)

        result = query.scalar()
        return result or 0.0

    def get_status_distribution(self) -> Dict[str, int]:
        results = (
            self.db.query(Order.status, func.count(Order.id))
            .group_by(Order.status)
            .all()
        )

        return {status.value: count for status, count in results}

    def get_revenue_by_period(
        self,
        start_date: datetime,
        end_date: datetime
    ) -> float:
        result = (
            self.db.query(func.sum(Order.total))
            .filter(
                Order.created_at >= start_date,
                Order.created_at <= end_date,
                Order.status != OrderStatus.CANCELLED
            )
            .scalar()
        )
        return result or 0.0

    def get_daily_orders(self, days: int = 30) -> List[Tuple[datetime.date, int]]:
        end_date = datetime.now(timezone.utc).date()
        start_date = end_date - timedelta(days=days)

        results = (
            self.db.query(
                func.date(Order.created_at).label("date"),
                func.count(Order.id).label("count")
            )
            .filter(
                func.date(Order.created_at) >= start_date,
                func.date(Order.created_at) <= end_date
            )
            .group_by(func.date(Order.created_at))
            .order_by(func.date(Order.created_at))
            .all()
        )

        return [(row.date, row.count) for row in results]