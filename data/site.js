export const SITE_URL = "https://atomixsolutions.mx";

export const company = {
  name: "Atomix Solutions",
  shortName: "Atomix",
  tagline: "La solución perfecta para cada aplicación",
  description:
    "Distribuidor de tapas y complementos para botellas en México: triggers, tapas Disktop y FlipTop, bombas dosificadoras y atomizadores de botón. Stock disponible y envíos a todo el país.",
  phoneDisplay: "+52 55 4354 2352",
  phoneE164: "+525543542352",
  whatsappNumber: "573115201344",
  address: {
    street: "Parque de Orizaba #2",
    neighborhood: "El Parque",
    postalCode: "53398",
    city: "Naucalpan de Juárez",
    state: "Estado de México",
    country: "MX",
  },
  facebook: "https://www.facebook.com/AtomixSolutions/",
};

export const fullAddress = `${company.address.street}, ${company.address.neighborhood}, C.P. ${company.address.postalCode}, ${company.address.city}, ${company.address.state}`;

const mapsQuery = encodeURIComponent(
  `Parque de Orizaba 2, El Parque, ${company.address.postalCode} Naucalpan de Juárez, Méx.`,
);

export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

export function whatsappUrl(message = "¡Hola! Me interesan sus productos.") {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];
