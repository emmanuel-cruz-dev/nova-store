from sqlalchemy.orm import Session
from app.repositories.product_repository import ProductRepository
from app.repositories.order_repository import OrderRepository
from app.repositories.user_repository import UserRepository
from app.schemas.product import ProductWithSales
from app.utils.enums import OrderStatus, UserRole


class DashboardService:
    def __init__(self, db: Session):
        self.db = db
        self.product_repo = ProductRepository(db)
        self.order_repo = OrderRepository(db)
        self.user_repo = UserRepository(db)

    def get_statistics(self) -> dict:
        total_orders = self.order_repo.count_all()
        pending_orders = self.order_repo.count_by_status(OrderStatus.PENDING)
        processing_orders = self.order_repo.count_by_status(OrderStatus.PROCESSING)
        completed_orders = self.order_repo.count_by_status(OrderStatus.COMPLETED)
        cancelled_orders = self.order_repo.count_by_status(OrderStatus.CANCELLED)

        total_revenue = self.order_repo.get_total_revenue()
        average_order_value = self.order_repo.get_average_order_value()

        total_products = self.product_repo.count_all()
        active_products = self.product_repo.count_active()
        low_stock_products = self.product_repo.count_low_stock()

        total_customers = self.user_repo.count_by_role(UserRole.CUSTOMER)
        total_admins = self.user_repo.count_by_role(UserRole.ADMIN)
        total_super_admins = self.user_repo.count_by_role(UserRole.SUPER_ADMIN)

        order_status_distribution = self.order_repo.get_status_distribution()

        return {
            "orders": {
                "total": total_orders,
                "pending": pending_orders,
                "processing": processing_orders,
                "completed": completed_orders,
                "cancelled": cancelled_orders,
                "status_distribution": order_status_distribution
            },
            "revenue": {
                "total": round(total_revenue, 2),
                "average_order_value": round(average_order_value, 2)
            },
            "products": {
                "total": total_products,
                "active": active_products,
                "low_stock": low_stock_products
            },
            "users": {
                "customers": total_customers,
                "admins": total_admins,
                "super_admins": total_super_admins,
                "total": total_customers + total_admins + total_super_admins
            }
        }

    def get_top_products(self, limit: int = 5) -> list:
        top_products = self.product_repo.get_top_selling(limit)

        result = []
        for product, total_sold, revenue in top_products:
            product_data = ProductWithSales.model_validate(product)
            product_data.total_sold = total_sold or 0
            product_data.revenue = round(revenue or 0.0, 2)
            result.append(product_data.model_dump())

        return result