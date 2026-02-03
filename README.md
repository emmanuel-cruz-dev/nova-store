# 🛍️ Nova Store - E-Commerce Platform

<div align="center">
  
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange)
![SWR](https://img.shields.io/badge/SWR-Data%20Fetching-black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)

</div>

## 👨‍💻 Autor

- **Emmanuel Cruz**
- **Frontend Developer**

> Plataforma e-commerce moderna construida con React y TypeScript. Actualmente en proceso de migración de MockAPI a backend propio con FastAPI.

---

## 🚀 Demo en vivo

👉 **[Visitar la página](https://nova-store-shop.vercel.app/)**

---

## 📋 Estado actual del proyecto

### ✅ Completado
- **Frontend completo** en React 19 + TypeScript
- Sistema de autenticación con roles (customer, admin, super_admin)
- Carrito de compras y proceso de checkout
- Panel administrativo con estadísticas
- Gestión de productos, usuarios y órdenes
- Diseño responsivo y UX optimizada

### 🚧 En desarrollo
- **Backend con FastAPI** (próximamente)
- Migración desde MockAPI a base de datos propia
- API REST documentada con endpoints propios

---

## 🗂 Estructura actual
```
nova-store/
├── README.md          # Este archivo
└── frontend/          # Aplicación React + TypeScript (funcional)
    ├── src/
    ├── public/
    └── README.md     # Documentación detallada del frontend
```

---

## 🚀 Inicio rápido

### Frontend (actualmente funcional)
```bash
cd frontend
pnpm install
cp .env.example .env
# Configurar VITE_BASE_API_URL con tu MockAPI
pnpm dev
```

📖 **Documentación completa del frontend:** [frontend/README.md](./frontend/README.md)

---

## ✨ Funcionalidades principales

### Para usuarios (customers)
- ✅ Registro y autenticación segura
- ✅ Búsqueda y filtrado avanzado de productos
- ✅ Carrito de compras con persistencia
- ✅ Proceso de checkout completo
- ✅ Historial de órdenes
- ✅ Gestión de perfil y eliminación de cuenta

### Para administradores
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Gestión completa de productos (CRUD con filtros avanzados)
- ✅ Gestión de usuarios con control jerárquico por roles
- ✅ Administración de órdenes
- ✅ Acciones masivas (bulk actions)

### Sistema de roles jerárquico
- **Customer (nivel 1):** Compras y gestión de cuenta
- **Admin (nivel 2):** Gestión de productos, customers y órdenes
- **Super Admin (nivel 3):** Control total del sistema

---

## 🧰 Stack tecnológico

### Frontend
- React 19 + TypeScript + Vite
- Zustand (state management)
- SWR (data fetching y cache)
- React Hook Form + Zod (validación)
- Bootstrap 5 + React Bootstrap
- Motion (animaciones)
- Swiper, React Toastify, Lucide React

### Backend (próximamente)
- FastAPI (Python)
- PostgreSQL / SQLAlchemy
- JWT Authentication
- Pydantic

---

## 📝 Roadmap

- [x] Frontend completo con MockAPI
- [x] Sistema de roles y permisos
- [x] Panel administrativo funcional
- [x] Deploy en Vercel
- [ ] **Backend con FastAPI** ⬅️ En progreso
- [ ] Migración a base de datos propia
- [ ] Integración frontend-backend
- [ ] Sistema de pagos
- [ ] Notificaciones por email

---

## 📚 Documentación

- **[Frontend](./frontend/README.md)** - Documentación completa del cliente React

_(La documentación del backend se agregará cuando esté disponible)_

---

## 🔐 Configuración actual

El proyecto actualmente usa **MockAPI** como backend temporal. Para configurar:

1. Crear cuenta en [mockapi.io](https://mockapi.io)
2. Configurar endpoints para `products`, `users`, `orders`
3. Agregar `VITE_BASE_API_URL` en `.env`

Ver detalles completos en [frontend/README.md](./frontend/README.md)

---

## 🤝 Contribuciones

Este es un proyecto personal en desarrollo activo. Sugerencias y feedback son bienvenidos.
