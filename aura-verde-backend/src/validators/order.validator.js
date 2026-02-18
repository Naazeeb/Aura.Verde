const { z } = require("zod");

const orderItemSchema = z.object({
  productId: z.string().min(1, "productId es obligatorio"),
  qty: z.number().int().min(1, "qty debe ser mayor o igual a 1").optional(),
  quantity: z.number().int().min(1, "quantity debe ser mayor o igual a 1").optional(),
}).refine((item) => Number.isInteger(item.qty) || Number.isInteger(item.quantity), {
  message: "Debes enviar qty o quantity",
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "La orden debe contener al menos un item"),
});

module.exports = { createOrderSchema };
