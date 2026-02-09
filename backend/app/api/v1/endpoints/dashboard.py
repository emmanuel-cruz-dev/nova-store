from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_admin
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["Dashboard"], dependencies=[Depends(get_current_admin)])


@router.get("/statistics")
def get_statistics(db: Session = Depends(get_db)):
    """Get dashboard statistics (admin only)"""
    dashboard_service = DashboardService(db)
    return dashboard_service.get_statistics()


@router.get("/top-products")
def get_top_products(
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """Get top selling products (admin only)"""
    dashboard_service = DashboardService(db)
    return dashboard_service.get_top_products(limit)