import sansevieria from "../assets/sansevieria_zeylanica.png";
import zamioculca from "../assets/zamioculca.png";
import pothos from "../assets/pothos_dorado.png";
import monstera from "../assets/monstera_deliciosa.png";
import ficus from "../assets/ficus_lyrata.png";
import calathea from "../assets/calathea_orbifolia.png";
import spatifilo from "../assets/spatifilo_peace_lily.png";
import helecho from "../assets/helecho_boston.png";
import peperomia from "../assets/peperomia_obtusifolia.png";
import pilea from "../assets/pilea_peperomioides.png";
import echeveria from "../assets/echeveria_suculenta.png";
import ceropegia from "../assets/ceropegia_woodii.png";
import terrarioBosque from "../assets/terrario_cerrado_bosque.png";
import terrarioDesierto from "../assets/terrario_abierto_desierto.png";
import terrarioRoca from "../assets/terrario_abierto_roca.png";
import terrarioSelva from "../assets/terrario_cerrado_selva.png";

export const products = [
  { id: "av-001", name: "Sansevieria Zeylanica", category: "plantas", price: 23900, light: "baja-media", watering: "bajo", level: "principiante", size: "M", petFriendly: false, ideal: "Dormitorio / Living", tags: ["purificadora", "resistente"], image: sansevieria },
  { id: "av-002", name: "Zamioculca (ZZ Plant)", category: "plantas", price: 27900, light: "baja-media", watering: "bajo", level: "principiante", size: "M", petFriendly: false, ideal: "Living / Oficina", tags: ["resistente", "elegante"], image: zamioculca },
  { id: "av-003", name: "Pothos Dorado", category: "plantas", price: 19900, light: "baja-media", watering: "medio", level: "principiante", size: "M", petFriendly: false, ideal: "Living (colgante)", tags: ["colgante", "crecimiento rápido"], image: pothos },
  { id: "av-004", name: "Monstera Deliciosa", category: "plantas", price: 45900, light: "media-alta", watering: "medio", level: "intermedio", size: "L", petFriendly: false, ideal: "Living", tags: ["statement", "tropical"], image: monstera },
  { id: "av-005", name: "Ficus Lyrata", category: "plantas", price: 59900, light: "alta", watering: "medio", level: "intermedio", size: "L", petFriendly: false, ideal: "Living", tags: ["premium", "protagonista"], image: ficus },
  { id: "av-006", name: "Calathea Orbifolia", category: "plantas", price: 38900, light: "baja-media", watering: "medio-alto", level: "intermedio", size: "M", petFriendly: true, ideal: "Dormitorio / Living", tags: ["hojas decorativas", "humedad"], image: calathea },
  { id: "av-007", name: "Spatifilo (Peace Lily)", category: "plantas", price: 25900, light: "baja-media", watering: "medio", level: "principiante", size: "M", petFriendly: false, ideal: "Dormitorio", tags: ["floración", "purificadora"], image: spatifilo },
  { id: "av-008", name: "Helecho Boston", category: "plantas", price: 24900, light: "media", watering: "alto", level: "intermedio", size: "M", petFriendly: true, ideal: "Baño / Cocina", tags: ["humedad", "frondoso"], image: helecho },
  { id: "av-009", name: "Peperomia Obtusifolia", category: "plantas", price: 18900, light: "media", watering: "bajo-medio", level: "principiante", size: "S", petFriendly: true, ideal: "Escritorio", tags: ["compacta", "decorativa"], image: peperomia },
  { id: "av-010", name: "Pilea Peperomioides", category: "plantas", price: 20900, light: "media-alta", watering: "medio", level: "principiante", size: "S", petFriendly: true, ideal: "Escritorio", tags: ["minimal", "luminosa"], image: pilea },
  { id: "av-011", name: "Echeveria (Suculenta)", category: "plantas", price: 12900, light: "alta", watering: "bajo", level: "principiante", size: "S", petFriendly: true, ideal: "Ventana / Balcón", tags: ["bajo mantenimiento"], image: echeveria },
  { id: "av-012", name: "Ceropegia Woodii", category: "plantas", price: 19900, light: "media-alta", watering: "bajo", level: "principiante", size: "S", petFriendly: false, ideal: "Ventana (colgante)", tags: ["colgante", "delicada"], image: ceropegia },

  { id: "av-013", name: "Terrario Cerrado \"Bosque Niebla\"", category: "terrarios", price: 54900, light: "baja-media", watering: "muy-bajo", level: "principiante", size: "M", petFriendly: true, ideal: "Escritorio / Living", tags: ["autohumedo", "zen"], image: terrarioBosque },
  { id: "av-014", name: "Terrario Abierto \"Desierto\"", category: "terrarios", price: 37900, light: "alta", watering: "bajo", level: "principiante", size: "S", petFriendly: true, ideal: "Ventana", tags: ["suculentas", "minimal"], image: terrarioDesierto },
  { id: "av-015", name: "Terrario Abierto \"Roca & Musgo\"", category: "terrarios", price: 49900, light: "media", watering: "bajo-medio", level: "intermedio", size: "M", petFriendly: true, ideal: "Living", tags: ["musgo", "paisaje"], image: terrarioRoca },
  { id: "av-016", name: "Terrario Cerrado \"Selva Serena\"", category: "terrarios", price: 69900, light: "media", watering: "muy-bajo", level: "intermedio", size: "L", petFriendly: true, ideal: "Living", tags: ["tropical", "protagonista"], image: terrarioSelva },
];

export const collections = [
  { id: "col-luz-suave", title: "Luz Suave", desc: "Presencia serena, sin exigir luz.", preset: { light: "baja-media" } },
  { id: "col-escritorio", title: "Escritorio Vivo", desc: "Pequeños gestos cerca de vos.", preset: { size: "S" } },
  { id: "col-humedad", title: "Humedad Serena", desc: "Verde frondoso, aire fresco.", preset: { watering: "alto" } },
  { id: "col-sol-manana", title: "Sol de Mañana", desc: "Luz clara, energía suave.", preset: { light: "alta" } },
  { id: "col-pet", title: "Convivencia Pet-Friendly", desc: "Belleza que convive.", preset: { petFriendly: true } },
];

export const formatARS = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);



