# 🛍️ Nova Store - E-Commerce  
**Entrega Final - Curso React + Bootstrap – Talento Tech 2025**

👨‍💻 **Autor:** Emmanuel Cruz  
🎓 **Comisión:** 25235  

---

## 🚀 Demo en vivo  
👉 **[Visitar la página](https://nova-store-shop.vercel.app/)**

---

## 📄 Descripción  
**Nova Store** es una tienda e-commerce construida con **React**, que incluye autenticación (registro/login), carrito de compras, proceso de checkout y panel administrativo.  

La aplicación consume una API generada con **MockAPI**, utilizada para la persistencia de productos y usuarios.

---

## ✨ Funcionalidades principales  
- Registro y login de usuarios (Customer).  
- Gestión completa de carrito: agregar productos, modificar cantidad, eliminar.  
- Proceso de checkout y resumen de orden.  
- Búsqueda, filtrado por categorías y paginación de productos.  
- Panel de administración:  
  - CRUD completo de productos.  
  - Listado, visualización y eliminación de usuarios.  
- Rutas públicas y privadas según rol.  
- Componentes reutilizables, custom hooks y context para Auth y Cart.

---

## 🗂 Estructura relevante del proyecto  
- `src/api/axiosConfig.js` — Configuración de Axios (usa `VITE_BASE_API_URL`).  
- `src/api/services/` — Servicios API (`product.service.js`, `user.service.js`, etc.).  
- `src/context/` — `AuthContext.jsx`, `CartContext.jsx`.  
- `src/components/` — Componentes organizados por dominio (`product/`, `cart/`, `forms/`, `ui/`, `common/`).  
- `src/hooks/` — Hooks personalizados (auth, cart, paginación, productos, etc.).  
- `src/pages/` — Páginas principales (Home, Products, Product, Cart, Profile, Login, Register).  
- `src/layouts/` — `NavigationBar.jsx`, `Footer.jsx`.  
- `src/routes/` — Enrutamiento y protección de rutas.

---

## 🧰 Tecnologías utilizadas  
- React (Vite)  
- React Router  
- Context API + Custom Hooks  
- Axios  
- Bootstrap + estilos propios  
- Swiper  
- NProgress  
- Lucide-React (íconos)

---

## 🔧 Requisitos  
- Node.js ≥ 16  
- npm o yarn  

---

## ⚙️ Variables de entorno  
Crear un archivo `.env` (o `.env.local`) en la raíz con:

```bash
VITE_BASE_API_URL=https://<tu-id>.mockapi.io/api/v1
```

> Nota: `src/api/axiosConfig.js` utiliza `import.meta.env.VITE_BASE_API_URL`.

---

## 📥 Instalación y ejecución  

### PowerShell (Windows)  
```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Construir para producción
npm run build

# 4. Ejecutar la build de producción localmente
npm run preview
```

---

## 🔎 Notas sobre la API  
- El proyecto está pensado para trabajar con **MockAPI** (https://mockapi.io).  
- Endpoints esperados:  
  - `/products` — id, title, price, category, isActive, images, etc.  
  - `/users` — id, email, name, role (`customer` | `admin`).  
- Para usar el panel administrativo, crear un usuario con `role: "admin"`.

---

## 🧪 Credenciales y pruebas  
- No hay usuarios preconfigurados en el repo.  
- Se recomienda crear usuarios desde MockAPI o mediante el formulario de registro y luego modificar el rol si es necesario.

---

## 🛠️ Desarrollo y mejores prácticas  
- Los servicios HTTP están en `src/api/services/` para abstraer lógica de red.  
- `AuthContext` maneja usuario y token.  
- `CartContext` gestiona el estado del carrito.  
- Hooks reutilizables en `src/hooks/` como `useProducts`, `useCart`, `useAuth`.

---

## 📦 Scripts útiles (package.json)  
```bash
npm run dev       # Inicia modo desarrollo
npm run build     # Crea la build de producción
npm run preview   # Sirve la build localmente
```
