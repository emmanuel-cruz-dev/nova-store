import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.db.init_db import init_db
from app.models.user import User
from app.models.product import Product


def main():
    print("🌱 Seeding database...")

    db = SessionLocal()
    try:
        init_db(db)
        print("✅ Database seeded successfully!")

        users = db.query(User).all()
        products = db.query(Product).all()

        print(f"\n📊 Summary:")
        print(f"  👥 Users: {len(users)}")
        print(f"  🛍️ Products: {len(products)}")

        print(f"\n👥 Sample users:")
        for user in users[:3]:
            print(f"  - {user.email} ({user.role.value})")

        print(f"\n🛍️ Sample products:")
        for product in products[:3]:
            print(f"  - {product.name} ({product.category.value}) - Stock: {product.stock}")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    main()