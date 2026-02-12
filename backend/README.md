# 🛍️ Nova Store - Backend API

> Backend completo para Nova Store E-commerce, construido con FastAPI, SQLAlchemy y PostgreSQL.

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)

</div>

## 📋 Descripción

Backend RESTful API para Nova Store que proporciona:

- 🔐 **Autenticación JWT** con roles de usuario (customer, admin, super_admin)
- 👥 **Gestión de usuarios** con sistema jerárquico de permisos
- 🛒 **Carrito y checkout** con validación de stock en tiempo real
- 📦 **Gestión de productos** con filtros avanzados
- 📋 **Sistema de órdenes** con estados y tracking
- 📊 **Dashboard administrativo** con estadísticas y métricas
- 🔍 **Filtros y paginación** en todos los endpoints
- ✅ **Validación robusta** con Pydantic schemas

---

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas limpia y escalable:

```
app/
├── main.py                   # Entry point
├── core/                     # Configuración global
│   ├── config.py             # Settings y variables de entorno
│   ├── security.py           # JWT, hashing, autenticación
│   ├── dependencies.py       # Dependencias comunes
│   └── logging.py            # Configuración de logs
├── db/                       # Capa de base de datos
│   ├── base.py               # Base declarativa
│   ├── session.py            # Engine y SessionLocal
│   └── init_db.py            # Seed de datos iniciales
├── models/                   # Modelos SQLAlchemy (ORM)
│   ├── user.py
│   ├── product.py
│   └── order.py
├── schemas/                  # Schemas Pydantic (DTOs)
│   ├── user.py
│   ├── product.py
│   ├── order.py
│   └── auth.py
├── repositories/             # Capa de acceso a datos
│   ├── user_repository.py
│   ├── product_repository.py
│   └── order_repository.py
├── services/                 # Lógica de negocio
│   ├── auth_service.py
│   ├── user_service.py
│   ├── product_service.py
│   ├── order_service.py
│   └── dashboard_service.py
├── api/                      # Capa HTTP (endpoints)
│   └── v1/
│       ├── router.py         # Router principal
│       ├── auth.py
│       ├── users.py
│       ├── products.py
│       ├── orders.py
│       └── dashboard.py
└── utils/                    # Utilidades
    ├── enums.py
    ├── pagination.py
    └── permissions.py
```

---

## 🚀 Inicio rápido

### Requisitos previos

- Python 3.10+
- PostgreSQL 15+
- pip o poetry

### Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd nova-store-backend

# 2. Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 5. Configurar la base de datos
# Ver sección "Configuración de la base de datos" más abajo

# 6. Iniciar el servidor
uvicorn app.main:app --reload
```

La API estará disponible en `http://localhost:8000`

---

## 🗄️ Configuración de la base de datos

### Primera configuración

1. **Crear una base de datos PostgreSQL**

```bash
createdb novastore_db
```

2. **Ejecutar la configuración de la base de datos (migraciones + datos de inicialización)**

```bash
python setup_db.py
```

### Pasos manuales (alternativa)

1. **Ejecutar migraciones**

```bash
alembic upgrade head
```

2. **Base de datos de inicialización**

```bash
python scripts/seed_db.py
```

### Restablecer la base de datos

1. **Eliminar todas las tablas en pgAdmin o mediante psql**

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

2. **Reiniciar la configuración**

```bash
python setup_db.py
```

### Crear nueva migración

Después de modificar los modelos:

```bash
alembic revision --autogenerate -m "Descripción de los cambios"
alembic upgrade head
```

---

## ⚙️ Variables de entorno

Crear archivo `.env` en la raíz:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nova_store

# JWT
SECRET_KEY=tu-clave-secreta-super-segura-cambiar-en-produccion
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://nova-store-shop.vercel.app

# App
PROJECT_NAME=Nova Store API
VERSION=1.0.0
DEBUG=True
```

---

## 📚 API Endpoints

### Documentación interactiva

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Endpoints principales

#### Autenticación

```
POST   /api/v1/auth/login       # Login
POST   /api/v1/auth/register    # Registro
POST   /api/v1/auth/refresh     # Refrescar token de acceso
POST   /api/v1/auth/logout      # Logout
GET    /api/v1/auth/me          # Obtener información del usuario actual
GET    /api/v1/auth/check       # Verificar estado de autenticación
```

#### Usuarios

```
GET    /api/v1/users/me                  # Obtener perfil
PUT    /api/v1/users/me                  # Actualizar perfil
PATCH  /api/v1/users/me                  # Actualizar perfil parcialmente
POST   /api/v1/users/me/change-password  # Cambiar contraseña
DELETE /api/v1/users/me                  # Eliminar cuenta

# Admin endpoints
GET    /api/v1/users                     # Listar usuarios (con filtros)
POST   /api/v1/users                     # Crear usuario
GET    /api/v1/users/{id}                # Obtener usuario
PUT    /api/v1/users/{id}                # Actualizar usuario
PATCH  /api/v1/users/{id}                # Actualizar usuario parcialmente
DELETE /api/v1/users/{id}                # Eliminar/desactivar usuario
POST   /api/v1/users/{id}/restore        # Restaurar usuario desactivado
PATCH  /api/v1/users/{id}/role           # Cambiar rol (super_admin)
GET    /api/v1/users/roles/all           # Obtener todos los roles disponibles
```

#### Productos

```
GET    /api/v1/products                        # Listar productos activos (con filtros)
GET    /api/v1/products/{id}                   # Obtener producto activo
GET    /api/v1/products/categories/all         # Obtener todas las categorías

# Admin endpoints
GET    /api/v1/products/admin/all              # Listar todos los productos (incluye inactivos)
GET    /api/v1/products/admin/{id}             # Obtener producto (incluye inactivos)
POST   /api/v1/products                        # Crear producto
PUT    /api/v1/products/{id}                   # Actualizar producto
DELETE /api/v1/products/{id}                   # Desactivar producto
POST   /api/v1/products/{id}/restore           # Restaurar producto desactivado
POST   /api/v1/products/{id}/stock             # Actualizar stock del producto
GET    /api/v1/products/admin/stats/summary    # Obtener estadísticas de productos
GET    /api/v1/products/admin/stats/categories # Obtener estadísticas por categoría
```

#### Órdenes

```
# Endpoints de usuario
POST   /api/v1/orders                      # Crear orden (autenticado)
GET    /api/v1/orders/my-orders            # Obtener mis órdenes (con filtros)
GET    /api/v1/orders/{id}                 # Obtener orden específica
DELETE /api/v1/orders/me/{id}              # Cancelar orden propia
GET    /api/v1/orders/me/stats             # Obtener estadísticas de mis órdenes

# Endpoints públicos
POST   /api/v1/orders/guest                # Crear orden como invitado
GET    /api/v1/orders/{id}/check           # Verificar estado de orden (con email)
GET    /api/v1/orders/statuses/all         # Obtener todos los estados disponibles

# Admin endpoints
GET    /api/v1/orders/admin/all            # Obtener todas las órdenes (con filtros)
GET    /api/v1/orders/admin/{id}           # Obtener cualquier orden
PATCH  /api/v1/orders/admin/{id}/status    # Actualizar estado de orden
DELETE /api/v1/orders/admin/{id}           # Eliminar orden permanentemente (super_admin)
GET    /api/v1/orders/admin/stats          # Obtener estadísticas de órdenes
GET    /api/v1/orders/admin/stats/recent   # Obtener estadísticas recientes
```

#### Dashboard (Admin)

```
GET    /api/v1/dashboard/statistics   # Estadísticas generales del dashboard
GET    /api/v1/dashboard/top-products # Productos más vendidos
```

---

## 🔐 Sistema de autenticación

### JWT Tokens

Todos los endpoints protegidos requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

### Roles y permisos

| Rol           | Nivel | Descripción                      |
| ------------- | ----- | -------------------------------- |
| `customer`    | 1     | Usuario estándar (compras)       |
| `admin`       | 2     | Administrador (gestión limitada) |
| `super_admin` | 3     | Administrador total              |

#### Jerarquía de permisos

- Un usuario solo puede gestionar usuarios de nivel inferior
- `admin` puede gestionar solo `customer`
- `super_admin` puede gestionar `customer` y `admin`
- Los `super_admin` no pueden ser eliminados

---

## 🗄️ Modelos de datos

### User (Usuario)

```python
{
  "id": int,
  "email": str,
  "first_name": str,
  "last_name": str,
  "avatar": str,
  "role": "customer" | "admin" | "super_admin",
  "created_at": datetime
}
```

### Product (Producto)

```python
{
  "id": int,
  "name": str,
  "price": float,
  "stock": int,
  "rating": int,
  "category": str,
  "brand": str,
  "is_active": bool,
  "image": str,
  "description": str,
  "stock_level": "critical" | "low" | "ok" | "high",
  "created_at": datetime
}
```

### Order (Orden)

```python
{
  "id": int,
  "user_id": int,
  "status": "pending" | "processing" | "completed" | "cancelled",
  "total": float,
  "shipping_info": {...},
  "items": [OrderItem],
  "created_at": datetime
}
```

---

## 🔄 Migraciones con Alembic

Para la configuración completa de la base de datos, consulta la sección [Configuración de la base de datos](#🗄️-configuración-de-la-base-de-datos).

```bash
# Crear nueva migración
alembic revision --autogenerate -m "descripcion"

# Aplicar migraciones
alembic upgrade head

# Revertir última migración
alembic downgrade -1

# Ver historial
alembic history
```

---

## 📊 Base de datos inicial

Al iniciar por primera vez, se crean automáticamente:

### Usuarios de prueba

| Email                 | Password    | Role        |
| --------------------- | ----------- | ----------- |
| admin@novastore.com   | admin123    | super_admin |
| manager@novastore.com | manager123  | admin       |
| customer@example.com  | customer123 | customer    |

### Productos de ejemplo

Se crean 10 productos de muestra en diferentes categorías:

- Electronics (iPhone, Samsung, MacBook, etc.)
- Fashion (Nike, Levi's)
- Books (The Great Gatsby, Atomic Habits)
- Home (Vitamix, Dyson)

---

## 🚀 Despliegue

### Variables importantes para producción

```env
DEBUG=False
SECRET_KEY=<generar-clave-segura>
DATABASE_URL=postgresql://user:pass@host:5432/db
ALLOWED_ORIGINS=https://tu-dominio.com
```

---

## 🛠️ Tecnologías

- **FastAPI** - Framework web moderno y rápido
- **SQLAlchemy 2.0** - ORM avanzado
- **Pydantic** - Validación de datos
- **Alembic** - Migraciones de base de datos
- **PostgreSQL** - Base de datos relacional
- **Python-Jose** - JWT tokens
- **Passlib** - Hashing de contraseñas
- **Uvicorn** - ASGI server

---

## 📝 Notas de desarrollo

### Buenas prácticas implementadas

✅ Arquitectura en capas separadas (Repository, Service, API)  
✅ Validación con Pydantic schemas  
✅ Gestión de errores consistente  
✅ Paginación en todos los listados  
✅ Filtros avanzados y búsqueda  
✅ Sistema de roles jerárquico  
✅ Tokens JWT con expiración  
✅ Hashing seguro de contraseñas  
✅ CORS configurado  
✅ Logging estructurado  
✅ Seed de datos iniciales  
✅ Migraciones con Alembic

### Seguridad

- Las contraseñas se hashean con bcrypt
- JWT tokens con tiempo de expiración
- Validación de permisos en cada endpoint
- CORS configurado correctamente
- SQL injection prevenido por SQLAlchemy ORM
- Validación de entrada con Pydantic

---

## 🤝 Contribución

Este es un proyecto individual desarrollado para aplicar conceptos avanzados de arquitectura backend en el ecosistema de Python.

---

## 👨‍💻 Autor

**Emmanuel Cruz**

- Fullstack Developer
- Proyecto desarrollado con FastAPI y PostgreSQL

---

## 📄 Licencia

Este proyecto es parte de un portafolio educativo.

---

## 🔗 Links relacionados

- **Repositorio Principal**: [Nova Store](https://github.com/emmanuel-cruz-dev/nova-store)
- **Frontend Repository**: [Nova Store Frontend](https://github.com/emmanuel-cruz-dev/nova-store/tree/main/frontend)
- **API Docs**: `http://localhost:8000/docs`
- **Demo Live**: Próximamente

---

## 📞 Soporte

Para reportar problemas o sugerencias, crear un issue en el repositorio.
