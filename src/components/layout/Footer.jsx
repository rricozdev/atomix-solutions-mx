"use client";
/**
 * src/components/layout/Footer.jsx
 *
 * Footer corporativo de Atomix Solutions MX.
 *
 * Incluye:
 * - Branding
 * - Contacto
 * - Redes sociales
 * - Créditos de diseño/desarrollo
 */

import Image from "next/image";
import {
  IconBrandFacebook,
  IconMail,
  IconPhone,
  IconBrandWhatsapp,
  IconMapPin,
} from "@tabler/icons-react";

export default function Footer() {
  const contactItems = [
    {
      icon: IconMapPin,
      label: "Naucalpan de Juárez, CDMX",
      href: null,
    },
    {
      icon: IconPhone,
      label: "+52 55 6938 5626",
      href: "tel:+525569385626",
    },
    {
      icon: IconMail,
      label: "contacto@atomixsolutions.mx",
      href: "mailto:contacto@atomixsolutions.mx",
    },
    {
      icon: IconBrandWhatsapp,
      label: "WhatsApp directo",
      href: "https://wa.me/5215543542352",
    },
  ];

  return (
    <footer
      className="w-full border-t"
      style={{
        backgroundColor: "var(--neutral-900)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* BRAND */}
          <div>
            {/* LOGO */}
            <div className="mb-4">
              <Image
                src="/logoFooter.png"
                alt="Atomix Solutions"
                width={320}
                height={120}
                className="h-32 md:h-36 lg:h-40 w-auto"
                priority
              />
            </div>

            {/* DESCRIPCIÓN */}
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--neutral-400)" }}
            >
              Componentes de envasado para industrias cosmética, farmacéutica,
              alimentaria y de limpieza.
            </p>

            {/* Línea decorativa */}
            <div
              className="mt-6 w-12 h-0.5 rounded-full"
              style={{ backgroundColor: "var(--brand-primary-light)" }}
            />
          </div>

          {/* CONTACTO */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--neutral-400)" }}
            >
              Contacto
            </h4>

            <ul className="space-y-3">
              {contactItems.map((item, i) => {
                const Icon = item.icon;

                const content = (
                  <span
                    className="flex items-center gap-2.5 text-sm transition-colors"
                    style={{ color: "var(--neutral-400)" }}
                  >
                    <Icon
                      size={15}
                      style={{
                        color: "var(--brand-primary-light)",
                        flexShrink: 0,
                      }}
                    />
                    {item.label}
                  </span>
                );

                return (
                  <li key={i}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="hover:text-white transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <span
                        className="flex items-center gap-2.5 text-sm"
                        style={{ color: "var(--neutral-400)" }}
                      >
                        <Icon
                          size={15}
                          style={{
                            color: "var(--brand-secondary)",
                            flexShrink: 0,
                          }}
                        />
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* REDES + CTA */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--neutral-400)" }}
            >
              Síguenos
            </h4>

            <a
              href="https://www.facebook.com/AtomixSolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm transition-colors hover:text-white"
              style={{ color: "var(--neutral-400)" }}
            >
              <IconBrandFacebook
                size={16}
                style={{ color: "var(--brand-primary-light)" }}
              />
              Facebook
            </a>

            {/* Mini CTA */}
            <div
              className="mt-8 pt-8 border-t"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="block w-4 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--brand-primary)" }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--neutral-400)" }}
                >
                  Cotización inmediata
                </span>
              </div>

              <p
                className="text-xs mb-4 leading-relaxed"
                style={{ color: "var(--neutral-400)" }}
              >
                Escríbenos por WhatsApp y cotizamos sin compromiso.
              </p>

              <a
                href="https://wa.me/5215543542352"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block text-sm"
              >
                Solicitar cotización
              </a>
            </div>
          </div>
        </div>

        {/* DIVISOR */}
        <div
          className="mt-12 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />

        {/* BOTTOM */}
        <div className="mt-6 flex flex-col md:flex-row justify-between gap-3 text-xs">
          <span style={{ color: "var(--neutral-400)" }}>
            © {new Date().getFullYear()} Atomix Solutions MX. Todos los derechos
            reservados.
          </span>

          <a
            href="https://www.linkedin.com/in/ricardo-ricoz/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
            style={{ color: "var(--neutral-400)" }}
          >
            Design & Dev — rricozdev
          </a>
        </div>
      </div>
    </footer>
  );
}
