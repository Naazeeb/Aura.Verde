# Aura Verde Frontend

Frontend React + Vite para Aura Verde (consume backend Node/Express).

## Setup local
```bash
npm install
npm run dev
```

## Variables de entorno
Crear `aura-verde/.env`:

```env
VITE_API_URL=http://localhost:4000
```

Cada cambio en `.env` requiere reiniciar Vite.

## Integracion API
- Productos: `GET /products`
- Auth: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- Orders: `POST /orders`, `GET /orders/me`
- Imagenes: `product.image` (rutas `/images/...` servidas por backend)

## Proxy dev (imagenes)
`vite.config.js` incluye proxy:
- `/images` -> `http://localhost:4000`

## Build
```bash
npm run build
npm run preview
```

## Deploy
- Vercel env var: `VITE_API_URL=https://TU_BACKEND_DEPLOY_URL`

## Links de entrega (completar)
- Front GitHub: `https://github.com/TU_USUARIO/TU_REPO_FRONT`
- Front Deploy: `https://TU_FRONT.vercel.app`
- Back Deploy: `https://TU_BACKEND_DEPLOY_URL`
- Swagger: `https://TU_BACKEND_DEPLOY_URL/docs`

# Aura.Verde
