"use client";
/**
 * Navbar Component
 *
 * Barra de navegación principal del sitio.
 * - Responsive (mobile first)
 * - Usa el sistema de diseño global
 * - Integra navegación + CTA
 *
 * Comportamiento:
 * - Mobile: menú hamburguesa desplegable
 * - Desktop: navegación horizontal
 *
 * Uso:
 * <Navbar />
 *
 * Reglas:
 * - No usar colores hardcodeados
 * - Mantener estructura simple
 */

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Inicio");

  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Productos", href: "#productos" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
  ];

  // Sombra sutil al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detectar sección activa con IntersectionObserver
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = navLinks.find(
              (l) => l.href === `#${entry.target.id}`,
            );
            if (match) setActiveSection(match.label);
          }
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* NAVBAR FIJO */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 pb-2"
        style={{ pointerEvents: "none" }}
      >
        {/* PILL FLOTANTE */}
        <div
          className="
            max-w-7xl mx-auto
            rounded-2xl
            border border-[var(--border-default)]
            px-4 md:px-6 py-3
            flex items-center justify-between
            transition-all duration-300
          "
          style={{
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.85)"
              : "rgba(255,255,255,0.65)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: scrolled ? "0 2px 24px 0 rgba(22,94,122,0.08)" : "none",
            pointerEvents: "auto",
          }}
        >
          {/* LOGO */}

          <a href="#inicio" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Atomix Solutions"
              width={140}
              height={40}
              priority
            />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "var(--brand-primary)"
                      : "var(--text-secondary)",
                    backgroundColor: isActive
                      ? "var(--bg-soft)"
                      : "transparent",
                  }}
                >
                  {link.label}
                  {/* Punto indicador de sección activa */}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}

          <div className="hidden md:flex items-center gap-3">
            <span
              className="text-xs font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              {activeSection}
            </span>

            <div
              className="w-px h-4"
              style={{ backgroundColor: "var(--border-default)" }}
            />

            <ShoppingCart
              size={20}
              className="cursor-pointer"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-1.5 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
          >
            <div className="w-6 h-5 relative flex items-center justify-center">
              {/* Línea superior */}
              <motion.span
                className="absolute w-6 h-[2px] rounded-full"
                style={{ backgroundColor: "var(--text-primary)" }}
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -6,
                }}
                transition={{ duration: 0.25 }}
              />

              {/* Línea media */}
              <motion.span
                className="absolute w-6 h-[2px] rounded-full"
                style={{ backgroundColor: "var(--text-primary)" }}
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Línea inferior */}
              <motion.span
                className="absolute w-6 h-[2px] rounded-full"
                style={{ backgroundColor: "var(--text-primary)" }}
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 6,
                }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </button>
        </div>

        {/* MOBILE MENU — dentro del pill */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
        md:hidden
        max-w-7xl mx-auto mt-2
        rounded-2xl border
        px-4 py-4
      "
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderColor: "var(--border-default)",
                pointerEvents: "auto",
              }}
            >
              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="flex flex-col gap-1"
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.label;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                      style={{
                        color: isActive
                          ? "var(--brand-primary)"
                          : "var(--text-secondary)",
                        backgroundColor: isActive
                          ? "var(--bg-soft)"
                          : "transparent",
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                      )}
                    </motion.a>
                  );
                })}

                {/* Carrito mobile */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="mt-3 pt-3 flex items-center justify-center gap-2"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <ShoppingCart size={18} />
                  <span className="text-sm">Ver cotización</span>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SPACER — compensa el navbar fijo sin romper el Hero */}
      <div className="h-20" />
    </>
  );
}
