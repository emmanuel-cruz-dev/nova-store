import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db.init_db import init_db
from app.models.user import User
from app.db.base import Base
from app.core.config import settings

def main():
    print("🌱 Seeding database...")

    from sqlalchemy import create_engine
    engine = create_engine(settings.DATABASE_URL)

    print(f"📦 Creando tablas en: {settings.DATABASE_URL}")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        init_db(db)
        print("✅ Database seeded successfully!")

        users = db.query(User).all()
        print(f"\n👥 Usuarios creados ({len(users)}):")
        for user in users:
            print(f"  - {user.email} ({user.role})")

    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    main()