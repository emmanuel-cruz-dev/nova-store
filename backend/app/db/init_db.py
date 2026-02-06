from sqlalchemy.orm import Session
import logging
from app.core.security import get_password_hash
from app.models.user import User
from app.models.product import Product
from app.utils.enums import UserRole, ProductCategory

logger = logging.getLogger(__name__)


def init_db(db: Session) -> None:
    """Initialize database with seed data (users + products)"""

    existing_users = db.query(User).count()
    if existing_users > 0:
        logger.info("Database already has products, skipping seed")
        return

    logger.info("Initializing database with seed data...")

    try:
        users = [
            User(
                email="admin@novastore.com",
                password=get_password_hash("admin123"),
                first_name="Super",
                last_name="Admin",
                role=UserRole.SUPER_ADMIN,
                avatar="https://i.pravatar.cc/150?img=1",
                email_verified=True,
                is_active=True
            ),
            User(
                email="manager@novastore.com",
                password=get_password_hash("manager123"),
                first_name="Store",
                last_name="Manager",
                role=UserRole.ADMIN,
                avatar="https://i.pravatar.cc/150?img=2",
                email_verified=True,
                is_active=True
            ),
            User(
                email="customer@example.com",
                password=get_password_hash("customer123"),
                first_name="John",
                last_name="Doe",
                role=UserRole.CUSTOMER,
                avatar="https://i.pravatar.cc/150?img=3",
                email_verified=True,
                is_active=True
            )
        ]

        for i in range(1, 4):
            users.append(User(
                email=f"customer{i}@example.com",
                password=get_password_hash(f"customer{i}123"),
                first_name=f"Test{i}",
                last_name=f"User{i}",
                role=UserRole.CUSTOMER,
                email_verified=True,
                is_active=True
            ))

        db.add_all(users)
        logger.info(f"👥 Added {len(users)} users")

        products = [
            Product(
                name="iPhone 15 Pro Max",
                price=1299.99,
                stock=50,
                rating=4.8,
                category=ProductCategory.ELECTRONICS,
                brand="Apple",
                is_active=True,
                image="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
                description="Latest iPhone with A17 Pro chip and titanium design"
            ),
            Product(
                name="Samsung Galaxy S24 Ultra",
                price=1199.99,
                stock=35,
                rating=4.7,
                category=ProductCategory.ELECTRONICS,
                brand="Samsung",
                is_active=True,
                image="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
                description="Premium Android flagship with S Pen"
            ),
            Product(
                name="MacBook Pro 16\"",
                price=2499.99,
                stock=20,
                rating=4.9,
                category=ProductCategory.ELECTRONICS,
                brand="Apple",
                is_active=True,
                image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
                description="Powerful laptop with M3 Max chip"
            ),
            Product(
                name="Sony WH-1000XM5",
                price=399.99,
                stock=100,
                rating=4.6,
                category=ProductCategory.ELECTRONICS,
                brand="Sony",
                is_active=True,
                image="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
                description="Industry-leading noise canceling headphones"
            ),
            Product(
                name="Nike Air Max 270",
                price=159.99,
                stock=80,
                rating=4.3,
                category=ProductCategory.CLOTHING,
                brand="Nike",
                is_active=True,
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                description="Iconic sneakers with Max Air cushioning"
            ),
            Product(
                name="Levi's 501 Original Jeans",
                price=89.99,
                stock=150,
                rating=4.5,
                category=ProductCategory.CLOTHING,
                brand="Levi's",
                is_active=True,
                image="https://images.unsplash.com/photo-1542272454315-7f6d5b926b09?w=500",
                description="Classic straight-fit jeans"
            ),
            Product(
                name="The Great Gatsby",
                price=14.99,
                stock=200,
                rating=4.8,
                category=ProductCategory.BOOKS,
                brand="Scribner",
                is_active=True,
                image="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
                description="F. Scott Fitzgerald's masterpiece"
            ),
            Product(
                name="Atomic Habits",
                price=19.99,
                stock=120,
                rating=4.7,
                category=ProductCategory.BOOKS,
                brand="Avery",
                is_active=True,
                image="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500",
                description="Tiny changes, remarkable results by James Clear"
            ),
            Product(
                name="Vitamix E310 Blender",
                price=349.99,
                stock=30,
                rating=4.6,
                category=ProductCategory.HOME,
                brand="Vitamix",
                is_active=True,
                image="https://images.unsplash.com/photo-1585515320310-259814833e62?w=500",
                description="Professional-grade blender for home use"
            ),
            Product(
                name="Dyson V15 Detect",
                price=749.99,
                stock=25,
                rating=4.8,
                category=ProductCategory.HOME,
                brand="Dyson",
                is_active=True,
                image="https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
                description="Powerful cordless vacuum with laser detection"
            ),
        ]

        db.add_all(products)
        logger.info(f"🛍️ Added {len(products)} products")

        db.commit()
        logger.info("✅ Database initialized successfully!")

        total_users = db.query(User).count()
        total_products = db.query(Product).count()
        logger.info(f"📊 Summary: {total_users} users, {total_products} products")

    except Exception as e:
        logger.error(f"❌ Error initializing database: {e}")
        db.rollback()
        raise