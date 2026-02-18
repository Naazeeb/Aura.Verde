const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({
      ok: false,
      message: "ID inválido",
      errors: null,
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      ok: false,
      message: "Conflicto: recurso duplicado",
      errors: err.keyValue || null,
    });
  }

  return res.status(err.statusCode || 500).json({
    ok: false,
    message: err.message || "Error interno del servidor",
    errors: err.errors || null,
  });
};

module.exports = errorHandler;
