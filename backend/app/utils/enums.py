from enum import Enum


class UserRole(str, Enum):
    CUSTOMER = "customer"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"


class OrderStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class ProductCategory(str, Enum):
    ELECTRONICS = "electronics"
    GAMING = "gaming"
    CLOTHING = "clothing"
    BOOKS = "books"
    HOME = "home"
    SPORTS = "sports"
    BEAUTY = "beauty"


class StockLevel(str, Enum):
    CRITICAL = "critical"
    LOW = "low"
    OK = "ok"
    HIGH = "high"


class PaymentMethod(str, Enum):
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    PAYPAL = "paypal"
    CASH_ON_DELIVERY = "cash_on_delivery"