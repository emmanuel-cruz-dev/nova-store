from typing import TypeVar, Generic, List, Dict, Any
from pydantic import BaseModel
from math import ceil

T = TypeVar('T')


class PaginatedResponse(BaseModel, Generic[T]):
    """Generic paginated response"""
    items: List[T]
    total: int
    page: int
    limit: int
    pages: int

    class Config:
        from_attributes = True


def create_pagination_response(
    items: List[Any],
    total: int,
    page: int,
    limit: int
) -> Dict[str, Any]:
    """
    Create a standardized pagination response

    Args:
        items: List of items for current page
        total: Total number of items
        page: Current page number
        limit: Items per page

    Returns:
        Dictionary with pagination metadata
    """
    pages = ceil(total / limit) if limit > 0 else 0

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": pages
    }


def calculate_skip(page: int, limit: int) -> int:
    """
    Calculate skip value for database query

    Args:
        page: Current page (1-indexed)
        limit: Items per page

    Returns:
        Number of items to skip
    """
    return (page - 1) * limit


def validate_pagination_params(page: int, limit: int, max_limit: int = 100) -> tuple[int, int]:
    """
    Validate and normalize pagination parameters

    Args:
        page: Page number
        limit: Items per page
        max_limit: Maximum allowed limit

    Returns:
        Tuple of (validated_page, validated_limit)
    """
    page = max(1, page)

    limit = max(1, min(limit, max_limit))

    return page, limit