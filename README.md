# 🛍️ Nova Store - E-Commerce
**Entrega Final - Curso React + Bootstrap – Talento Tech 2025**

👨‍💻 **Autor:** Emmanuel Cruz
🎓 **Comisión:** 25235

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
- Gestión de perfiles con actualización de datos personales.
- Cambio de contraseña seguro.
- Validación de formularios con **React Hook Form** y **Zod**.
- Gestión de sesión con **Zustand** (authStore).

### 🛒 Carrito de compras
- Gestión completa de carrito: agregar productos, modificar cantidad, eliminar.
- Persistencia del estado del carrito con **Zustand**.
- Proceso de checkout con validación de datos de envío.
- Resumen de orden y confirmación de compra.

### 📦 Productos
- Búsqueda y filtrado avanzado por categorías.
- Paginación optimizada de productos.
- Vista detallada de producto individual con galería de imágenes.
- Sistema de ratings y valoraciones.
- Gestión de stock en tiempo real.

### 📊 Panel de administración (Dashboard)
- **Estadísticas en tiempo real:**
  - Ingresos totales y valor promedio de órdenes
  - Total de productos, productos activos y alertas de stock bajo
  - Total de órdenes y distribución por estados
  - Total de usuarios (clientes y administradores)
- **Visualizaciones:**
  - Gráficos de distribución de órdenes por estado
  - Tabla de productos más vendidos
  - Tarjetas de estadísticas con indicadores visuales
- **Gestión completa:**
  - CRUD de productos con formularios validados
  - Gestión de órdenes (visualización, actualización de estados)
  - Listado y administración de usuarios
  - Rutas protegidas según rol de usuario

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
│   ├── shared/                     # Componentes compartidos
│   └── user/                       # Componentes de usuario y perfil
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
│   ├── Profile.tsx                 # Incluye dashboard y gestión de perfil
│   └── NotFound.tsx
├── routes/                         # Configuración de rutas
│   ├── AppRouter.tsx
│   ├── PrivateRoute.tsx
│   ├── PublicRoute.tsx
│   └── config.tsx
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
  - `/users` — Campos: id, email, name, password, role (`customer` | `admin`).
- Para acceder al panel administrativo, es necesario crear un usuario con `role: "admin"` en MockAPI.

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
  "createdAt": "fecha",
  "role": "customer"
}
```

---

## 🧪 Credenciales y pruebas

- No hay usuarios preconfigurados en el repositorio.
- Se puede crear usuarios mediante:
  1. El formulario de registro de la aplicación.
  2. Directamente desde MockAPI.
- Para obtener permisos de administrador, modificar el campo `role` a `"admin"` en MockAPI.

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

## 🚀 Próximas mejoras

- [ ] Implementar búsqueda avanzada con filtros múltiples
- [ ] Panel de analytics para administradores

---

## 📝 Licencia

Este proyecto fue desarrollado como entrega final para el curso React + Bootstrap de Talento Tech 2025.
