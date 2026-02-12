# 🛍️ Nova Store - E-Commerce Platform

<div align="center">
  
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.128-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange)
![SWR](https://img.shields.io/badge/SWR-Data%20Fetching-black)

</div>

## 👨‍💻 Autor

- **Emmanuel Cruz**
- **Fullstack Developer**

> Plataforma e-commerce fullstack moderna construida con React + TypeScript en el frontend y FastAPI + PostgreSQL en el backend.

---

## 🚀 Demo en vivo

- 👉 **Frontend:** [https://nova-store-shop.vercel.app](https://nova-store-shop.vercel.app/)
- 📚 **API Docs:** [https://nova-store-backend.onrender.com/docs](https://nova-store-backend.onrender.com/docs)

---

## 📋 Estado del proyecto

### ✅ Completado
- **Frontend completo** en React 19 + TypeScript
- **Backend RESTful API** con FastAPI + PostgreSQL
- Sistema de autenticación JWT con roles jerárquicos
- Base de datos con PostgreSQL + SQLAlchemy
- Migraciones con Alembic
- Deploy automatizado (Frontend: Vercel, Backend: Render, DB: Neon)
- Documentación API interactiva (Swagger/ReDoc)

### 🚧 En desarrollo
- Integración frontend-backend
- Migración desde MockAPI al backend propio
- Sistema de pagos
- Notificaciones por email

---

## 🗂 Estructura del proyecto
```
nova-store/
├── README.md              # Este archivo
├── frontend/              # Cliente React + TypeScript
│   ├── src/
│   ├── public/
│   └── README.md         # Documentación del frontend
└── backend/               # API FastAPI + PostgreSQL
    ├── app/
    │   ├── api/          # Endpoints REST
    │   ├── models/       # Modelos SQLAlchemy
    │   ├── schemas/      # Schemas Pydantic
    │   ├── services/     # Lógica de negocio
    │   └── core/         # Config, seguridad, JWT
    ├── alembic/          # Migraciones
    └── README.md         # Documentación del backend
```

---

## 🚀 Inicio rápido

### Frontend
```bash
cd frontend
pnpm install
cp .env.example .env
# Configurar VITE_BASE_API_URL
pnpm dev
```

📖 **[Documentación completa del frontend →](./frontend/README.md)**

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configurar DATABASE_URL y SECRET_KEY
alembic upgrade head
python scripts/seed_db.py  # Datos iniciales (opcional)
uvicorn app.main:app --reload
```

📖 **[Documentación completa del backend →](./backend/README.md)**

---

## ✨ Funcionalidades principales

### 🔐 Autenticación y seguridad
- JWT tokens con expiración automática
- Hashing seguro de contraseñas (bcrypt)
- Refresh tokens para mantener sesión
- Sistema de roles jerárquico de 3 niveles
- Validación de permisos en cada acción

### 👥 Sistema de roles

| Rol           | Nivel | Capacidades                                              |
| ------------- | ----- | -------------------------------------------------------- |
| `customer`    | 1     | Compras, carrito, órdenes propias, gestión de perfil     |
| `admin`       | 2     | Gestión de productos, customers, órdenes, dashboard      |
| `super_admin` | 3     | Control total: gestión de admins, cambio de roles, stats |

### 🛒 Para clientes (customers)
- Registro y autenticación con validación robusta
- Catálogo con búsqueda y filtros avanzados
- Carrito de compras con persistencia
- Proceso de checkout completo
- Historial de órdenes con estados
- Gestión de perfil y eliminación de cuenta

### 📊 Panel administrativo
- **Dashboard con estadísticas en tiempo real:**
  - Ingresos totales y promedio por orden
  - Productos activos y alertas de stock
  - Distribución de órdenes por estado
  - Total de usuarios por rol
- **Gestión de productos:**
  - CRUD completo con validación
  - Filtros: búsqueda, precio, stock, estado
  - Control de stock en tiempo real
  - Activar/desactivar productos
- **Gestión de usuarios:**
  - Control jerárquico por roles
  - Filtros: nombre, email, rol, actividad, fecha
  - Acciones masivas (cambio de rol, eliminación)
  - Validación de permisos automática
- **Gestión de órdenes:**
  - Visualización completa de todas las órdenes
  - Actualización de estados
  - Estadísticas y métricas

---

## 🧰 Stack tecnológico

### Frontend
- **Core:** React 19, TypeScript, Vite
- **State:** Zustand (global), SWR (server cache)
- **Forms:** React Hook Form + Zod
- **UI:** Bootstrap 5, Motion, Swiper
- **HTTP:** Axios con interceptores
- **Icons:** Lucide React
- **Deploy:** Vercel

### Backend
- **Framework:** FastAPI 0.128
- **ORM:** SQLAlchemy 2.0
- **Database:** PostgreSQL 15+ (Neon serverless)
- **Validation:** Pydantic 2.12
- **Auth:** JWT (python-jose), bcrypt (passlib)
- **Migrations:** Alembic 1.13
- **Server:** Uvicorn (dev), Gunicorn + Uvicorn workers (prod)
- **Deploy:** Render

---

## 📡 API Endpoints

El backend expone endpoints RESTful organizados por dominio:

### Autenticación (`/api/v1/auth`)
- `POST /login` - Login con email/password
- `POST /register` - Registro de nuevos usuarios
- `POST /refresh` - Refrescar access token
- `GET /me` - Obtener usuario actual
- `POST /logout` - Cerrar sesión

### Usuarios (`/api/v1/users`)
- `GET /me` - Perfil del usuario
- `PUT /me` - Actualizar perfil
- `POST /me/change-password` - Cambiar contraseña
- `DELETE /me` - Eliminar cuenta
- **Admin:** CRUD completo, filtros, cambio de roles

### Productos (`/api/v1/products`)
- `GET /` - Listar productos activos (público)
- `GET /{id}` - Detalle de producto
- `GET /categories/all` - Categorías disponibles
- **Admin:** CRUD completo, gestión de stock, filtros avanzados

### Órdenes (`/api/v1/orders`)
- `POST /` - Crear orden (autenticado)
- `POST /guest` - Crear orden como invitado
- `GET /my-orders` - Mis órdenes
- `GET /{id}` - Detalle de orden
- **Admin:** Todas las órdenes, cambio de estados, estadísticas

### Dashboard (`/api/v1/dashboard`)
- `GET /statistics` - Estadísticas generales
- `GET /top-products` - Productos más vendidos

📚 **[Documentación interactiva completa →](https://nova-store-backend.onrender.com/docs)**

---

## 🗄️ Base de datos

### Esquema principal

**Users** (usuarios del sistema)
- Campos: id, email, first_name, last_name, password (hashed), role, avatar, created_at
- Roles: customer, admin, super_admin

**Products** (productos del catálogo)
- Campos: id, name, price, stock, category, brand, image, description, is_active, rating
- Stock levels: critical (<10), low (10-50), ok (51-100), high (>100)

**Orders** (órdenes de compra)
- Campos: id, user_id, status, total, shipping_info, created_at
- Estados: pending, processing, completed, cancelled

**OrderItems** (items de cada orden)
- Relación many-to-many entre Orders y Products
- Campos: order_id, product_id, quantity, price_at_purchase

### Migraciones
```bash
# Crear migración
alembic revision --autogenerate -m "descripción"

# Aplicar migraciones
alembic upgrade head

# Revertir última migración
alembic downgrade -1
```

---

## 🔐 Seguridad implementada

✅ Contraseñas hasheadas con bcrypt  
✅ JWT tokens con expiración  
✅ Refresh tokens para renovación  
✅ Validación de permisos por rol  
✅ CORS configurado correctamente  
✅ SQL injection prevenido (ORM)  
✅ Validación de entrada con Pydantic  
✅ SSL/TLS en producción  
✅ Variables de entorno para secretos  
✅ Rate limiting (próximamente)

---

## 🚀 Deploy

### Frontend (Vercel)
- Build automático desde `main` branch
- Variables de entorno configuradas
- Dominio custom disponible

### Backend (Render)
- Deploy automático desde GitHub
- Migraciones automáticas en cada deploy
- Health checks configurados
- **Build:** `pip install -r requirements.txt && alembic upgrade head`
- **Start:** `gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker`

### Base de datos (Neon)
- PostgreSQL serverless
- Backups automáticos
- Connection pooling
- SSL habilitado por defecto

---

## 📝 Usuarios de prueba

Después de ejecutar `python scripts/seed_db.py`:

| Email                 | Password    | Rol         |
| --------------------- | ----------- | ----------- |
| admin@novastore.com   | admin123    | super_admin |
| manager@novastore.com | manager123  | admin       |
| customer@example.com  | customer123 | customer    |

---

## 🗺️ Roadmap

### Fase actual: Integración
- [ ] Conectar frontend con backend propio
- [ ] Migrar de MockAPI a FastAPI
- [ ] Optimización de rendimiento

### Próximas funcionalidades
- [ ] Sistema de reviews y ratings
- [ ] Analytics avanzado

---

## 📚 Documentación

- **[Frontend README](./frontend/README.md)** - Arquitectura, componentes, hooks
- **[Backend README](./backend/README.md)** - API, modelos, servicios, deploy
- **[API Docs (Swagger)](https://nova-store-backend.onrender.com/docs)** - Documentación interactiva
- **[API Docs (ReDoc)](https://nova-store-backend.onrender.com/redoc)** - Documentación alternativa

---

## 🤝 Contribuciones

Este es un proyecto personal en desarrollo activo. Sugerencias y feedback son bienvenidos vía issues o pull requests.

---

## 🔗 Links

- **Frontend:** [https://nova-store-shop.vercel.app](https://nova-store-shop.vercel.app/)
- **API Backend:** [https://nova-store-backend.onrender.com](https://nova-store-backend.onrender.com)
- **API Docs:** [https://nova-store-backend.onrender.com/docs](https://nova-store-backend.onrender.com/docs)
