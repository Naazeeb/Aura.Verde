const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        ok: false,
        message: "Token no provisto",
        errors: null,
      });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autorizado",
        errors: null,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado",
      errors: null,
    });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      ok: false,
      message: "No autorizado: se requiere rol admin",
      errors: null,
    });
  }
  next();
};

module.exports = { auth, isAdmin };
