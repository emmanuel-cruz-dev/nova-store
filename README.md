# 🛍️ Nova Store - E-Commerce  
**Entrega Final - Curso React + Bootstrap – Talento Tech 2025**

👨‍💻 **Autor:** Emmanuel Cruz  
🎓 **Comisión:** 25235  

---

## 🚀 Demo en vivo  
👉 **[Visitar la página](https://nova-store-shop.vercel.app/)**

---

## 📄 Descripción  
**Nova Store** es una tienda e-commerce moderna construida con **React**, que incluye autenticación (registro/login), carrito de compras, proceso de checkout y panel administrativo.  

La aplicación consume una API generada con **MockAPI**, utilizada para la persistencia de productos y usuarios, e implementa las mejores prácticas de desarrollo con validación de formularios, gestión de estado optimizada y una experiencia de usuario fluida.

---

## ✨ Funcionalidades principales  

### 🔐 Autenticación y usuarios
- Registro y login de usuarios (Customer).  
- Validación de formularios con **React Hook Form** y **Zod**.
- Gestión de sesión con **Zustand** (authStore).

### 🛒 Carrito de compras
- Gestión completa de carrito: agregar productos, modificar cantidad, eliminar.  
- Persistencia del estado del carrito con **Zustand**.
- Proceso de checkout y resumen de orden.  

### 📦 Productos
- Búsqueda y filtrado por categorías.
- Paginación de productos.
- Detalle de producto individual.

### 👨‍💼 Panel de administración
- CRUD completo de productos con formularios validados.
- Listado, visualización y eliminación de usuarios.  
- Rutas protegidas según rol de usuario.

### 🎨 Interfaz de usuario
- Diseño responsivo con **Bootstrap** y **Bootswatch**.
- Carruseles interactivos con **Swiper**.
- Notificaciones elegantes con **React Toastify**.
- Indicadores de carga con **NProgress**.
- Iconografía moderna con **Lucide React**.

---

## 🗂 Estructura relevante del proyecto  

```
src/
├── api/
│   ├── axiosConfig.ts          # Configuración de Axios
│   └── services/               # Servicios API (products, users)
├── assets/                     # Recursos estáticos
├── components/
│   ├── cart/                   # Componentes del carrito
│   ├── common/                 # Componentes comunes
│   ├── forms/                  # Formularios reutilizables
│   ├── modals/                 # Modales
│   ├── product/                # Componentes de productos
│   └── ui/                     # Componentes de UI
├── data/                       # Datos estáticos
├── helpers/                    # Funciones auxiliares
├── hooks/                      # Custom hooks
├── icons/                      # Iconos personalizados
├── layouts/
│   ├── NavigationBar.jsx
│   └── Footer.jsx
├── pages/                      # Páginas principales
├── routes/                     # Configuración de rutas
├── schemas/                    # Esquemas de validación con Zod
├── stores/
│   ├── authStore.ts            # Store de autenticación (Zustand)
│   └── cartStore.ts            # Store del carrito (Zustand)
├── types/                      # Definiciones de tipos TypeScript
└── utils/                      # Utilidades generales
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
