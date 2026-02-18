const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aura Verde API",
      version: "1.0.0",
      description: "Documentación API backend para Aura Verde (Plantas y Terrarios).",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor local",
      },
      {
        url: "https://TU_BACKEND_DEPLOY_URL",
        description: "Servidor producción (reemplazar)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            name: { type: "string", example: "Nico" },
            email: { type: "string", example: "nico@mail.com" },
            password: { type: "string", example: "123456" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "nico@mail.com" },
            password: { type: "string", example: "123456" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            message: { type: "string", example: "Login exitoso" },
            data: {
              type: "object",
              properties: {
                token: { type: "string" },
                user: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    email: { type: "string" },
                    role: { type: "string", example: "user" },
                  },
                },
              },
            },
          },
        },
        CreateOrderInput: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                required: ["productId", "qty"],
                properties: {
                  productId: { type: "string", example: "67b4f6ce7f5ec8f89bd44a11" },
                  qty: { type: "integer", example: 2 },
                },
              },
            },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            productId: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            qty: { type: "integer" },
            image: { type: "string" },
            subtotal: { type: "number" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            totals: {
              type: "object",
              properties: {
                subtotal: { type: "number" },
                total: { type: "number" },
              },
            },
            status: { type: "string", enum: ["pending", "paid", "cancelled"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    tags: [
      { name: "Health", description: "Healthcheck" },
      { name: "Auth", description: "Autenticación" },
      { name: "Products", description: "Catálogo de productos" },
      { name: "Orders", description: "Órdenes de compra" },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
