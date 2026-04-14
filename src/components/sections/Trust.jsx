"use client";

/**
 * Trust Section
 *
 * Sección de credibilidad (trust) ubicada después del Hero.
 * Su objetivo es reducir la incertidumbre del usuario y reforzar
 * la percepción de profesionalismo y confianza.
 *
 * Contenido:
 * - Título + micro-copy (mensaje de confianza)
 * - Tipos de clientes (prueba social sin logos)
 * - Métricas clave del negocio
 *
 * Arquitectura:
 * - Se compone de subcomponentes UI:
 *   - TrustTitle
 *   - TrustCategories
 *   - TrustStats
 *
 * Responsive:
 * - Mobile: estructura en columna (stack)
 * - Desktop: mantiene columna, con elementos internos en fila
 *
 * Uso:
 * <Trust />
 *
 * Reglas:
 * - No usar colores hardcodeados
 * - Mantener diseño limpio y escaneable
 * - No sobrecargar visualmente (no competir con el Hero)
 */

import TrustTitle from "@/components/ui/TrustTitle";
import TrustCategories from "@/components/ui/TrustCategories";
import TrustStats from "@/components/ui/TrustStats";

export default function Trust() {
  return (
    <section className="w-full bg-[var(--bg-section)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Fila superior: Título + Categorías en desktop */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
          <TrustTitle /> <TrustCategories />{" "}
        </div>

        {/* Separador */}
        <div className="mt-12 mb-10 h-px bg-[var(--border-default)]" />

        {/* Métricas */}
        <TrustStats />
      </div>
    </section>
  );
}
