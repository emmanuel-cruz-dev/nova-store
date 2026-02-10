from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.logging import logger
from app.api.v1.router import api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for startup and shutdown"""
    logger.info(f"🚀 Starting {settings.PROJECT_NAME} v{settings.VERSION}...")

    if settings.DEBUG:
        logger.debug("📦 Checking database connection...")
        logger.info("💡 Note: Database schema managed by Alembic")

    yield

    logger.info("👋 Shutting down Nova Store API...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
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

@app.get("/", tags=["Root"])
def root():
    """Root endpoint"""
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health", tags=["Health Check"])
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}