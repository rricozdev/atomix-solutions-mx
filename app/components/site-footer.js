import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { company, fullAddress, mapsDirectionsUrl, navLinks, whatsappUrl } from "../../data/site";

export default async function SiteFooter() {
  "use cache";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Atomix Solutions, inicio">
            <Image
              src="/images/brand/logo-atomix.png"
              alt="Atomix Solutions"
              width={220}
              height={90}
            />
          </Link>
          <p>Tapas y complementos para que cada producto encuentre su solución.</p>
          <div className="footer-socials" aria-label="Redes y contacto">
            <a href={company.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.017 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.698 4.533-4.698 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.49 0-1.956.93-1.956 1.887v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.09 24 18.092 24 12.073Z" />
              </svg>
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle aria-hidden="true" size={19} />
            </a>
            <a href="#" aria-label="Correo electrónico">
              <Mail aria-hidden="true" size={19} />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h2>Explora</h2>
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
        <div className="footer-column footer-contact">
          <h2>Hablemos</h2>
          <a href={`tel:${company.phoneE164}`}>{company.phoneDisplay}</a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer">{fullAddress}</a>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <p>© {currentYear} Atomix Solutions. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
