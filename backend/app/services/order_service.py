from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional, Dict, Any, List

from app.repositories.order_repository import OrderRepository
from app.repositories.product_repository import ProductRepository
from app.schemas.order import (
    OrderCreate, OrderUpdateStatus, OrderResponse,
    OrderSummary, GuestOrderCreate
)
from app.models.user import User
from app.utils.enums import OrderStatus, PaymentStatus


class OrderService:
    def __init__(self, db: Session):
        self.db = db
        self.order_repo = OrderRepository(db)
        self.product_repo = ProductRepository(db)

    def create_order(self, order_data: OrderCreate, user: Optional[User] = None) -> OrderResponse:
        """Create new order (for authenticated users)"""
        return self._process_order_creation(order_data, user)

    def create_guest_order(self, order_data: GuestOrderCreate) -> OrderResponse:
        """Create order for guest (unauthenticated user)"""
        return self._process_order_creation(order_data, None)

    def _process_order_creation(
        self,
        order_data: OrderCreate,
        user: Optional[User] = None
    ) -> OrderResponse:
        """Common order creation logic"""
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

        return OrderResponse.model_validate(order)

    def _validate_and_prepare_items(
        self,
        items: List[Any]
    ) -> tuple[List[Dict[str, Any]], float]:
        """Validate order items and prepare data for creation"""
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

            if product.stock < item.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Insufficient stock for '{product.name}'. Available: {product.stock}, Requested: {item.quantity}"
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
        """Calculate shipping cost (simple implementation)"""
        base_cost = 5.99

        per_item_cost = 0.99
        total_items = sum(item["quantity"] for item in items_data)

        return base_cost + (per_item_cost * total_items)

    def _calculate_tax(self, subtotal: float) -> float:
        """Calculate tax (simple 10% for example)"""
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
        """Prepare order data dictionary"""
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

    def _update_product_stock(self, items_data: List[Dict[str, Any]]) -> None:
        """Update product stock after order creation"""
        for item in items_data:
            product = self.product_repo.get_by_id(item["product_id"])
            if product:
                self.product_repo.update_stock(product, -item["quantity"])

    def get_user_orders(
        self,
        user: User,
        page: int = 1,
        limit: int = 10,
        status: Optional[OrderStatus] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> Dict[str, Any]:
        """Get authenticated user's orders"""
        skip = (page - 1) * limit

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

        return {
            "orders": order_summaries,
            "total": total,
            "page": page,
            "limit": limit,
            "pages": (total + limit - 1) // limit if limit > 0 else 0
        }

    def get_order_by_id(self, order_id: int, user: User) -> OrderResponse:
        """Get order by ID (user must own the order or be admin)"""
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

    def get_all_orders(
        self,
        page: int = 1,
        limit: int = 10,
        user_id: Optional[int] = None,
        status: Optional[OrderStatus] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> Dict[str, Any]:
        """Get all orders (admin only)"""
        skip = (page - 1) * limit

        orders, total = self.order_repo.get_all(
            skip=skip,
            limit=limit,
            user_id=user_id,
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

        return {
            "orders": order_summaries,
            "total": total,
            "page": page,
            "limit": limit,
            "pages": (total + limit - 1) // limit if limit > 0 else 0
        }

    def update_order_status(
        self,
        order_id: int,
        status_data: OrderUpdateStatus,
        current_user: User
    ) -> OrderResponse:
        """Update order status (admin only)"""
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
        """Cancel order (user can cancel their own pending orders)"""
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

        cancelled_order = self.order_repo.update_status(order, OrderStatus.CANCELLED)

        if order.status == OrderStatus.PENDING:
            self._restore_product_stock(order.items)

        return OrderResponse.model_validate(cancelled_order)

    def _restore_product_stock(self, order_items: List[Any]) -> None:
        """Restore product stock when order is cancelled"""
        for item in order_items:
            if item.product_id:
                product = self.product_repo.get_by_id(item.product_id)
                if product:
                    self.product_repo.update_stock(product, item.quantity)


    def get_order_stats(self) -> Dict[str, Any]:
        """Get order statistics (admin only)"""
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
            "completed_orders": status_distribution.get(OrderStatus.DELIVERED.value, 0)
        }

    def get_user_order_stats(self, user: User) -> Dict[str, Any]:
        """Get user's order statistics"""
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