from fastapi import APIRouter, Depends, Query, status, Path, Body
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from app.core.dependencies import get_db, get_current_admin
from app.services.product_service import ProductService
from app.schemas.product import ProductResponse, ProductCreate, ProductUpdate
from app.utils.enums import ProductCategory, StockLevel

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("")
def get_all_products(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    category: Optional[ProductCategory] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in name, brand or description"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price"),
    stock_level: Optional[StockLevel] = Query(None, description="Filter by stock level"),
    sort_by: str = Query("created_at", description="Sort by: created_at, price, name, rating"),
    sort_order: str = Query("desc", description="Sort order: asc, desc"),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get all products (public) - shows only active products"""
    product_service = ProductService(db)
    return product_service.get_all_products(
        page=page,
        limit=limit,
        category=category,
        search=search,
        min_price=min_price,
        max_price=max_price,
        is_active=True,
        stock_level=stock_level,
        sort_by=sort_by,
        sort_order=sort_order
    )


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int = Path(..., ge=1, description="Product ID"),
    db: Session = Depends(get_db)
) -> ProductResponse:
    """Get product by ID (public) - only active products"""
    product_service = ProductService(db)
    return product_service.get_product_by_id(product_id, only_active=True)


@router.get("/categories/all")
def get_all_categories() -> Dict[str, Any]:
    """Get all available product categories"""
    return {
        "categories": [
            {"value": cat.value, "label": cat.value.replace("_", " ").title()}
            for cat in ProductCategory
        ]
    }


@router.get(
    "/admin/all",
    dependencies=[Depends(get_current_admin)]
)
def get_all_products_admin(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[ProductCategory] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    is_active: Optional[bool] = None,
    stock_level: Optional[StockLevel] = None,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get all products (admin only) - includes inactive products"""
    product_service = ProductService(db)
    return product_service.get_all_products(
        page=page,
        limit=limit,
        category=category,
        search=search,
        min_price=min_price,
        max_price=max_price,
        is_active=is_active,
        stock_level=stock_level
    )


@router.get(
    "/admin/{product_id}",
    response_model=ProductResponse,
    dependencies=[Depends(get_current_admin)]
)
def get_product_admin(
    product_id: int = Path(..., ge=1),
    db: Session = Depends(get_db)
) -> ProductResponse:
    """Get product by ID (admin only) - includes inactive products"""
    product_service = ProductService(db)
    return product_service.get_product_by_id(product_id, only_active=False)


@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_admin)]
)
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db)
) -> ProductResponse:
    """Create new product (admin only)"""
    product_service = ProductService(db)
    return product_service.create_product(product_data)


@router.put(
    "/{product_id}",
    response_model=ProductResponse,
    dependencies=[Depends(get_current_admin)]
)
def update_product(
    product_id: int = Path(..., ge=1),
    update_data: ProductUpdate = Body(...),
    db: Session = Depends(get_db)
) -> ProductResponse:
    """Update product (admin only)"""
    product_service = ProductService(db)
    return product_service.update_product(product_id, update_data)


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_current_admin)]
)
def deactivate_product(
    product_id: int = Path(..., ge=1),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Deactivate product (admin only)"""
    product_service = ProductService(db)
    return product_service.deactivate_product(product_id)


@router.post(
    "/{product_id}/restore",
    response_model=ProductResponse,
    dependencies=[Depends(get_current_admin)]
)
def restore_product(
    product_id: int = Path(..., ge=1),
    db: Session = Depends(get_db)
) -> ProductResponse:
    """Restore deactivated product (admin only)"""
    product_service = ProductService(db)
    return product_service.restore_product(product_id)


@router.post(
    "/{product_id}/stock",
    response_model=ProductResponse,
    dependencies=[Depends(get_current_admin)]
)
def update_product_stock(
    product_id: int = Path(..., ge=1),
    quantity_change: int = Query(..., description="Positive to add, negative to remove"),
    db: Session = Depends(get_db)
) -> ProductResponse:
    """Update product stock (admin only)"""
    product_service = ProductService(db)
    return product_service.update_stock(product_id, quantity_change)


@router.get(
    "/admin/stats/summary",
    dependencies=[Depends(get_current_admin)]
)
def get_product_stats(
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get product statistics (admin only)"""
    product_service = ProductService(db)
    return product_service.get_product_stats()


@router.get(
    "/admin/stats/categories",
    dependencies=[Depends(get_current_admin)]
)
def get_categories_stats(
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get product count by category (admin only)"""
    product_service = ProductService(db)
    return product_service.get_categories_stats()