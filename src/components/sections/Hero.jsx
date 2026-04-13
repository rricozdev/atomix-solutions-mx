"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * Hero Component
 *
 * Sección principal (above the fold) del sitio.
 * Comunica la propuesta de valor en los primeros segundos.
 *
 * Contenido:
 * - Headline (qué hacemos)
 * - Subheadline (cómo ayudamos)
 * - CTAs (acción principal y secundaria)
 * - Imagen representativa
 *
 * Responsive:
 * - Mobile: columna única
 * - Desktop: 2 columnas
 *
 * Uso:
 * <Hero />
 *
 * Reglas:
 * - No usar colores hardcodeados
 * - Mantener claridad y jerarquía visual
 */

export default function Hero() {
  return (
    <section className="w-full bg-[var(--bg-soft)]">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid gap-12 md:grid-cols-2 items-center">
        {/* Texto */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Envases y atomizadores confiables para tu negocio
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[var(--text-secondary)]">
            Ofrecemos productos de alta calidad con entregas rápidas y asesoría
            personalizada para empresas.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button fullWidth>Solicitar cotización</Button>

            <Button variant="secondary" fullWidth>
              Ver catálogo
            </Button>
          </div>

          {/* Prueba social */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-[var(--text-secondary)]">
            <span>+500 clientes</span>
            <span>Envíos nacionales</span>
            <span>Respuesta en 24h</span>
          </div>
        </div>

        {/* Imagen */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <Image
            src="/images/background-hero.webp"
            alt="Envases y atomizadores"
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
