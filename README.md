# 🛍️ Nova Store - E-Commerce

**Entrega Final - Curso React + Bootstrap TALENTO TECH - 2025**

👨‍💻 **Autor:** Emmanuel Cruz
🎓 **Comisión:** 25235

---

## 🚀 Demo en vivo

👉 [**Visita la página aquí**](https://nova-store-shop.vercel.app/)

---

## 📄 Descripción

Nova Store es una tienda e-commerce construida con React que incluye autenticación (registro/login), carrito de compras, proceso de checkout y panel administrativo. La app consume una API desarrollada en MockAPI para persistencia de productos y usuarios.

---

## ✨ Funcionalidades principales

- Registro y login de usuarios (Customer).
- Gestión de carrito: agregar, editar cantidad y remover productos.
- Proceso de checkout y resumen de orden.
- Búsqueda, filtrado por categorías y paginación de productos.
- Usuario Admin:
  - CRUD completo de productos (crear, listar, editar, eliminar).
  - Listar, ver y eliminar usuarios.
- Rutas públicas y privadas (protección de rutas según rol).
- Componentes reutilizables, custom hooks y context para Auth y Cart.

---

## 🗂 Estructura relevante del proyecto

- `src/api/axiosConfig.js` — Configuración Axios y baseURL (usa `VITE_BASE_API_URL`).
- `src/api/services/` — Servicios de API: `product.service.js`, `user.service.js`, etc.
- `src/context/` — `AuthContext.jsx`, `CartContext.jsx`.
- `src/components/` — Componentes por dominio: `product/`, `cart/`, `forms/`, `ui/`, `common/`.
- `src/hooks/` — Hooks personalizados (autenticación, carrito, paginación, productos, etc.).
- `src/pages/` — Páginas principales: `Home`, `Products`, `Product`, `Cart`, `Profile`, `Login`, `Register`.
- `src/layouts/` — `NavigationBar.jsx`, `Footer.jsx`.
- `src/routes/` — Enrutamiento y rutas privadas/públicas.

---

## 🧰 Tecnologías

- React (Vite)
- React Router
- Context API + Custom Hooks
- Axios
- Bootstrap (y utilidades CSS propias)
- Swiper (carruseles)
- NProgress (barra de carga)
- Lucide-React (íconos)

---

## 🔧 Requisitos

- Node.js >= 16
- npm (o yarn)

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz (o `.env.local`) con las siguientes variables:

- `VITE_BASE_API_URL` — URL base de la API (ej: https://<tu-id>.mockapi.io/api/v1)

Nota: `src/api/axiosConfig.js` usa `import.meta.env.VITE_BASE_API_URL`.

---

## 📥 Instalación y ejecución

PowerShell (Windows):

1. Instalar dependencias:

npm install

2. Ejecutar en modo desarrollo:

npm run dev

3. Construir para producción:

npm run build

4. Ejecutar servidor de producción local (si está configurado):

npm run preview

---

## 🔎 Notas sobre la API

- El proyecto está pensado para trabajar con MockAPI (`https://mockapi.io`).
- Recursos esperados en la API:
  - `/products` — Productos con campos como `id`, `title`, `price`, `category`, `isActive`, `images`, etc.
  - `/users` — Usuarios con campos como `id`, `email`, `name`, `role` (ej: `customer` | `admin`).
- Si usas MockAPI, crea manualmente algunos registros y al menos un usuario con `role: "admin"` para probar el panel administrativo.

---

## 🧪 Credenciales y pruebas

- No hay credenciales preconfiguradas en el repositorio. Crear usuarios en MockAPI con `role` adecuado o usar los endpoints de registro que provee la app.
- Para pruebas de administración, crea un usuario con `role: "admin"` desde MockAPI o mediante el endpoint de registro y luego actualiza su rol.

---

## 🛠️ Desarrollo y mejores prácticas

- Los servicios HTTP están en `src/api/services/` para abstraer llamadas a la API (`product.service.js`, `user.service.js`).
- Contexts: `AuthContext` maneja el estado del usuario y token; `CartContext` maneja el estado del carrito.
- Hooks reutilizables en `src/hooks/` para aislar lógica (p. ej. `useProducts`, `useCart`, `useAuth`).

---

## 📦 Scripts útiles (en `package.json`)

- `npm run dev` — Inicia la app en modo desarrollo con Vite.
- `npm run build` — Genera la build de producción.
- `npm run preview` — Sirve la build de producción localmente.

---

## 📝 Contribuciones

Pull requests bienvenidos. Abrir issues para bugs o mejoras.

---

## 🏷 Licencia

Este proyecto no incluye una licencia específica en el repositorio. Añadir un `LICENSE` si se desea compartir públicamente.

---

Si deseas, puedo agregar instrucciones adicionales específicas (p. ej. ejemplos de payload para MockAPI, flujos de pruebas o secciones de despliegue detalladas).
