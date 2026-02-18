const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      ok: false,
      message: "Datos inválidos",
      errors: result.error.flatten(),
    });
  }

  req.body = result.data;
  return next();
};

module.exports = validate;
