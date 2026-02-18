const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const ordersRoutes = require("./routes/orders.routes");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(morgan("dev"));
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
