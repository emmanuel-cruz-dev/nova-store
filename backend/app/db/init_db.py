from sqlalchemy.orm import Session
import logging
from app.core.security import get_password_hash
from app.models.user import User
from app.utils.enums import UserRole

logger = logging.getLogger(__name__)


def init_db(db: Session) -> None:
    """Initialize database with seed data - USERS ONLY for now"""

    existing_users = db.query(User).count()
    if existing_users > 0:
        logger.info("Database already has users, skipping seed")
        return

    logger.info("Initializing database with seed users...")

    try:
        super_admin = User(
            email="admin@novastore.com",
            password=get_password_hash("admin123"),
            first_name="Super",
            last_name="Admin",
            role=UserRole.SUPER_ADMIN,
            avatar="https://i.pravatar.cc/150?img=1",
            email_verified=True
        )
        db.add(super_admin)

        admin = User(
            email="manager@novastore.com",
            password=get_password_hash("manager123"),
            first_name="Store",
            last_name="Manager",
            role=UserRole.ADMIN,
            avatar="https://i.pravatar.cc/150?img=2",
            email_verified=True
        )
        db.add(admin)

        customer = User(
            email="customer@example.com",
            password=get_password_hash("customer123"),
            first_name="John",
            last_name="Doe",
            role=UserRole.CUSTOMER,
            avatar="https://i.pravatar.cc/150?img=3",
            email_verified=True
        )
        db.add(customer)

        # Create more test customers
        for i in range(1, 4):
            customer = User(
                email=f"customer{i}@example.com",
                password=get_password_hash(f"customer{i}123"),
                first_name=f"Test{i}",
                last_name=f"User{i}",
                role=UserRole.CUSTOMER,
                email_verified=True
            )
            db.add(customer)

        db.commit()
        logger.info(f"✅ Database initialized with {existing_users + 8} users")

    except Exception as e:
        logger.error(f"❌ Error initializing database: {e}")
        db.rollback()
        raise