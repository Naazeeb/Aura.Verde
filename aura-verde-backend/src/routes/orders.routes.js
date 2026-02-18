const { Router } = require("express");
const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/orders.controller");
const { auth } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { createOrderSchema } = require("../validators/order.validator");

const router = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Crear una orden desde el carrito del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *           examples:
 *             checkout:
 *               value:
 *                 items:
 *                   - productId: "67b4f6ce7f5ec8f89bd44a11"
 *                     qty: 2
 *     responses:
 *       201:
 *         description: Orden creada
 *       400:
 *         description: Error de stock o validación
 *       401:
 *         description: No autenticado
 */
router.post("/", auth, validate(createOrderSchema), createOrder);

/**
 * @swagger
 * /orders/me:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener órdenes del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Órdenes obtenidas
 *       401:
 *         description: No autenticado
 */
router.get("/me", auth, getMyOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener una orden por ID (solo del usuario dueño)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden obtenida
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Orden no encontrada
 */
router.get("/:id", auth, getOrderById);

module.exports = router;
