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
        backgroundColor: "var(--bg-section)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="block w-5 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Atomix Solutions MX
              </span>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Componentes de envasado para industrias cosmética, farmacéutica,
              alimentaria y de limpieza.
            </p>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-5">
              Contacto
            </h4>

            <ul className="space-y-3">
              {contactItems.map((item, i) => {
                const Icon = item.icon;

                const content = (
                  <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <Icon size={16} />
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
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <Icon size={16} />
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
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-5">
              Síguenos
            </h4>

            <a
              href="https://www.facebook.com/AtomixSolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <IconBrandFacebook size={18} />
              Facebook
            </a>

            <div
              className="mt-8 pt-8 border-t"
              style={{ borderColor: "var(--border-default)" }}
            >
              <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
                ¿Tienes un proyecto? Escríbenos y cotizamos sin compromiso.
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

        <div
          className="mt-12 h-px"
          style={{ backgroundColor: "var(--border-default)" }}
        />

        <div className="mt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span>
            © {new Date().getFullYear()} Atomix Solutions MX. Todos los derechos
            reservados.
          </span>

          <a
            href="https://www.linkedin.com/in/ricardo-ricoz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Design & Dev — rricozdev
          </a>
        </div>
      </div>
    </footer>
  );
}
