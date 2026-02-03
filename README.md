# 🛍️ Nova Store - Full Stack E-Commerce Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

</div>

## 👨‍💻 Autor

- **Emmanuel Cruz**
- **Full Stack Developer**

> Plataforma e-commerce full stack con sistema de autenticación, gestión de productos, carrito de compras y panel administrativo completo.

---

## 📋 Descripción general

**Nova Store** es una aplicación e-commerce completa que incluye:

- **Frontend moderno** en React 19 + TypeScript con diseño responsivo
- **Backend robusto** en FastAPI (Python) con autenticación JWT
- **Sistema de roles** jerárquico (customer, admin, super_admin)
- **Gestión completa** de productos, usuarios y órdenes
- **Panel administrativo** con estadísticas en tiempo real

---

## 🚀 Demo

👉 **[Ver aplicación en vivo](https://nova-store-shop.vercel.app/)**

---

## 🗂 Estructura del proyecto

```
nova-store/
├── frontend/          # Aplicación React + TypeScript
│   ├── src/
│   ├── public/
│   └── README.md     # Documentación del frontend
│
└── backend/          # API FastAPI + Python
    ├── app/
    ├── tests/
    └── README.md     # Documentación del backend
```

---

## 🚀 Inicio rápido

### Requisitos previos

- **Node.js** ≥ 16
- **Python** ≥ 3.9
- **pnpm** ≥ 8 (recomendado para frontend)
- **PostgreSQL** ≥ 14 (o base de datos de tu elección)

### Configuración

#### 1. Frontend

```bash
cd frontend
pnpm install
cp .env.example .env
# Configurar VITE_API_URL en .env
pnpm dev
```

📖 **Documentación completa:** [frontend/README.md](./frontend/README.md)

#### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configurar variables de entorno
uvicorn app.main:app --reload
```

📖 **Documentación completa:** [backend/README.md](./backend/README.md)

---

## ✨ Funcionalidades principales

### Para usuarios (customers)

- ✅ Registro y autenticación segura
- ✅ Búsqueda y filtrado avanzado de productos
- ✅ Carrito de compras con persistencia
- ✅ Proceso de checkout completo
- ✅ Historial de órdenes
- ✅ Gestión de perfil

### Para administradores

- ✅ Dashboard con estadísticas en tiempo real
- ✅ Gestión completa de productos (CRUD)
- ✅ Gestión de usuarios con control por roles
- ✅ Administración de órdenes
- ✅ Filtros y búsquedas avanzadas

### Sistema de roles

- **Customer:** Compras y gestión de cuenta
- **Admin:** Gestión de productos, customers y órdenes
- **Super Admin:** Control total del sistema incluyendo gestión de admins

---

## 🧰 Stack tecnológico

### Frontend

- React 19 + TypeScript
- Zustand (state management)
- SWR (data fetching)
- React Hook Form + Zod
- Bootstrap 5 + React Bootstrap
- Motion (animaciones)

### Backend

- FastAPI (Python)
- SQLAlchemy (ORM)
- PostgreSQL
- JWT Authentication
- Pydantic (validación)

---

## 📚 Documentación detallada

Cada módulo tiene su propia documentación completa:

- **[Frontend](./frontend/README.md)** - Arquitectura, componentes, hooks, rutas
- **[Backend](./backend/README.md)** - API endpoints, modelos, autenticación, base de datos

---

## 🔐 Credenciales de prueba

_(Se agregarán después de configurar la base de datos)_

---

## 🛠️ Estado del proyecto

- ✅ Frontend completamente funcional
- 🚧 Backend en desarrollo (migración desde MockAPI)
- ⏳ Integración frontend-backend pendiente

---

## 📝 Roadmap

- [x] Frontend con MockAPI
- [ ] Backend con FastAPI
- [ ] Integración completa
- [ ] Sistema de pagos
- [ ] Notificaciones por email
- [ ] Panel de analytics avanzado

---
