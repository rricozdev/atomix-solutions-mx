"use client";

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

import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Hero() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[500px]">
      {/* Background */}

      {/* Mobile */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/background-hero-moviles.webp"
          alt="Envases y atomizadores"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/images/background-hero.webp"
          alt="Envases y atomizadores"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay oscuro (mejora legibilidad) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <motion.div
          className="max-w-xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Envases y atomizadores confiables para tu negocio
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-base sm:text-lg text-white/90"
          >
            Productos de alta calidad con entregas rápidas y asesoría
            personalizada.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button>Solicitar cotización</Button>

            <Button variant="secondary-inverse">Ver catálogo</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
