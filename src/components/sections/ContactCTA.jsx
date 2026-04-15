"use client";

/**
 * ContactCTA.jsx
 *
 * Sección de conversión principal (CTA).
 *
 * Objetivo:
 * - Convertir usuarios en leads (WhatsApp)
 * - Reforzar disponibilidad inmediata (stock)
 * - Reducir fricción en contacto B2B
 *
 * Estructura:
 * - Header (mensaje fuerte)
 * - Subtexto (contexto comercial)
 * - CTA principal (WhatsApp)
 *
 * Stack:
 * - Next.js (JSX)
 * - TailwindCSS v4 + design tokens
 */

export default function ContactCTA() {
  return (
    <section className="w-full bg-[var(--bg-section)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* CONTENEDOR */}
        <div
          className="
            w-full
            bg-[var(--bg-main)]
            border
            rounded-2xl
            px-6 md:px-10
            py-10 md:py-14
            flex flex-col md:flex-row md:items-center md:justify-between
            gap-8
          "
          style={{ borderColor: "var(--border-default)" }}
        >
          {/* CONTENIDO */}
          <div className="max-w-xl">
            {/* EYEBROW */}
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="block w-5 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Cotización inmediata
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Solicita tu pedido con{" "}
              <span style={{ color: "var(--brand-primary)" }}>
                disponibilidad en stock
              </span>
            </h2>

            {/* DESC */}
            <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
              Atención directa por WhatsApp para cotizaciones, disponibilidad y
              tiempos de entrega. Respuesta rápida para mantener tu operación en
              marcha.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* BOTÓN PRINCIPAL */}
            <a
              href="https://wa.me/5215543542352"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm md:text-base"
            >
              Solicitar cotización
            </a>

            {/* INFO SECUNDARIA */}
            <span
              className="text-xs md:text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Respuesta en menos de 24 horas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
