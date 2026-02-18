const { Router } = require("express");
const { getProducts, getProductById } = require("../controllers/products.controller");

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Listar productos con filtros opcionales
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Plantas, Terrarios]
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, name_asc, name_desc, newest]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Productos obtenidos
 *         content:
 *           application/json:
 *             examples:
 *               listado:
 *                 value:
 *                   ok: true
 *                   message: "Productos obtenidos correctamente"
 *                   data:
 *                     items: []
 *                     pagination:
 *                       page: 1
 *                       limit: 12
 *                       total: 15
 *                       totalPages: 2
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto obtenido
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", getProductById);

module.exports = router;
