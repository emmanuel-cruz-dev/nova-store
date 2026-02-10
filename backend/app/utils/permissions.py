from app.models.user import User
from app.utils.enums import UserRole


def has_admin_access(user: User) -> bool:
    return user.role in [UserRole.ADMIN, UserRole.SUPER_ADMIN]


def is_super_admin(user: User) -> bool:
    return user.role == UserRole.SUPER_ADMIN


def can_manage_user(manager: User, target: User) -> bool:
    role_hierarchy = {
        UserRole.CUSTOMER: 1,
        UserRole.ADMIN: 2,
        UserRole.SUPER_ADMIN: 3
    }

    manager_level = role_hierarchy[manager.role]
    target_level = role_hierarchy[target.role]

    return manager_level > target_level


def get_manageable_roles(user: User) -> list[UserRole]:
    if user.role == UserRole.SUPER_ADMIN:
        return [UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SUPER_ADMIN]
    elif user.role == UserRole.ADMIN:
        return [UserRole.CUSTOMER]
    else:
        return []


ROLE_HIERARCHY = {
    UserRole.CUSTOMER: 1,
    UserRole.ADMIN: 2,
    UserRole.SUPER_ADMIN: 3
}

def check_permission(user_role: UserRole, required_role: UserRole) -> bool:
    return ROLE_HIERARCHY.get(user_role, 0) >= ROLE_HIERARCHY.get(required_role, 0)