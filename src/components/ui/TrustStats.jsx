/**
 * TrustStats Component
 *
 * Muestra métricas clave del negocio para reforzar la credibilidad.
 * Permite al usuario escanear rápidamente datos relevantes.
 *
 * Contenido:
 * - Años de experiencia
 * - Número de clientes
 * - Cumplimiento en pedidos
 * - Cobertura
 *
 * Responsive:
 * - Mobile: columna
 * - Desktop: fila (grid)
 *
 * Uso:
 * <TrustStats />
 *
 * Reglas:
 * - No inventar métricas
 * - Mantener claridad (lectura rápida)
 * - No usar colores hardcodeados
 * - Métricas clave separadas por líneas verticales.
 * - Diseño editorial: números en serif, prefijos/sufijos en brand color.
 *
 * Responsive:
 * - Mobile: 2 columnas con borde inferior
 * - Desktop: 4 columnas con borde derecho
 */

export default function TrustStats() {
  const stats = [
    { value: "2", prefix: "+", suffix: "", label: "Años de experiencia" },
    { value: "20", prefix: "+", suffix: "", label: "Clientes atendidos" },
    { value: "100", prefix: "", suffix: "%", label: "Cumplimiento en pedidos" },
    { value: "Nac.", prefix: "", suffix: "", label: "Cobertura en México" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[var(--border-default)]">
      {stats.map((item, index) => (
        <div
          key={index}
          className="
            flex flex-col
            py-8 pr-6
            border-b border-[var(--border-default)]
            md:border-b-0
            md:border-r md:last:border-r-0
          "
        >
          {/* Valor numérico en serif */}
          <span
            className="text-4xl sm:text-5xl font-normal leading-none text-[var(--text-primary)]"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {item.prefix && (
              <span className="text-[var(--brand-primary)]">{item.prefix}</span>
            )}
            {item.value}
            {item.suffix && (
              <span
                className="text-[var(--brand-primary)] align-super"
                style={{ fontSize: "0.55em" }}
              >
                {item.suffix}
              </span>
            )}
          </span>

          {/* Etiqueta */}
          <span className="text-xs text-[var(--text-muted)] leading-snug mt-2">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
