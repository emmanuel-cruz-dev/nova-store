from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1.router import api_router
from app.db.base import Base
from app.db.session import engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for startup and shutdown"""
    print(f"🚀 Starting {settings.PROJECT_NAME} v{settings.VERSION}...")

    if settings.DEBUG:
        print("📦 Creating/verifying database tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Tables ready")
        print("💡 Note: Run 'python scripts/seed_db.py' to seed data")

    yield

    print("👋 Shutting down Nova Store API...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for Nova Store E-Commerce",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Nova Store API",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}