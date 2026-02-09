from fastapi import APIRouter, Depends, Query, status, Path, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
from datetime import datetime, timedelta

from app.core.dependencies import (
    get_db, get_current_user, get_current_admin,
    require_role
)
from app.services.order_service import OrderService
from app.schemas.order import (
    OrderCreate, OrderUpdateStatus, OrderResponse,
    GuestOrderCreate
)
from app.models.user import User
from app.utils.enums import OrderStatus, UserRole

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> OrderResponse:
    """Create new order (authenticated user)"""
    order_service = OrderService(db)
    return order_service.create_order(order_data, current_user)


@router.get("", response_model=Dict[str, Any])
def get_my_orders(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    status: Optional[OrderStatus] = Query(None, description="Filter by status"),
    sort_by: str = Query("created_at", description="Sort by: created_at, total, status"),
    sort_order: str = Query("desc", description="Sort order: asc, desc"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get current user's orders"""
    order_service = OrderService(db)
    return order_service.get_user_orders(
        user=current_user,
        page=page,
        limit=limit,
        status=status,
        sort_by=sort_by,
        sort_order=sort_order
    )


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int = Path(..., ge=1, description="Order ID"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> OrderResponse:
    """Get order by ID (user must own the order)"""
    order_service = OrderService(db)
    return order_service.get_order_by_id(order_id, current_user)


@router.post("/{order_id}/cancel", response_model=OrderResponse)
def cancel_order(
    order_id: int = Path(..., ge=1, description="Order ID"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> OrderResponse:
    """Cancel user's own order (if pending/processing)"""
    order_service = OrderService(db)
    return order_service.cancel_order(order_id, current_user)


@router.get("/stats/my-stats")
def get_my_order_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get current user's order statistics"""
    order_service = OrderService(db)
    return order_service.get_user_order_stats(current_user)


@router.post(
    "/guest",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED
)
def create_guest_order(
    order_data: GuestOrderCreate,
    db: Session = Depends(get_db)
) -> OrderResponse:
    """Create order as guest (unauthenticated user)"""
    order_service = OrderService(db)
    return order_service.create_guest_order(order_data)


@router.get(
    "/admin/all",
    dependencies=[Depends(get_current_admin)]
)
def get_all_orders_admin(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    status: Optional[OrderStatus] = Query(None, description="Filter by status"),
    start_date: Optional[str] = Query(None, description="Start date (YYYY-MM-DD)"),
    end_date: Optional[str] = Query(None, description="End date (YYYY-MM-DD)"),
    sort_by: str = Query("created_at", description="Sort by: created_at, total, status"),
    sort_order: str = Query("desc", description="Sort order: asc, desc"),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get all orders (admin only)"""
    start_dt = datetime.fromisoformat(start_date) if start_date else None
    end_dt = datetime.fromisoformat(end_date) if end_date else None

    order_service = OrderService(db)
    return order_service.get_all_orders(
        page=page,
        limit=limit,
        user_id=user_id,
        status=status,
        sort_by=sort_by,
        sort_order=sort_order
    )


@router.get(
    "/admin/{order_id}",
    response_model=OrderResponse,
    dependencies=[Depends(get_current_admin)]
)
def get_order_admin(
    order_id: int = Path(..., ge=1, description="Order ID"),
    db: Session = Depends(get_db)
) -> OrderResponse:
    """Get any order by ID (admin only)"""
    order_service = OrderService(db)

    from app.models.user import User
    admin_user = User(id=0, role=UserRole.ADMIN)

    return order_service.get_order_by_id(order_id, admin_user)


@router.patch(
    "/admin/{order_id}/status",
    response_model=OrderResponse,
    dependencies=[Depends(get_current_admin)]
)
def update_order_status_admin(
    order_id: int = Path(..., ge=1, description="Order ID"),
    status_data: OrderUpdateStatus = None,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
) -> OrderResponse:
    """Update order status (admin only)"""
    order_service = OrderService(db)
    return order_service.update_order_status(order_id, status_data, current_user)


@router.delete(
    "/admin/{order_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_role(UserRole.SUPER_ADMIN))]
)
def delete_order_admin(
    order_id: int = Path(..., ge=1, description="Order ID"),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Delete order permanently (super admin only)"""
    order_service = OrderService(db)

    return {
        "message": "Order deletion endpoint - implement delete functionality in OrderService",
        "order_id": order_id,
        "warning": "Consider soft delete instead of hard delete"
    }


@router.get(
    "/admin/stats/summary",
    dependencies=[Depends(get_current_admin)]
)
def get_order_stats_admin(
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get order statistics (admin only)"""
    order_service = OrderService(db)
    return order_service.get_order_stats()


@router.get(
    "/admin/stats/recent",
    dependencies=[Depends(get_current_admin)]
)
def get_recent_orders_stats(
    days: int = Query(7, ge=1, le=365, description="Number of days"),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get recent orders statistics (admin only)"""
    order_service = OrderService(db)

    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)

    orders, total = order_service.order_repo.get_all(
        start_date=start_date,
        end_date=end_date
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


@router.get("/statuses/all")
def get_all_order_statuses() -> Dict[str, Any]:
    """Get all available order statuses"""
    return {
        "statuses": [
            {"value": status.value, "label": status.value.replace("_", " ").title()}
            for status in OrderStatus
        ]
    }


@router.get("/check/{order_id}")
def check_order_status(
    order_id: int = Path(..., ge=1, description="Order ID"),
    email: str = Query(..., description="Customer email for verification"),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Check order status (public, email verification required)"""
    order_service = OrderService(db)
    order = order_service.order_repo.get_by_id(order_id)

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )

    if order.shipping_email.lower() != email.lower():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email verification failed"
        )

    return {
        "order_id": order.id,
        "status": order.status.value,
        "total": order.total,
        "created_at": order.created_at.isoformat(),
        "items_count": len(order.items),
        "customer_name": order.customer_name
    }