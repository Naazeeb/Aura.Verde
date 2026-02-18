const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Estado del servidor
 *     responses:
 *       200:
 *         description: Servidor funcionando
 */
router.get("/", (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "ok",
  });
});

module.exports = router;
