import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "../components/contact-form";
import { company, fullAddress, mapsDirectionsUrl, whatsappUrl } from "../../data/site";
import { createPageMetadata } from "../../data/seo";

export const metadata = createPageMetadata({
  title: "Contacto",
  description:
    "Solicita información o una cotización de tapas, atomizadores, triggers y bombas dosificadoras.",
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-shell page-heading">
          <p className="eyebrow">Contacto Atomix</p>
          <h1>Hablemos de lo que necesita <span>tu producto.</span></h1>
          <p>
            Escríbenos y te ayudamos a encontrar medidas, modelos y opciones
            disponibles para tu proyecto.
          </p>
        </div>
      </section>
      <section className="contact-section">
        <div className="page-shell contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">Atención personalizada</p>
            <h2>Estamos cerca, <span>con alcance nacional.</span></h2>
            <p>
              Cuéntanos qué tipo de envase o aplicación tienes en mente. Nuestro
              equipo te orientará sobre las opciones disponibles.
            </p>
            <div className="contact-details">
              <a href={`tel:${company.phoneE164}`}>
                <span className="detail-label">Teléfono / WhatsApp</span>
                <strong>{company.phoneDisplay}</strong>
              </a>
              <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer">
                <span className="detail-label">Dirección</span>
                <strong>{fullAddress}</strong>
              </a>
              <a href={company.facebook} target="_blank" rel="noreferrer">
                <span className="detail-label">Redes sociales</span>
                <strong>
                  Facebook · Atomix Solutions{" "}
                  <ArrowUpRight aria-hidden="true" size={14} />
                </strong>
              </a>
            </div>
            <p>
              También puedes escribirnos directamente por{" "}
              <Link href={whatsappUrl()}>WhatsApp</Link>.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
