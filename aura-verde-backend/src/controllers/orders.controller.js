const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    const normalizedRequestItems = items.map((item) => ({
      productId: item.productId,
      qty: item.qty ?? item.quantity,
    }));

    const productIds = normalizedRequestItems.map((item) => item.productId);

    const invalidId = productIds.find((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidId) {
      return res.status(400).json({
        ok: false,
        message: "Uno o más productId son inválidos",
        errors: { invalidId },
      });
    }

    const products = await Product.find({ _id: { $in: productIds }, isActive: true });
    const productsById = new Map(products.map((product) => [String(product._id), product]));

    const missingProducts = productIds.filter((id) => !productsById.has(String(id)));
    if (missingProducts.length > 0) {
      return res.status(404).json({
        ok: false,
        message: "Hay productos que no existen o están inactivos",
        errors: { missingProducts },
      });
    }

    const stockErrors = [];
    const orderItems = normalizedRequestItems.map((item) => {
      const product = productsById.get(String(item.productId));
      if (product.stock < item.qty) {
        stockErrors.push({
          productId: String(product._id),
          name: product.name,
          availableStock: product.stock,
          requestedQty: item.qty,
        });
      }
      const subtotal = Number((product.price * item.qty).toFixed(2));
      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: item.qty,
        image: product.image || "",
        subtotal,
      };
    });

    if (stockErrors.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Stock insuficiente para uno o más productos",
        errors: stockErrors,
      });
    }

    for (const item of normalizedRequestItems) {
      const product = productsById.get(String(item.productId));
      product.stock -= item.qty;
      await product.save();
    }

    const subtotal = Number(
      orderItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2)
    );

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totals: { subtotal, total: subtotal },
      status: "pending",
    });

    return res.status(201).json({
      ok: true,
      message: "Orden creada correctamente",
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({
      ok: true,
      message: "Órdenes obtenidas correctamente",
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: "Orden no encontrada",
        errors: null,
      });
    }

    if (String(order.userId) !== String(req.user._id)) {
      return res.status(403).json({
        ok: false,
        message: "No autorizado para ver esta orden",
        errors: null,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Orden obtenida correctamente",
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrderById };
