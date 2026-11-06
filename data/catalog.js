/**
 * Catálogo de Atomix Solutions.
 * Correcciones aplicadas respecto al sitio original:
 *  - "Triggers" ya no reutiliza la descripción de los atomizadores.
 *  - Fotos de "Disktop 24-415" y "Disktop 28-410" estaban intercambiadas.
 *  - Los productos 7 y 9 tenían el mismo nombre; ahora se distinguen.
 *  - Ortografía corregida (botón, económico, cola de pato, etc.).
 */

export const categories = [
  {
    slug: "atomizadores-de-boton",
    name: "Atomizadores de Botón",
    short: "Atomizadores",
    tagline: "Pulverización fina y uniforme",
    description:
      "Válvulas de botón que convierten el líquido en una niebla fina y controlada. Ideales para perfumes, splash corporales, ambientadores y sanitizantes de uso personal.",
    uses: ["Perfumería", "Cosmética", "Ambientadores", "Sanitizantes"],
    image: "/images/categories/atomizadores.jpeg",
    sizes: ["20 mm", "24 mm"],
  },
  {
    slug: "bomba-dosificadora",
    name: "Bomba Dosificadora",
    short: "Bombas",
    tagline: "La dosis exacta en cada disparo",
    description:
      "También conocida como bomba silla de montar. Entrega una cantidad constante de producto en cada pulsación, evitando desperdicio en cremas, shampoos, jabones líquidos y geles.",
    uses: ["Shampoo", "Jabón líquido", "Cremas", "Gel antibacterial"],
    image: "/images/categories/bomba-dosificadora.jpeg",
    sizes: ["24 mm", "28 mm"],
  },
  {
    slug: "tapa-disktop",
    name: "Tapa Disktop",
    short: "Disktop",
    tagline: "Abre con un toque",
    description:
      "Tapa dosificadora que se abre presionando uno de sus lados. Perfecta para productos viscosos; disponible en colores sólidos y acabados metalizados dorado y plata.",
    uses: ["Shampoo", "Acondicionador", "Cremas", "Gel"],
    image: "/images/categories/tapa-disktop.jpeg",
    sizes: ["20 mm", "24 mm", "28 mm"],
  },
  {
    slug: "tapa-fliptop",
    name: "Tapa FlipTop",
    short: "FlipTop",
    tagline: "Bisagra práctica y segura",
    description:
      "Tapa con bisagra que se abre y cierra con una mano. Permite dosificar y aprovechar mejor el producto en envases cosméticos, farmacéuticos y de alimentos.",
    uses: ["Cosmética", "Farmacéutica", "Alimentos", "Cuidado personal"],
    image: "/images/categories/tapa-fliptop.jpeg",
    sizes: ["20 mm", "24 mm", "28 mm"],
  },
  {
    slug: "triggers",
    name: "Triggers",
    short: "Triggers",
    tagline: "Rocío potente para limpieza e industria",
    description:
      "Atomizadores de gatillo para aplicar líquidos en chorro o rocío. Desde el mini trigger para uso cosmético hasta modelos industriales resistentes para limpieza, jardinería y químicos.",
    uses: ["Limpieza", "Industria", "Jardinería", "Automotriz"],
    image: "/images/categories/trigger-industrial.jpeg",
    sizes: ["24 mm", "28 mm"],
  },
];

// [id, slug, nombre, categoría, descripción, imagen, medida, rosca, specs]
const rawProducts = [
  [
    1,
    "1-atomizador-20-liso",
    "Atomizador 20 Liso",
    "atomizadores-de-boton",
    "Atomizador de botón de 20 mm con casquillo liso.",
    "20-410-liso.jpg",
    "20 mm",
    null,
    "Color=Blanco, Negro|Rosca=Liso|PZ por caja=3000|Popote=12 cm",
  ],
  [
    2,
    "2-atomizador-20-estriado",
    "Atomizador 20 Estriado",
    "atomizadores-de-boton",
    "Atomizador de botón de 20 mm con casquillo estriado para mejor agarre.",
    "20-410-estriado.jpg",
    "20 mm",
    null,
    "Color=Blanco, Negro, Natural|Rosca=Estriado|PZ por caja=3000|Popote=12 cm",
  ],
  [
    3,
    "3-atomizador-24-liso",
    "Atomizador 24 Liso",
    "atomizadores-de-boton",
    "Atomizador de botón de 24 mm con casquillo liso.",
    "24-410-liso.jpg",
    "24 mm",
    null,
    "Color=Blanco, Negro|Rosca=Liso|PZ por caja=2000|Popote=17 cm",
  ],
  [
    4,
    "4-atomizador-24-estriado",
    "Atomizador 24 Estriado",
    "atomizadores-de-boton",
    "Atomizador de botón de 24 mm con casquillo estriado para mejor agarre.",
    "24-410-estriado.jpg",
    "24 mm",
    null,
    "Color=Blanco, Negro|Rosca=Estriado|PZ por caja=2000|Popote=17 cm",
  ],
  [
    5,
    "5-atomizador-20",
    "Atomizador 20 Metalizado",
    "atomizadores-de-boton",
    "Atomizador de botón de 20 mm con acabado metalizado.",
    "20-410.jpg",
    "20 mm",
    null,
    "Color=Dorado, Plata|PZ por caja=2000|Popote=12 cm",
  ],
  [
    6,
    "6-atomizador-24",
    "Atomizador 24 Metalizado",
    "atomizadores-de-boton",
    "Atomizador de botón de 24 mm con acabado metalizado.",
    "24-415.jpg",
    "24 mm",
    null,
    "Color=Dorado, Plata|PZ por caja=2500|Popote=17 cm",
  ],
  [
    7,
    "7-bomba-dosificadora-28-410",
    "Bomba Dosificadora 28-410 Azul",
    "bomba-dosificadora",
    "Bomba dosificadora de 28 mm, rosca 410.",
    "bomba-dosificadora-modelo-b.jpg",
    "28 mm",
    "410",
    "Color=Azul|PZ por caja=1000|Popote=17 cm",
  ],
  [
    8,
    "8-bomba-dosificadora-aluminio",
    "Bomba Dosificadora Aluminio",
    "bomba-dosificadora",
    "Bomba dosificadora de 24 mm, rosca 410, con collarín de aluminio.",
    "bomba-dosificadora-estriada-silla-montar.jpg",
    "24 mm",
    "410",
    "Color=Dorado, Plateado|PZ por caja=1000|Popote=17 cm",
  ],
  [
    9,
    "9-bomba-dosificadora-28-410",
    "Bomba Dosificadora 28-410 Lisa",
    "bomba-dosificadora",
    "Bomba dosificadora de 28 mm, rosca 410, casquillo liso y popote largo.",
    "bomba-dosificadora-estriada-silla-montar1.jpg",
    "28 mm",
    "410",
    "Color=Blanco, Natural|Rosca=Liso|PZ por caja=1000|Popote=23.5 cm",
  ],
  [
    10,
    "10-disktop-20-410",
    "Disktop 20-410",
    "tapa-disktop",
    "Tapa Disktop de 20 mm, rosca 410.",
    "disktop-20mm-410.jpg",
    "20 mm",
    "410",
    "Color=Blanco, Negro, Natural|PZ por caja=5000",
  ],
  [
    11,
    "11-disktop-24-415",
    "Disktop 24-415",
    "tapa-disktop",
    "Tapa Disktop de 24 mm, rosca 415.",
    "disktop-24mm-415.jpg",
    "24 mm",
    "415",
    "Color=Blanco, Natural|PZ por caja=2500",
  ],
  [
    12,
    "12-disktop-28-410",
    "Disktop 28-410",
    "tapa-disktop",
    "Tapa Disktop de 28 mm, rosca 410.",
    "disktop-28mm-410.jpg",
    "28 mm",
    "410",
    "Color=Blanco, Negro, Natural|PZ por caja=2500",
  ],
  [
    13,
    "13-fliptop-20",
    "FlipTop 20",
    "tapa-fliptop",
    "Tapa FlipTop de 20 mm.",
    "fliptop-20mm.jpg",
    "20 mm",
    null,
    "Color=Natural",
  ],
  [
    14,
    "14-fliptop-24",
    "FlipTop 24",
    "tapa-fliptop",
    "Tapa FlipTop de 24 mm.",
    "fliptop-24mm.jpg",
    "24 mm",
    null,
    "Color=Natural",
  ],
  [
    15,
    "15-fliptop-28",
    "FlipTop 28",
    "tapa-fliptop",
    "Tapa FlipTop de 28 mm.",
    "fliptop-28mm.jpg",
    "28 mm",
    null,
    "Color=Natural",
  ],
  [
    16,
    "16-mini-trigger",
    "Mini Trigger",
    "triggers",
    "Mini trigger de 24 mm, rosca 410.",
    "mini-trigger.jpg",
    "24 mm",
    "410",
    "Color=Natural|PZ por caja=1000|Popote=21 cm",
  ],
  [
    17,
    "17-trigger-economico",
    "Trigger Económico",
    "triggers",
    "Trigger económico de 28 mm, rosca 400.",
    "trigger-economico.jpg",
    "28 mm",
    "400",
    "Color=Blanco, Negro|PZ por caja=500|Popote=24 cm",
  ],
  [
    18,
    "18-trigger-industrial",
    "Trigger Industrial",
    "triggers",
    "Trigger industrial de 28 mm, rosca 400. Uso rudo.",
    "trigger-industrial.jpg",
    "28 mm",
    "400",
    "Color=Rojo, Azul|PZ por caja=500|Popote=24 cm",
  ],
  [
    19,
    "19-trigger-cola-de-pato",
    "Trigger Cola de Pato",
    "triggers",
    "Trigger cola de pato de 28 mm, rosca 400.",
    "trigger-cola-de-pato.jpg",
    "28 mm",
    "400",
    "Color=Rojo, Azul|PZ por caja=500|Popote=24 cm",
  ],
  [
    20,
    "20-disktop-20",
    "Disktop 20 Metalizado",
    "tapa-disktop",
    "Tapa Disktop de 20 mm, rosca 410, acabado metalizado.",
    "disktop-20-2.jpg",
    "20 mm",
    "410",
    "Color=Dorado, Plata|PZ por caja=2500",
  ],
  [
    21,
    "21-disktop-24",
    "Disktop 24 Metalizado",
    "tapa-disktop",
    "Tapa Disktop de 24 mm, rosca 410, acabado metalizado.",
    "disktop-24-2.jpg",
    "24 mm",
    "410",
    "Color=Dorado, Plata|PZ por caja=2500",
  ],
  [
    22,
    "22-disktop-28",
    "Disktop 28 Metalizado",
    "tapa-disktop",
    "Tapa Disktop de 28 mm, rosca 410, acabado metalizado.",
    "disktop-28-2.jpg",
    "28 mm",
    "410",
    "Color=Dorado, Plata|PZ por caja=2000",
  ],
];

const FEATURED = [3, 11];

export const products = rawProducts.map(
  ([
    id,
    slug,
    name,
    category,
    description,
    filename,
    size,
    thread,
    specText,
  ]) => {
    const specs = specText.split("|").map((pair) => {
      const [label, value] = pair.split("=");
      return { label, value };
    });
    const colorSpec = specs.find((s) => s.label === "Color");
    const boxSpec = specs.find((s) => s.label === "PZ por caja");
    return {
      id,
      slug,
      name,
      category,
      description,
      image: `/images/productos/${filename.replace(/\.jpg$/, ".jpeg")}`,
      size,
      thread,
      neck: thread ? `${size.replace(" mm", "")}/${thread}` : size,
      colors: colorSpec ? colorSpec.value.split(",").map((c) => c.trim()) : [],
      piecesPerBox: boxSpec ? Number(boxSpec.value) : null,
      specs,
      featured: FEATURED.includes(id),
    };
  },
);

export const COLOR_SWATCHES = {
  Blanco: { bg: "#ffffff", ring: "#cbd5e1" },
  Negro: { bg: "#121417", ring: "#121417" },
  Natural: {
    bg: "linear-gradient(135deg,#f4f7f9 0%,#dfe7ec 50%,#f8fafb 100%)",
    ring: "#b8c4cd",
  },
  Dorado: {
    bg: "linear-gradient(135deg,#f6dd8a 0%,#c99a2e 55%,#f3d57a 100%)",
    ring: "#b78a26",
  },
  Plata: {
    bg: "linear-gradient(135deg,#f3f4f6 0%,#a7adb5 55%,#e5e7eb 100%)",
    ring: "#8f969e",
  },
  Plateado: {
    bg: "linear-gradient(135deg,#f3f4f6 0%,#a7adb5 55%,#e5e7eb 100%)",
    ring: "#8f969e",
  },
  Azul: { bg: "#1d4fd8", ring: "#1a3fa8" },
  Rojo: { bg: "#d32626", ring: "#a91d1d" },
};

export const SIZES = ["20 mm", "24 mm", "28 mm"];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(slug) {
  return products.filter((p) => p.category === slug);
}

export function getRelated(product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
