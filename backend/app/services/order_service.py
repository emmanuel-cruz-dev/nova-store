from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional, Dict, Any, List
from datetime import datetime, timedelta, timezone

from app.repositories.order_repository import OrderRepository
from app.repositories.product_repository import ProductRepository
from app.schemas.order import (
    OrderCreate, OrderUpdateStatus, OrderResponse,
    OrderSummary, GuestOrderCreate
)
from app.models.user import User
from app.utils.enums import OrderStatus, PaymentStatus, UserRole
from app.utils.pagination import calculate_skip, create_pagination_response


class OrderService:
    def __init__(self, db: Session):
        self.db = db
        self.order_repo = OrderRepository(db)
        self.product_repo = ProductRepository(db)

    def create_order(self, order_data: OrderCreate, user: Optional[User] = None) -> OrderResponse:
        return self._process_order_creation(order_data, user)

    def create_guest_order(self, order_data: GuestOrderCreate) -> OrderResponse:
        return self._process_order_creation(order_data, None)

    def _process_order_creation(
        self,
        order_data: OrderCreate,
        user: Optional[User] = None
    ) -> OrderResponse:
        try:
            items_data, total_amount = self._validate_and_prepare_items(order_data.items)
            shipping_cost = self._calculate_shipping_cost(items_data)
            tax = self._calculate_tax(total_amount)
            grand_total = total_amount + shipping_cost + tax

            order_dict = self._prepare_order_data(
                order_data,
                user,
                total_amount,
                shipping_cost,
                tax,
                grand_total
            )

            order = self.order_repo.create(order_dict, items_data)

            self._update_product_stock(items_data)

            self.db.commit()
            return OrderResponse.model_validate(order)

        except HTTPException:
            self.db.rollback()
            raise

        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail="Error creating order")

    def _validate_and_prepare_items(
        self,
        items: List[Any]
    ) -> tuple[List[Dict[str, Any]], float]:
        items_to_create = []
        total_amount = 0.0

        for item in items:
            product = self.product_repo.get_by_id(item.product_id)

            if not product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Product with ID {item.product_id} not found"
                )

            if not product.is_active:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product '{product.name}' is not available"
                )

            if not self.product_repo.update_stock_atomic(product.id, -item.quantity):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Insufficient stock for '{product.name}'"
                )

            subtotal = product.price * item.quantity
            total_amount += subtotal

            items_to_create.append({
                "product_id": product.id,
                "product_name": product.name,
                "product_price": product.price,
                "product_image": product.image,
                "quantity": item.quantity,
                "subtotal": subtotal
            })

        return items_to_create, total_amount

    def _calculate_shipping_cost(self, items_data: List[Dict[str, Any]]) -> float:
        base_cost = 5.99
        per_item_cost = 0.99
        total_items = sum(item["quantity"] for item in items_data)

        return base_cost + (per_item_cost * total_items)

    def _calculate_tax(self, subtotal: float) -> float:
        return subtotal * 0.10

    def _prepare_order_data(
        self,
        order_data: OrderCreate,
        user: Optional[User],
        subtotal: float,
        shipping_cost: float,
        tax: float,
        total: float
    ) -> Dict[str, Any]:
        return {
            "user_id": user.id if user else None,
            "is_guest_order": user is None,

            "subtotal": subtotal,
            "shipping_cost": shipping_cost,
            "tax": tax,
            "total": total,

            "status": OrderStatus.PENDING,
            "payment_status": PaymentStatus.PENDING,

            "payment_method": order_data.payment_method,

            "shipping_first_name": order_data.shipping_info.first_name,
            "shipping_last_name": order_data.shipping_info.last_name,
            "shipping_email": order_data.shipping_info.email,
            "shipping_phone": order_data.shipping_info.phone,
            "shipping_address": order_data.shipping_info.address,
            "shipping_city": order_data.shipping_info.city,
            "shipping_state": order_data.shipping_info.state,
            "shipping_zip_code": order_data.shipping_info.zip_code,
            "shipping_country": order_data.shipping_info.country,

            "notes": order_data.notes
        }

    def get_user_orders(
        self,
        user: User,
        page: int = 1,
        limit: int = 10,
        status: Optional[OrderStatus] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> Dict[str, Any]:
        skip = calculate_skip(page, limit)

        orders, total = self.order_repo.get_all(
            skip=skip,
            limit=limit,
            user_id=user.id,
            status=status,
            sort_by=sort_by,
            sort_order=sort_order
        )

        order_summaries = [
            OrderSummary(
                id=order.id,
                user_id=order.user_id,
                status=order.status,
                total=order.total,
                created_at=order.created_at,
                items_count=len(order.items),
                customer_name=order.customer_name
            )
            for order in orders
        ]

        return create_pagination_response(
            items=order_summaries,
            total=total,
            page=page,
            limit=limit
        )

    def get_order_by_id(self, order_id: int, user: User) -> OrderResponse:
        order = self.order_repo.get_by_id(order_id)

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )

        if order.user_id != user.id and not user.is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this order"
            )

        return OrderResponse.model_validate(order)

    def get_order_by_id_admin(self, order_id: int) -> OrderResponse:
        """Get order without authorization check (admin only)"""
        order = self.order_repo.get_by_id(order_id)

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )

        return OrderResponse.model_validate(order)

    def get_all_orders(
        self,
        page: int = 1,
        limit: int = 10,
        user_id: Optional[int] = None,
        status: Optional[OrderStatus] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> Dict[str, Any]:
        skip = calculate_skip(page, limit)

        orders, total = self.order_repo.get_all(
            skip=skip,
            limit=limit,
            user_id=user_id,
            status=status,
            start_date=start_date,
            end_date=end_date,
            sort_by=sort_by,
            sort_order=sort_order
        )

        order_summaries = [
            OrderSummary(
                id=order.id,
                user_id=order.user_id,
                status=order.status,
                total=order.total,
                created_at=order.created_at,
                items_count=len(order.items),
                customer_name=order.customer_name
            )
            for order in orders
        ]

        return create_pagination_response(
            items=order_summaries,
            total=total,
            page=page,
            limit=limit
        )

    def update_order_status(
        self,
        order_id: int,
        status_data: OrderUpdateStatus,
        current_user: User
    ) -> OrderResponse:
        if not current_user.is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin access required"
            )

        order = self.order_repo.get_by_id(order_id)

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )

        updated_order = self.order_repo.update_status(order, status_data.status)

        return OrderResponse.model_validate(updated_order)

    def cancel_order(self, order_id: int, user: User) -> OrderResponse:
        order = self.order_repo.get_by_id(order_id)

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )

        if order.user_id != user.id and not user.is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to cancel this order"
            )

        if order.status not in [OrderStatus.PENDING, OrderStatus.PROCESSING]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot cancel order with status: {order.status.value}"
            )

        self._restore_product_stock(order.items)

        cancelled_order = self.order_repo.update_status(order, OrderStatus.CANCELLED)

        return OrderResponse.model_validate(cancelled_order)

    def _restore_product_stock(self, order_items: List[Any]) -> None:
        for item in order_items:
            if item.product_id:
                product = self.product_repo.get_by_id(item.product_id)
                if product:
                    self.product_repo.update_stock(product, item.quantity)


    def get_order_stats(self) -> Dict[str, Any]:
        total_orders = self.order_repo.count_all()
        total_revenue = self.order_repo.get_total_revenue()
        avg_order_value = self.order_repo.get_average_order_value()

        status_distribution = self.order_repo.get_status_distribution()

        return {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "average_order_value": avg_order_value,
            "status_distribution": status_distribution,
            "pending_orders": status_distribution.get(OrderStatus.PENDING.value, 0),
            "completed_orders": status_distribution.get(OrderStatus.COMPLETED.value, 0)
        }

    def get_user_order_stats(self, user: User) -> Dict[str, Any]:
        user_orders, total = self.order_repo.get_all(user_id=user.id)

        total_spent = sum(order.total for order in user_orders)
        avg_order_value = total_spent / len(user_orders) if user_orders else 0

        return {
            "total_orders": total,
            "total_spent": total_spent,
            "average_order_value": avg_order_value,
            "first_order_date": min(order.created_at for order in user_orders).isoformat() if user_orders else None,
            "last_order_date": max(order.created_at for order in user_orders).isoformat() if user_orders else None
        }

    def delete_order(self, order_id: int, current_user: User) -> None:
        if current_user.role != UserRole.SUPER_ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Super admin access required"
            )

        order = self.order_repo.get_by_id(order_id)

        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )

        if order.status != OrderStatus.CANCELLED:
            self._restore_product_stock(order.items)

        self.order_repo.hard_delete(order)


    def get_recent_stats_summary(self, days: int) -> Dict[str, Any]:
        end_date = datetime.now(timezone.utc)
        start_date = end_date - timedelta(days=days)

        orders, total = self.order_repo.get_all(
            start_date=start_date,
            end_date=end_date,
            limit=1000
        )

        revenue = sum(order.total for order in orders if order.status != OrderStatus.CANCELLED)
        avg_order = revenue / len(orders) if orders else 0

        return {
            "period_days": days,
            "total_orders": total,
            "total_revenue": revenue,
            "average_order_value": avg_order,
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat()
        }