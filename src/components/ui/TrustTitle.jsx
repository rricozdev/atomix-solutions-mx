/**
 * TrustTitle Component
 *
 * Encabezado de la sección de confianza.
 * Presenta un título claro junto con un micro-copy que refuerza
 * la credibilidad del negocio.
 *
 * Contenido:
 * - Título principal (mensaje de confianza)
 * - Micro-copy (refuerzo breve)
 *
 * Uso:
 * <TrustTitle />
 *
 * Reglas:
 * - No usar textos genéricos o inflados
 * - Mantener claridad y brevedad
 * - No usar colores hardcodeados
 */

export default function TrustTitle() {
  return (
    <div className="max-w-xl flex-shrink-0">
      {/* Etiqueta de sección */}
      <div className="flex items-center gap-2.5 mb-4">
        <span
          className="block w-5 h-0.5 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          Confianza
        </span>
      </div>

      {/* Título */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
        Empresas que confían
        <br />
        <span style={{ color: "var(--brand-primary)" }}>en nosotros</span>
      </h2>

      {/* Micro-copy */}
      <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
        Calidad, cumplimiento y atención en cada pedido.
      </p>
    </div>
  );
}
