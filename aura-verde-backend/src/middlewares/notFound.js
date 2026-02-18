const notFound = (req, res) => {
  return res.status(404).json({
    ok: false,
    message: `Ruta no encontrada: ${req.originalUrl}`,
    errors: null,
  });
};

module.exports = notFound;
