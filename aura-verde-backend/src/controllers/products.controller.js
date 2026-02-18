const Product = require("../models/Product");

const buildSort = (sort) => {
  const sortMap = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    name_asc: { name: 1 },
    name_desc: { name: -1 },
    newest: { createdAt: -1 },
  };
  return sortMap[sort] || { createdAt: -1 };
};

const getProducts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      minPrice,
      maxPrice,
      sort = "newest",
      page = "1",
      limit = "12",
    } = req.query;

    const filters = { isActive: true };

    if (q) {
      filters.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (category) {
      filters.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.min(Math.max(Number(limit) || 12, 1), 100);
    const skip = (safePage - 1) * safeLimit;

    const [products, total] = await Promise.all([
      Product.find(filters).sort(buildSort(sort)).skip(skip).limit(safeLimit),
      Product.countDocuments(filters),
    ]);

    return res.status(200).json({
      ok: true,
      message: "Productos obtenidos correctamente",
      data: {
        items: products,
        pagination: {
          page: safePage,
          limit: safeLimit,
          total,
          totalPages: Math.ceil(total / safeLimit),
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product || !product.isActive) {
      return res.status(404).json({
        ok: false,
        message: "Producto no encontrado",
        errors: null,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Producto obtenido correctamente",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getProducts, getProductById };
