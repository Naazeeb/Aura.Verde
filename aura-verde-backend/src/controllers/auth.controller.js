const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const computedName = name?.trim() || email.split("@")[0] || "Usuario";

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        ok: false,
        message: "El email ya está registrado",
        errors: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: computedName,
      email,
      password: hashedPassword,
    });

    const token = signToken(user._id);

    return res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
        errors: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
        errors: null,
      });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      ok: true,
      message: "Login exitoso",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

const me = async (req, res, next) => {
  try {
    return res.status(200).json({
      ok: true,
      message: "Usuario autenticado",
      data: req.user,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, me };
