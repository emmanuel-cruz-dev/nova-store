from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional, Dict, Any
from datetime import datetime

from app.repositories.product_repository import ProductRepository
from app.schemas.product import ProductResponse, ProductCreate, ProductUpdate
from app.utils.enums import ProductCategory, StockLevel


class ProductService:
    def __init__(self, db: Session):
        self.db = db
        self.product_repo = ProductRepository(db)

    def get_all_products(
        self,
        page: int = 1,
        limit: int = 10,
        category: Optional[ProductCategory] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        is_active: Optional[bool] = True,
        stock_level: Optional[StockLevel] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc"
    ) -> Dict[str, Any]:
        """Get all products with filters and pagination"""
        skip = (page - 1) * limit

        products, total = self.product_repo.get_all(
            skip=skip,
            limit=limit,
            category=category,
            search=search,
            min_price=min_price,
            max_price=max_price,
            is_active=is_active,
            stock_level=stock_level,
            sort_by=sort_by,
            sort_order=sort_order
        )

        products_response = [ProductResponse.model_validate(p) for p in products]

        return {
            "products": products_response,
            "total": total,
            "page": page,
            "limit": limit,
            "pages": (total + limit - 1) // limit if limit > 0 else 0
        }

    def get_product_by_id(self, product_id: int) -> ProductResponse:
        """Get product by ID (public, returns only active products)"""
        product = self.product_repo.get_by_id(product_id)

        if not product or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )

        return ProductResponse.model_validate(product)

    def get_product_by_id_admin(self, product_id: int) -> ProductResponse:
        """Get product by ID (admin, returns all products including inactive)"""
        product = self.product_repo.get_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )

        return ProductResponse.model_validate(product)

    def create_product(self, product_data: ProductCreate) -> ProductResponse:
        """Create new product (admin only)"""
        product_dict = product_data.model_dump()

        product = self.product_repo.create(product_dict)

        return ProductResponse.model_validate(product)

    def update_product(self, product_id: int, update_data: ProductUpdate) -> ProductResponse:
        """Update product (admin only)"""
        product = self.product_repo.get_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )

        update_dict = update_data.model_dump(exclude_unset=True)

        updated_product = self.product_repo.update(product, update_dict)

        return ProductResponse.model_validate(updated_product)

    def delete_product(self, product_id: int) -> Dict[str, Any]:
        """Soft delete product (mark as inactive)"""
        product = self.product_repo.get_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )

        deleted_product = self.product_repo.soft_delete(product)

        return {
            "message": "Product deactivated successfully",
            "product_id": product_id,
            "deleted_at": datetime.utcnow().isoformat()
        }

    def restore_product(self, product_id: int) -> ProductResponse:
        """Restore deactivated product (admin only)"""
        product = self.product_repo.get_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )

        if product.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Product is already active"
            )

        product.is_active = True
        self.db.commit()
        self.db.refresh(product)

        return ProductResponse.model_validate(product)

    def check_stock_availability(self, product_id: int, quantity: int) -> bool:
        """Check if product has enough stock"""
        product = self.product_repo.get_by_id(product_id)

        if not product or not product.is_active:
            return False

        return product.stock >= quantity

    def update_stock(self, product_id: int, quantity_change: int) -> ProductResponse:
        """Update product stock (admin only)"""
        product = self.product_repo.get_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )

        updated_product = self.product_repo.update_stock(product, quantity_change)

        return ProductResponse.model_validate(updated_product)


    def get_product_stats(self) -> Dict[str, Any]:
        """Get product statistics (admin only)"""
        total = self.product_repo.count_all()
        active = self.product_repo.count_active()
        low_stock = self.product_repo.count_low_stock()
        out_of_stock = self.product_repo.count_out_of_stock()

        return {
            "total_products": total,
            "active_products": active,
            "inactive_products": total - active,
            "low_stock_products": low_stock,
            "out_of_stock_products": out_of_stock,
            "in_stock_percentage": ((active - out_of_stock) / active * 100) if active > 0 else 0
        }

    def get_categories_stats(self) -> Dict[str, Any]:
        """Get product count by category"""
        stats = {}
        for category in ProductCategory:
            count = self.product_repo.count_by_category(category)
            stats[category.value] = count

        return {"categories": stats}