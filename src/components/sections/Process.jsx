"use client";

/**
 * Process.jsx
 *
 * Sección "Cómo trabajamos" de Atomix Solutions MX.
 *
 * Objetivo:
 * - Explicar el flujo operativo del servicio
 * - Reducir fricción comercial
 * - Generar confianza en procesos industriales B2B
 *
 * Estructura:
 * - Header descriptivo
 * - Grid de pasos del proceso (4 etapas)
 *
 * Stack:
 * - Next.js (JSX)
 * - TailwindCSS v4 + variables CSS
 */

export default function Process() {
  const steps = [
    {
      id: "01",
      title: "Contacto y requerimiento",
      desc: "Recibimos tu solicitud con especificaciones del producto o necesidad de suministro.",
    },
    {
      id: "02",
      title: "Validación y disponibilidad",
      desc: "Confirmamos stock, compatibilidad y condiciones del producto según tu aplicación.",
    },
    {
      id: "03",
      title: "Cotización inmediata",
      desc: "Te enviamos propuesta con precios, cantidades disponibles y tiempos de entrega.",
    },
    {
      id: "04",
      title: "Despacho y entrega",
      desc: "Preparamos tu pedido desde inventario y coordinamos el envío según tu ubicación.",
    },
  ];

  return (
    <section className="w-full bg-[var(--bg-main)] py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* HEADER */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className="block w-5 h-0.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Cómo trabajamos
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Un proceso ágil para{" "}
            <span style={{ color: "var(--brand-primary)" }}>
              entrega inmediata
            </span>
          </h2>

          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            Stock disponible y respuesta rápida para cumplir con tus tiempos de
            operación.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[var(--border-default)]">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="group bg-[var(--bg-main)] p-6 md:p-8 flex flex-col gap-5 hover:bg-[var(--bg-soft)] transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  {step.id}
                </span>
                <span
                  className="h-px flex-1 max-w-6 transition-all duration-300 group-hover:max-w-full"
                  style={{ backgroundColor: "var(--border-default)" }}
                />
              </div>

              <h3 className="text-base font-bold tracking-tight text-[var(--text-primary)] leading-snug">
                {step.title}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                {step.desc}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center gap-1 mt-auto">
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Siguiente
                  </span>
                  <span style={{ color: "var(--accent)" }}>→</span>
                </div>
              )}

              {index === steps.length - 1 && (
                <div className="hidden md:block mt-auto">
                  <a
                    href="https://wa.me/5215543542352"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs"
                  >
                    Empezar ahora
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
