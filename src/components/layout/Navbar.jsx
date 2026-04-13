"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Productos", href: "#" },
    { label: "Nosotros", href: "#" },
    { label: "Contacto", href: "#" },
  ];

  return (
    <header className="w-full border-b border-[var(--border-default)] bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-lg font-semibold">Atomix</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button>Solicitar cotización</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[var(--border-default)] px-4 pb-4">
          <nav className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}

            <Button fullWidth>Solicitar cotización</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
