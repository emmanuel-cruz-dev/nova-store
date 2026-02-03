# 🛍️ Nova Store - Frontend

> **Nota:** Este es el módulo frontend del proyecto. Para la documentación general del proyecto completo, ver [README principal](../README.md).

<div align="center">
  
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange)
![SWR](https://img.shields.io/badge/SWR-Data%20Fetching-black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)
</div>

## 👨‍💻 Autor

- **Emmanuel Cruz**</br>
- **Frontend Developer**

> Proyecto desarrollado de forma individual como parte de una formación avanzada en React y frontend moderno.

---

## 🚀 Demo en vivo

👉 **[Visitar la página](https://nova-store-shop.vercel.app/)**

---

## 📄 Descripción

**Nova Store** es una tienda e-commerce moderna y completa construida con **React** y **TypeScript**, que incluye autenticación (registro/login), carrito de compras, proceso de checkout, gestión de órdenes y un completo panel administrativo con estadísticas en tiempo real.

La aplicación consume una API generada con **MockAPI**, utilizada para la persistencia de productos, usuarios y órdenes, e implementa las mejores prácticas de desarrollo con validación de formularios, gestión de estado optimizada, arquitectura modular por features y una experiencia de usuario fluida.

---

## ✨ Funcionalidades principales

### 🔐 Autenticación y usuarios

- Registro y login de usuarios con validación robusta.
- **Sistema de roles jerárquico de tres niveles:** `customer`, `admin` y `super_admin`.
- Gestión de perfiles con actualización de datos personales.
- Cambio de contraseña seguro (sin almacenar contraseñas en localStorage).
- **Eliminación de cuenta permanente** para usuarios con roles `customer` y `admin`:
  - Proceso de confirmación en dos pasos (palabra clave + contraseña)
  - Validación de identidad antes de eliminar
  - Advertencias claras sobre la irreversibilidad
  - Cierre de sesión automático tras eliminación
  - **Nota:** Las cuentas `super_admin` no pueden ser eliminadas (medida de seguridad)
- Validación de formularios con **React Hook Form** y **Zod**.
- Gestión de sesión con **Zustand** (authStore) sin almacenar información sensible.
- **Sistema de rutas protegidas por rol:**
  - Rutas separadas para administradores (`/admin/*`) y clientes (`/account/*`)
  - Redirección automática según el rol del usuario
  - Control de acceso basado en jerarquía de roles

### 👥 Sistema de roles y permisos

La aplicación implementa un **sistema jerárquico de tres niveles** para controlar el acceso y las capacidades de los usuarios:

#### Jerarquía de roles

| Rol           | Nivel | Descripción                                             |
| ------------- | ----- | ------------------------------------------------------- |
| `customer`    | 1     | Usuario estándar con acceso a funcionalidades de compra |
| `admin`       | 2     | Administrador con capacidades de gestión limitadas      |
| `super_admin` | 3     | Administrador principal con control total del sistema   |

#### Matriz de permisos

| Capacidad                        | Customer | Admin | Super Admin |
| -------------------------------- | -------- | ----- | ----------- |
| **Compras y órdenes**            |
| Ver catálogo de productos        | ✅       | ❌    | ❌          |
| Agregar productos al carrito     | ✅       | ❌    | ❌          |
| Realizar compras                 | ✅       | ❌    | ❌          |
| Ver historial de órdenes propias | ✅       | ❌    | ❌          |
| **Gestión de perfil**            |
| Editar perfil propio             | ✅       | ✅    | ✅          |
| Cambiar contraseña propia        | ✅       | ✅    | ✅          |
| Eliminar cuenta propia           | ✅       | ✅    | ❌          |
| **Panel administrativo**         |
| Acceso al dashboard              | ❌       | ✅    | ✅          |
| Ver estadísticas del sistema     | ❌       | ✅    | ✅          |
| **Gestión de productos**         |
| Crear/editar/eliminar productos  | ❌       | ✅    | ✅          |
| Gestionar stock y precios        | ❌       | ✅    | ✅          |
| Activar/desactivar productos     | ❌       | ✅    | ✅          |
| **Gestión de usuarios**          |
| Ver usuarios `customer`          | ❌       | ✅    | ✅          |
| Editar usuarios `customer`       | ❌       | ✅    | ✅          |
| Eliminar usuarios `customer`     | ❌       | ✅    | ✅          |
| Ver usuarios `admin`             | ❌       | ❌    | ✅          |
| Editar usuarios `admin`          | ❌       | ❌    | ✅          |
| Eliminar usuarios `admin`        | ❌       | ❌    | ✅          |
| **Gestión de roles**             |
| Cambiar rol a `customer`         | ❌       | ❌    | ✅          |
| Cambiar rol a `admin`            | ❌       | ❌    | ✅          |
| Cambiar rol a `super_admin`      | ❌       | ❌    | ✅          |
| **Gestión de órdenes**           |
| Ver todas las órdenes            | ❌       | ✅    | ✅          |
| Actualizar estado de órdenes     | ❌       | ✅    | ✅          |

#### Reglas de gestión de usuarios

- **Principio de jerarquía:** Un usuario solo puede gestionar (ver, editar, eliminar, cambiar rol) a usuarios de nivel inferior.
- **Admin (`nivel 2`):**
  - Puede gestionar únicamente usuarios `customer` (`nivel 1`)
  - No puede ver ni modificar otros `admin` o `super_admin`
  - Puede asignar el rol `customer` pero no `admin` ni `super_admin`
- **Super Admin (`nivel 3`):**
  - Puede gestionar todos los usuarios (`customer` y `admin`)
  - Puede asignar cualquier rol (`customer`, `admin`, `super_admin`)
  - Tiene control total sobre el sistema
- **Acciones masivas:** Disponibles en el panel de usuarios para cambios de rol y eliminación en lote, respetando las restricciones de jerarquía.

#### Restricciones especiales

- Las cuentas `super_admin` **no pueden ser eliminadas** como medida de seguridad del sistema.
- Los usuarios no pueden cambiar su propio rol.
- Las contraseñas nunca se almacenan en `localStorage`, solo en la base de datos.

---

### 🛒 Carrito de compras

- Gestión completa de carrito: agregar productos, modificar cantidad, eliminar.
- Persistencia del estado del carrito con **Zustand**.
- Proceso de checkout con validación de datos de envío.
- Resumen de orden y confirmación de compra.

### 📦 Productos

- Búsqueda y filtrado avanzado por categorías.
- **Filtros avanzados en el panel de administración:**
  - Búsqueda por nombre o marca del producto
  - Filtrado por rango de precios (mínimo y máximo)
  - Filtrado por estado (activos/inactivos)
  - Filtrado por nivel de stock (crítico, bajo, OK, alto)
  - Botón para limpiar todos los filtros activos
- Paginación optimizada de productos.
- Vista detallada de producto individual con galería de imágenes.
- Sistema de ratings y valoraciones.
- Gestión de stock en tiempo real.

### 📊 Panel de administración (Dashboard)

**Acceso:** Disponible para usuarios con roles `admin` y `super_admin`.

- **Estadísticas en tiempo real:**
  - Ingresos totales y valor promedio de órdenes
  - Total de productos, productos activos y alertas de stock bajo
  - Total de órdenes y distribución por estados
  - Total de usuarios por rol (customers, admins, super_admins)
- **Visualizaciones:**
  - Gráficos de distribución de órdenes por estado
  - Tabla de productos más vendidos
  - Tarjetas de estadísticas con indicadores visuales
- **Gestión completa de productos:**
  - CRUD de productos con formularios validados
  - Sistema de filtrado avanzado (búsqueda, precio, estado, stock)
  - Indicadores visuales de stock y estado
  - **Disponible para:** `admin` y `super_admin` por igual
- **Gestión de usuarios con control basado en roles:**
  - Listado y administración de usuarios según jerarquía
  - **Admin:** Solo puede ver y gestionar usuarios `customer`
  - **Super Admin:** Puede ver y gestionar usuarios `customer` y `admin`
  - **Filtros avanzados:**
    - Búsqueda por nombre o email
    - Filtrado por rol (customer, admin, todos)
    - Filtrado por actividad (usuarios con/sin órdenes)
    - Filtrado por fecha de registro (última semana, mes, 3 meses, más antiguos)
    - Contador de resultados filtrados vs total
  - **Acciones masivas (bulk actions):**
    - Cambio de roles en lote (respetando jerarquía)
    - Eliminación múltiple de usuarios
    - Validación de permisos antes de cada acción
- **Gestión de órdenes:**
  - Visualización y actualización de estados
  - Detalles completos de cada orden
  - **Disponible para:** `admin` y `super_admin` por igual
- **Rutas protegidas exclusivas para administradores** (`/admin/*`)

### 📋 Gestión de órdenes

- Visualización de historial de órdenes del usuario.
- Estados de órdenes: Pendiente, En proceso, Completada, Cancelada.
- Detalles completos de cada orden (productos, cantidades, precios, datos de envío).
- Panel administrativo para gestionar todas las órdenes del sistema.

### 🎨 Interfaz de usuario

- Diseño responsivo con **Bootstrap** y **Bootswatch**.
- Carruseles interactivos con **Swiper**.
- Notificaciones elegantes con **React Toastify**.
- Indicadores de carga con **NProgress**.
- Iconografía moderna con **Lucide React**.
- Skeletons de carga para mejor UX.
- Animaciones fluidas y transiciones de página con **Motion**

---

## 🗂 Estructura del proyecto

El proyecto está organizado siguiendo una arquitectura modular por features para mejor escalabilidad y mantenibilidad:

```
src/
├── api/
│   ├── axiosConfig.ts              # Configuración de Axios con interceptores
│   └── services/                   # Servicios API organizados por dominio
│       ├── dashboard.service.ts    # Servicio de estadísticas
│       ├── order.service.ts        # Servicio de órdenes
│       ├── product.service.ts      # Servicio de productos
│       └── user.service.ts         # Servicio de usuarios
├── assets/                         # Recursos estáticos (imágenes, etc.)
├── components/                     # Componentes organizados por features
│   ├── auth/                       # Componentes de autenticación
│   ├── cart/                       # Componentes del carrito
│   ├── dashboard/                  # Componentes del panel de control
│   │   ├── Dashboard.tsx           # Panel principal con estadísticas
│   │   ├── DashboardSkeleton.tsx   # Loading state
│   │   ├── OrderStatusChart.tsx    # Gráfico de estados de órdenes
│   │   ├── StatCard.tsx            # Tarjetas de estadísticas
│   │   └── TopProductsTable.tsx    # Tabla de productos top
│   ├── home/                       # Componentes de la página principal
│   ├── modals/                     # Modales reutilizables
│   ├── product/                    # Componentes de productos
│   │   ├── ProductFilters.tsx      # Filtros avanzados (admin)
│   │   ├── PublicProductFilters.tsx # Filtros públicos
│   │   └── ProductsTable.tsx       # Tabla de gestión de productos
│   ├── shared/                     # Componentes compartidos
│   └── user/                       # Componentes de usuario y perfil
│       ├── AccountDeletionSection.tsx # Eliminación de cuenta
│       ├── UsersFilters.tsx        # Filtros de usuarios (admin)
│       └── UsersTable.tsx          # Tabla de gestión de usuarios
├── constants/                      # Constantes de la aplicación
│   ├── features.ts                 # Features destacadas del e-commerce
│   └── status.ts                   # Estados de órdenes
├── data/                           # Datos estáticos y configuraciones
├── hooks/                          # Custom hooks organizados por dominio
│   ├── auth/                       # Hooks de autenticación
│   ├── cart/                       # Hooks del carrito
│   ├── dashboard/                  # Hooks del dashboard
│   ├── orders/                     # Hooks de órdenes
│   ├── products/                   # Hooks de productos
│   ├── shared/                     # Hooks compartidos (pagination, navigation)
│   └── user/                       # Hooks de usuario
├── icons/                          # Iconos personalizados
├── layouts/                        # Layouts principales
│   ├── NavigationBar.tsx
│   ├── Footer.tsx
│   └── UserMenu.tsx
├── pages/                          # Páginas principales
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── Product.tsx
│   ├── Cart.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Account.tsx                 # Panel de cuenta (customers)
│   ├── Admin.tsx                   # Panel administrativo (admins)
│   └── NotFound.tsx
├── routes/                         # Configuración de rutas
│   ├── AppRouter.tsx
│   ├── AdminRoute.tsx              # Protección de rutas admin
│   ├── PrivateRoute.tsx            # Protección de rutas privadas
│   ├── PublicRoute.tsx             # Rutas solo para no autenticados
│   ├── PublicOrCustomerRoute.tsx   # Rutas públicas/customer
│   └── config.tsx                  # Configuración de rutas por rol
├── schemas/                        # Esquemas de validación con Zod
├── stores/                         # State management con Zustand
│   ├── authStore.ts                # Store de autenticación
│   └── cartStore.ts                # Store del carrito
├── types/                          # Definiciones de tipos TypeScript
│   ├── dashboard.types.ts          # Tipos del dashboard
│   └── index.ts                    # Exportaciones centralizadas
└── utils/                          # Utilidades generales
```

---

## 🧰 Tecnologías utilizadas

### Core

- **React 19** (Vite)
- **React Router DOM** - Enrutamiento y navegación
- **TypeScript** - Tipado estático (configuración disponible)

### Gestión de estado

- **Zustand** - State management principal (auth y cart)
- **SWR** - Data fetching, cache y sincronización

### Formularios y validación

- **React Hook Form** - Gestión eficiente de formularios
- **Zod** - Validación de esquemas type-safe
- **@hookform/resolvers** - Integración entre React Hook Form y Zod

### UI/UX

- **Bootstrap 5** + **React Bootstrap** - Framework CSS y componentes
- **Motion** - Biblioteca de animaciones para React
- **Bootswatch** - Temas de Bootstrap
- **Swiper** - Carruseles y sliders táctiles
- **Lucide React** - Iconos modernos y consistentes
- **React Toastify** - Sistema de notificaciones
- **NProgress** - Barra de progreso para navegación

### HTTP y API

- **Axios** - Cliente HTTP con interceptores

---

## 🔧 Requisitos

- **Node.js** ≥ 16
- **pnpm** ≥ 8 (recomendado) o **npm**

---

## ⚙️ Variables de entorno

Crear un archivo `.env` (o `.env.local`) en la raíz del proyecto:

```bash
VITE_BASE_API_URL=https://<tu-id>.mockapi.io/api/v1
```

> **Nota:** `src/api/axiosConfig.js` utiliza `import.meta.env.VITE_BASE_API_URL` para la configuración de la API.

---

## 📥 Instalación y ejecución

### Windows (PowerShell) / macOS / Linux

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd nova-store

# 2. Instalar dependencias
pnpm install
# o si prefieres npm: npm install

# 3. Configurar variables de entorno
# Crear archivo .env y agregar VITE_BASE_API_URL

# 4. Ejecutar en modo desarrollo
pnpm dev
# o: npm run dev

# 5. Construir para producción
pnpm build
# o: npm run build

# 6. Previsualizar la build de producción localmente
pnpm preview
# o: npm run preview
```

---

## 🔎 Notas sobre la API

- El proyecto está diseñado para trabajar con **MockAPI** (https://mockapi.io).
- Endpoints esperados:
  - `/products` — Campos: id, title, price, category, isActive, images, etc.
  - `/users` — Campos: id, email, name, password, role (`customer` | `admin` | `super_admin`).
  - `/orders` — Campos: id, userId, products, status, total, etc.
- **Sistema de roles:**
  - Para acceso básico al panel administrativo: crear usuario con `role: "admin"`
  - Para control total del sistema: crear usuario con `role: "super_admin"`
  - Usuarios registrados desde la app tienen automáticamente `role: "customer"`

### Estructura de datos recomendada

**Productos:**

```json
{
  "id": "1",
  "name": "Producto ejemplo",
  "price": 99.99,
  "stock": 10,
  "rating": 5,
  "category": "electronics",
  "brand": "Marca ejemplo",
  "isActive": true,
  "image": "url",
  "description": "Descripción del producto"
}
```

**Usuarios:**

```json
{
  "id": "1",
  "email": "user@example.com",
  "firstName": "Nombre",
  "lastName": "Apellido",
  "password": "password1234",
  "avatar": "url",
  "createdAt": "2026-01-29T10:00:00.000Z",
  "role": "customer"
}
```

**Roles disponibles:** `"customer"` | `"admin"` | `"super_admin"`

**Jerarquía de roles:**

- `customer` (nivel 1): Usuario estándar
- `admin` (nivel 2): Administrador con permisos limitados
- `super_admin` (nivel 3): Administrador con control total

---

## 🧪 Credenciales y pruebas

- No hay usuarios preconfigurados en el repositorio.
- Se puede crear usuarios mediante:
  1. El formulario de registro de la aplicación (crea usuarios con `role: "customer"`).
  2. Directamente desde MockAPI (permite asignar cualquier rol).
- **Para obtener permisos administrativos:**
  - **Admin:** Modificar el campo `role` a `"admin"` en MockAPI
  - **Super Admin:** Modificar el campo `role` a `"super_admin"` en MockAPI
- **Recomendación:** Crear al menos un usuario `super_admin` para tener control total del sistema.

---

## 🛠️ Desarrollo y mejores prácticas

### Arquitectura

- **Separación de responsabilidades:** Servicios HTTP abstraídos en `src/api/services/`.
- **Componentes reutilizables:** Organización modular por dominio.
- **Custom hooks:** Lógica compartida encapsulada en hooks reutilizables.

### Gestión de formularios

- Todos los formularios utilizan **React Hook Form** para mejor rendimiento.
- Validación robusta con esquemas **Zod** definidos en `src/schemas/`.
- Mensajes de error consistentes y accesibles.

### Estado global

- **Zustand stores:**
  - `authStore.ts` - Maneja autenticación, usuario actual y token
  - `cartStore.ts` - Gestión optimizada del estado del carrito
- **SWR:** Cache inteligente y revalidación automática de datos

### Hooks personalizados

- `useAuth` - Autenticación y gestión de sesión
- `useCart` - Operaciones del carrito de compras
- `useProducts` - Fetching y filtrado de productos
- `usePagination` - Lógica de paginación reutilizable

---

## 📦 Scripts disponibles

```bash
pnpm dev          # Inicia el servidor de desarrollo
pnpm build        # Crea la build optimizada para producción
pnpm preview      # Sirve la build de producción localmente
pnpm lint         # Ejecuta el linter de código

# También puedes usar npm:
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 🎯 Arquitectura de rutas

El proyecto implementa un sistema de rutas protegidas basado en roles:

### Rutas públicas y de clientes

- `/` - Página principal
- `/products` - Catálogo de productos
- `/product/:id` - Detalle de producto
- `/cart` - Carrito de compras (requiere autenticación)
- `/account/:section?` - Panel de cuenta del cliente (requiere autenticación)
  - `/account/profile` - Perfil y datos personales
  - `/account/orders` - Historial de órdenes
  - `/account/favorites` - Productos favoritos

### Rutas administrativas

- `/admin/:section?` - Panel administrativo (requiere rol `admin` o `super_admin`)
  - `/admin/dashboard` - Estadísticas y métricas del sistema
  - `/admin/products` - Gestión completa de productos (CRUD, filtros, stock)
  - `/admin/users` - Gestión de usuarios con restricciones por jerarquía:
    - **Admin:** Solo puede gestionar usuarios `customer`
    - **Super Admin:** Puede gestionar usuarios `customer` y `admin`
  - `/admin/orders` - Gestión y actualización de estados de órdenes
  - `/admin/profile` - Perfil del administrador

### Rutas de autenticación

- `/login` - Inicio de sesión
- `/register` - Registro de usuarios

### Sistema de protección

- **PublicRoute:** Solo accesible sin autenticación (login, register)
- **PublicOrCustomerRoute:** Accesible para no autenticados y customers (redirige admins a `/admin`)
- **PrivateRoute:** Requiere autenticación (rutas de customer como `/account/*`)
- **AdminRoute:** Requiere autenticación y rol administrativo (acepta `admin` o `super_admin`)
  - Implementa la función `hasAdminAccess()` que valida ambos roles
  - Protege todas las rutas bajo `/admin/*`
  - Redirige a `/account` si el usuario es `customer`
  - Redirige a `/login` si no hay autenticación

---

## 📝 Licencia

Este proyecto fue desarrollado como entrega final para el curso React + Bootstrap de Talento Tech 2025.
