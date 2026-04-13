"use client";

/**
 * Button Component
 *
 * Componente reutilizable de botón basado en el design system global (`globals.css`).
 * No contiene estilos hardcodeados: usa clases semánticas (`btn-primary`, `btn-secondary`).
 *
 * Props:
 * - children: contenido del botón (texto o elementos)
 * - variant: tipo de botón ("primary" | "secondary")
 * - type: tipo HTML del botón ("button", "submit", etc.)
 * - fullWidth: si el botón ocupa todo el ancho disponible
 * - className: clases adicionales (sin romper el design system)
 *
 * Uso:
 * <Button>Acción principal</Button>
 * <Button variant="secondary">Acción secundaria</Button>
 * <Button fullWidth>Botón ancho completo</Button>
 *
 * Reglas:
 * - No usar colores directamente en JSX
 * - No modificar estilos fuera de `globals.css`
 */

export default function Button({
  children,
  variant = "primary",
  type = "button",
  fullWidth = false,
  className = "",
  ...props
}) {
  // Estilos base comunes a todos los botones
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200";

  // Tamaños responsive (mobile first)
  const sizes = "px-4 py-3 text-sm sm:px-5 sm:py-3.5 sm:text-base";

  // Control de ancho
  const width = fullWidth ? "w-full" : "w-auto";

  // Variantes del botón (definidas en globals.css)
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  return (
    <button
      type={type}
      className={`${base} ${sizes} ${width} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
