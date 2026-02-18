const mongoose = require("mongoose");

const parseMongoUri = (mongoUri) => {
  if (!mongoUri || typeof mongoUri !== "string") {
    throw new Error("MONGO_URI invalida: debe ser un string no vacio.");
  }

  const trimmed = mongoUri.trim();
  const hasValidProtocol =
    trimmed.startsWith("mongodb://") || trimmed.startsWith("mongodb+srv://");

  if (!hasValidProtocol) {
    throw new Error(
      "MONGO_URI invalida: debe comenzar con mongodb:// o mongodb+srv://"
    );
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error(
      "MONGO_URI invalida: no se pudo parsear. Revisa el formato del string de Atlas."
    );
  }

  if (!parsed.hostname) {
    throw new Error("MONGO_URI invalida: no se detecto hostname del cluster.");
  }

  return { trimmed, host: parsed.hostname };
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      [
        "Falta la variable MONGO_URI.",
        "Solucion:",
        "1) Crea el archivo .env en la raiz del backend (junto a package.json).",
        "2) Copia el contenido de .env.example.",
        "3) Define MONGO_URI con tu conexion de MongoDB Atlas.",
      ].join("\n")
    );
  }

  const { trimmed, host } = parseMongoUri(mongoUri);

  try {
    await mongoose.connect(trimmed);
    console.log("MongoDB conectado");
  } catch (error) {
    if (error?.code === "ENOTFOUND" || String(error?.message || "").includes("ENOTFOUND")) {
      throw new Error(
        [
          `MONGO_URI invalida: el host del cluster no existe o no resuelve DNS (${host}).`,
          "Verifica que el host sea exactamente el que te da Atlas en Connect -> Drivers.",
          "No modifiques el host, solo reemplaza usuario, password y nombre de base.",
          `Host parseado para debug: ${host}`,
        ].join("\n")
      );
    }

    throw new Error(
      [
        `No se pudo conectar a MongoDB con el host: ${host}`,
        `Detalle: ${error?.message || "error desconocido"}`,
      ].join("\n")
    );
  }
};

module.exports = connectDB;
