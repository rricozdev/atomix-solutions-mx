/**
 * TrustCategories Component
 *
 * Muestra los tipos de clientes que confían en el negocio.
 * Funciona como prueba social cuando no se cuentan con logos.
 *
 * Contenido:
 * - Lista de categorías de clientes (B2B)
 *
 * Responsive:
 * - Mobile: scroll horizontal
 * - Desktop: distribución en fila (wrap)
 *
 * Uso:
 * <TrustCategories />
 *
 * Reglas:
 * - No usar iconos innecesarios
 * - Mantener diseño simple y escaneable
 * - No usar colores hardcodeados
 */

export default function TrustCategories() {
  const categories = [
    "Fábricas de PET",
    "Laboratorios",
    "Marcas cosméticas",
    "Negocios de alimentos",
  ];

  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
        Sectores que atendemos
      </p>

      {/* Mobile: scroll horizontal | Desktop: wrap */}
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible">
        {categories.map((item, index) => (
          <div
            key={index}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap text-[var(--text-secondary)] bg-[var(--bg-soft)]"
            style={{ borderColor: "var(--border-default)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "var(--accent)" }}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
