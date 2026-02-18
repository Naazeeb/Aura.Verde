# Aura Verde Backend

Backend API para Aura Verde (Plantas y Terrarios) con Node.js, Express y MongoDB Atlas.

## Stack
- Express + CORS + Helmet + Morgan
- MongoDB Atlas + Mongoose
- Auth con bcryptjs + JWT
- Validaciones con Zod
- Swagger (`/docs`)
- Seed de catalogo

## Estructura
- `src/app.js`
- `src/server.js`
- `src/config/db.js`
- `src/models/*`
- `src/controllers/*`
- `src/routes/*`
- `src/middlewares/*`
- `src/validators/*`
- `src/docs/swagger.js`
- `src/seed/seed.js`
- `public/images/*`

## Configurar .env (backend)
Crear `aura-verde-backend/.env`:

```env
PORT=4000
MONGO_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@TU_CLUSTER.mongodb.net/aura_verde?retryWrites=true&w=majority
JWT_SECRET=CAMBIAR_POR_UNA_CLAVE_SEGURA
CORS_ORIGINS=http://localhost:5173,https://TU_FRONT_VERCEL.vercel.app
```

Variables minimas usadas:
- `PORT`: puerto HTTP
- `MONGO_URI`: conexion MongoDB Atlas
- `JWT_SECRET`: firma de JWT
- `CORS_ORIGINS`: origenes permitidos separados por coma

## Imagenes locales
Las imagenes del catalogo se sirven desde:
- `aura-verde-backend/public/images/plantas/*`
- `aura-verde-backend/public/images/terrarios/*`

Se exponen por Express en:
- `GET /images/...`

Ejemplo:
- `http://localhost:4000/images/plantas/sansevieria.webp`

## Seguridad de imagenes cross-origin
Helmet esta configurado para permitir que el front cargue imagenes del backend:
- `crossOriginResourcePolicy: { policy: "cross-origin" }`

## Scripts
```bash
npm install
npm run dev
npm run start
npm run seed
```

## Seed
Carga catalogo de Plantas/Terrarios y reemplaza datos actuales:
1. `await Product.deleteMany({})`
2. `await Product.insertMany(products)`

Comando:
```bash
npm run seed
```

## Endpoints
### Health
- `GET /health`

### Auth
- `POST /auth/register` (name opcional, email, password)
- `POST /auth/login` (email, password)
- `GET /auth/me` (Bearer token)

### Products
- `GET /products`
  - query: `page`, `limit`, `q`, `category=Plantas|Terrarios`, `sort=newest|price_asc|price_desc|name_asc|name_desc`
  - response: `{ ok, message, data: { items, pagination } }`
- `GET /products/:id`

### Orders
- `POST /orders` (Bearer token)
  - valida stock disponible
  - crea orden real desde carrito
  - descuenta stock
- `GET /orders/me` (Bearer token)
- `GET /orders/:id` (Bearer token, solo dueño)

Modelo de orden:
- `userId`
- `items: [{ productId, name, price, qty, image, subtotal }]`
- `totals: { subtotal, total }`
- `status: pending | paid | cancelled`
- `createdAt`, `updatedAt`

## Swagger
- URL local: `http://localhost:4000/docs`
- Incluye Auth con boton `Authorize` (Bearer token), Products y Orders.

## Fullstack local
1. Backend
   - `cd aura-verde-backend`
   - `npm install`
   - configurar `.env`
   - `npm run seed`
   - `npm run dev`
2. Front
   - `cd aura-verde`
   - `.env` con `VITE_API_URL=http://localhost:4000`
   - `npm install`
   - `npm run dev`

## Deploy (entregable)
### Backend (Render / Railway / Fly)
Configurar env vars:
- `MONGO_URI`
- `JWT_SECRET`
- `CORS_ORIGINS` (incluir localhost y Vercel)
- `PORT`

### Front (Vercel)
- `VITE_API_URL=https://TU_BACKEND_DEPLOY_URL`

## Links de entrega (completar)
- Front GitHub: `https://github.com/TU_USUARIO/TU_REPO_FRONT`
- Front Deploy (Vercel): `https://TU_FRONT.vercel.app`
- Back GitHub: `https://github.com/TU_USUARIO/TU_REPO_BACK`
- Back Deploy: `https://TU_BACKEND_DEPLOY_URL`
- Swagger Deploy: `https://TU_BACKEND_DEPLOY_URL/docs`
