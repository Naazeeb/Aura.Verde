require("dotenv").config();
const connectDB = require("../config/db");
const Product = require("../models/Product");

const products = [
  {
    name: "Sansevieria Zeylanica",
    description: "Resistente y escultorica. Ideal para principiantes.",
    category: "Plantas",
    price: 23900,
    stock: 25,
    image: "/images/plantas/sansevieria.webp",
    isActive: true,
  },
  {
    name: "Zamioculca (ZZ Plant)",
    description: "Verde profundo, bajo mantenimiento.",
    category: "Plantas",
    price: 27900,
    stock: 20,
    image: "/images/plantas/zamioculca.webp",
    isActive: true,
  },
  {
    name: "Pothos Dorado",
    description: "Cascada luminosa, crece rapido y se adapta.",
    category: "Plantas",
    price: 19900,
    stock: 30,
    image: "/images/plantas/pothos.webp",
    isActive: true,
  },
  {
    name: "Ficus Lyrata",
    description: "Hoja grande y tropical para dar protagonismo.",
    category: "Plantas",
    price: 59900,
    stock: 12,
    image: "/images/plantas/ficus.webp",
    isActive: true,
  },
  {
    name: "Calathea Orbifolia",
    description: "Rayas suaves, vibra selvatica, luz indirecta.",
    category: "Plantas",
    price: 38900,
    stock: 18,
    image: "/images/plantas/calathea.webp",
    isActive: true,
  },
  {
    name: "Spatifilo (Peace Lily)",
    description: "Elegante, con flores blancas. Ambiente sereno.",
    category: "Plantas",
    price: 25900,
    stock: 22,
    image: "/images/plantas/spatifilo.webp",
    isActive: true,
  },
  {
    name: "Helecho Boston",
    description: "Volumen colgante, humedad y frescura.",
    category: "Plantas",
    price: 24900,
    stock: 16,
    image: "/images/plantas/helecho.webp",
    isActive: true,
  },
  {
    name: "Peperomia Obtusifolia",
    description: "Compacta, hojas carnosas, facil de cuidar.",
    category: "Plantas",
    price: 18900,
    stock: 28,
    image: "/images/plantas/peperomia.webp",
    isActive: true,
  },
  {
    name: "Pilea Peperomioides",
    description: "Minimalista y simpatica, hojas redondas.",
    category: "Plantas",
    price: 20900,
    stock: 24,
    image: "/images/plantas/pilea.webp",
    isActive: true,
  },
  {
    name: "Echeveria (Suculenta)",
    description: "Roseta perfecta, poco riego.",
    category: "Plantas",
    price: 12900,
    stock: 40,
    image: "/images/plantas/echeveria.webp",
    isActive: true,
  },
  {
    name: "Ceropegia Woodii",
    description: "Collar de corazones, ideal para colgar.",
    category: "Plantas",
    price: 19900,
    stock: 20,
    image: "/images/plantas/ceropegia.webp",
    isActive: true,
  },
  {
    name: "Bosque Niebla",
    description: "Musgo, humedad y calma. Un mini ecosistema.",
    category: "Terrarios",
    price: 54900,
    stock: 10,
    image: "/images/terrarios/bosque-niebla.webp",
    isActive: true,
  },
  {
    name: "Santuario Verde",
    description: "Bosque compacto con textura y profundidad.",
    category: "Terrarios",
    price: 62900,
    stock: 8,
    image: "/images/terrarios/santuario-verde.webp",
    isActive: true,
  },
  {
    name: "Rincon Esmeralda",
    description: "Verde intenso, bajo mantenimiento.",
    category: "Terrarios",
    price: 49900,
    stock: 12,
    image: "/images/terrarios/rincon-esmeralda.webp",
    isActive: true,
  },
  {
    name: "Jardin Lunar",
    description: "Composicion limpia, foco decorativo.",
    category: "Terrarios",
    price: 69900,
    stock: 6,
    image: "/images/terrarios/jardin-lunar.webp",
    isActive: true,
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seed completado: ${products.length} productos cargados`);
    process.exit(0);
  } catch (error) {
    console.error("Error ejecutando seed:", error.message);
    process.exit(1);
  }
};

seed();
