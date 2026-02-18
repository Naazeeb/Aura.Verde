const { Router } = require("express");
const { register, login, me } = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const { auth } = require("../middlewares/auth");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar usuario
 *     description: El nombre es opcional.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *           examples:
 *             registro:
 *               value:
 *                 name: "Nico"
 *                 email: "nico@mail.com"
 *                 password: "123456"
 *     responses:
 *       201:
 *         description: Usuario creado y token emitido
 *       409:
 *         description: Email ya registrado
 */
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *           examples:
 *             login:
 *               value:
 *                 email: "nico@mail.com"
 *                 password: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso con token
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Obtener usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: Token inválido o ausente
 */
router.get("/me", auth, me);

module.exports = router;
