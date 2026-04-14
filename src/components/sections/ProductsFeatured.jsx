/**
 * src/components/sections/ProductsFeatured.jsx
 *
 * Sección de productos destacados de Atomix Solutions MX.
 *
 * Objetivo:
 * - Mostrar productos de alta rotación
 * - Enfocar la sección en intención comercial (cotización / ficha técnica)
 * - Reemplazar "detalle" por CTAs orientados a conversión B2B
 *
 * Estructura:
 * - Header con contexto comercial
 * - Grid de cards de productos
 * - CTA por producto (acción directa)
 *
 * Stack:
 * - Next.js (JSX)
 * - TailwindCSS v4 + design tokens (CSS variables)
 */

"use client";

import Image from "next/image";

export default function ProductsFeatured() {
  const products = [
    {
      id: 1,
      name: "Atomizador 24 Liso",
      spec: "Rosca 24-415 · Spray fino · Uso industrial",
      use: "Ideal para soluciones de limpieza, cosmética y líquidos de baja viscosidad.",
      badge: "Alta rotación",
      cta: "Solicitar ficha",
      ctaHref: "https://wa.me/5215543542352",
      image: "/images/product-1.webp",
    },
    {
      id: 2,
      name: "Disktop 24-415",
      spec: "Dosificador · Precisión controlada · Uso farmacéutico",
      use: "Dosificación precisa en productos de cuidado personal y laboratorio.",
      badge: "Uso profesional",
      cta: "Solicitar ficha",
      ctaHref: "https://wa.me/5215543542352",
      image: "/images/product-2.webp",
    },
  ];

  return (
    <section className="w-full bg-[var(--bg-section)] py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* HEADER */}
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className="block w-5 h-0.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Productos destacados
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Componentes de alta demanda para{" "}
            <span style={{ color: "var(--brand-primary)" }}>
              envasado industrial
            </span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-default)] rounded-2xl overflow-hidden">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                group
                bg-[var(--bg-main)]
                p-6 md:p-8
                flex flex-col md:flex-row
                gap-6
                items-start
                hover:bg-[var(--bg-soft)]
                transition-colors duration-300
              "
            >
              {/* IMAGEN — FIX SOLO MOBILE LAYOUT */}
              <div
                className="
                  relative shrink-0 rounded-xl overflow-hidden border
                  w-full md:w-[160px]
                  aspect-square md:aspect-auto
                  md:h-[160px]
                "
                style={{
                  backgroundColor: "var(--bg-section)",
                  borderColor: "var(--border-default)",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 160px"
                />
              </div>

              {/* CONTENT — SIN CAMBIOS */}
              <div className="flex flex-col flex-1 min-w-0 py-1">
                {/* BADGE */}
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-3"
                  style={{
                    backgroundColor: "var(--brand-primary)",
                    color: "var(--neutral-0)",
                  }}
                >
                  {product.badge}
                </span>

                {/* TITLE */}
                <h3 className="text-base md:text-lg font-bold tracking-tight text-[var(--text-primary)] leading-snug">
                  {product.name}
                </h3>

                {/* SPEC */}
                <p
                  className="text-xs font-medium uppercase tracking-wide mt-1.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {product.spec}
                </p>

                {/* USE */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                  {product.use}
                </p>

                {/* CTA — SOLO FIX MOBILE (evitar compresión) */}
                <div
                  className="
                    mt-5 pt-4 border-t
                    flex flex-col sm:flex-row
                    items-start sm:items-center
                    justify-between
                    gap-2 sm:gap-0
                  "
                  style={{ borderColor: "var(--border-default)" }}
                >
                  <a
                    href={product.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    {product.cta}
                  </a>

                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Respuesta en 24 h
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
