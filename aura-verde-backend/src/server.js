require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

const validateEnv = () => {
  const requiredVars = ["MONGO_URI", "JWT_SECRET"];
  const missing = requiredVars.filter((envName) => !process.env[envName]);

  if (missing.length === 0) return true;

  console.error("No se pudo iniciar el servidor por variables faltantes.");
  console.error(`Faltan: ${missing.join(", ")}`);
  console.error("Cómo solucionarlo:");
  console.error("1) Creá el archivo .env en la raíz del backend.");
  console.error("2) Copiá .env.example.");
  console.error("3) Completá MONGO_URI y JWT_SECRET.");
  return false;
};

const bootstrap = async () => {
  try {
    if (!validateEnv()) {
      process.exitCode = 1;
      return;
    }

    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar servidor:", error.message);
    process.exit(1);
  }
};

bootstrap();
