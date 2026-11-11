import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Handshake,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import {
  company,
  fullAddress,
  mapsDirectionsUrl,
  whatsappUrl,
} from "../../data/site";
import { buttonVariants } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { createPageMetadata } from "../../data/seo";

export const metadata = createPageMetadata({
  title: "Nosotros",
  description:
    "Conoce Atomix Solutions, especialistas en tapas y complementos para botellas con atención personalizada y envíos a México.",
  path: "/nosotros",
});

const values = [
  [
    Handshake,
    "Cercanía",
    "Escuchamos cada proyecto y te orientamos para encontrar la mejor alternativa.",
  ],
  [
    PackageCheck,
    "Disponibilidad",
    "Mantenemos variedad de productos para responder con agilidad.",
  ],
  [
    ShieldCheck,
    "Compromiso",
    "Cuidamos cada detalle para ser un socio confiable de tu operación.",
  ],
];

const mapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.9608687023897!2d-99.22386172556786!3d19.45725388182742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20246693b0439%3A0xbb68652c3088ac66!2sParque%20de%20Orizaba%202%2C%20El%20Parque%2C%2053398%20Naucalpan%20de%20Ju%C3%A1rez%2C%20M%C3%A9x.%2C%20M%C3%A9xico!5e0!3m2!1ses-419!2sco!4v1793901003656!5m2!1ses-419!2sco";

export default function AboutPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-shell page-heading">
          <p className="eyebrow">Sobre Atomix Solutions</p>
          <h1>
            Un socio para cada <span>etapa de tu producto.</span>
          </h1>
          <p>
            Acompañamos a marcas y negocios con soluciones confiables para el
            envasado, desde la selección del componente hasta su entrega.
          </p>
        </div>
      </section>
      <section className="plain-section">
        <div className="page-shell">
          <p className="eyebrow">Lo que hacemos</p>
          <h2>Experiencia en cada cierre.</h2>
          <p>
            Atomix Solutions es una empresa dedicada a la venta de tapas y
            complementos para botellas. Contamos con triggers, Disktop caps,
            bombas dosificadoras, atomizadores y más, en variedad de tamaños,
            colores y diseños para las necesidades de distintos sectores.
          </p>
          <p>
            Nuestro compromiso es brindar productos confiables y atención
            personalizada, con enfoque en la eficiencia y rapidez de entrega.
            Trabajamos con responsabilidad y atención al detalle para ser el
            socio ideal en soluciones de envasado.
          </p>
          <div className="about-values">
            {values.map(([Icon, title, description]) => (
              <Card className="about-value" key={title} role="article">
                <Icon
                  className="about-value-icon"
                  aria-hidden="true"
                  size={20}
                />
                <h3>{title}</h3>
                <p>{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="page-shell">
        <figure className="about-image">
          <div className="about-image-frame">
            <Image
              src="/images/ui/img-nosotros-1-20261105.webp"
              alt="Selección de cinco productos de envasado distribuidos por Atomix Solutions"
              fill
              sizes="(max-width: 800px) 100vw, 1200px"
            />
          </div>
          <figcaption>Soluciones de envasado con asesoría cercana.</figcaption>
        </figure>
      </div>
      <section className="about-location-section">
        <div className="page-shell about-location-layout">
          <div className="about-location-copy">
            <p className="eyebrow">Nuestra casa</p>
            <h2>Atención desde Naucalpan, con alcance nacional.</h2>
            <p>
              Estamos en {company.address.city}, {company.address.state}, y
              atendemos pedidos con envíos a todo México.
            </p>
            <address className="about-location-address">{fullAddress}</address>
            <div className="about-location-actions">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "button button-dark",
                })}
                href={whatsappUrl()}
              >
                Hablemos de tu proyecto{" "}
                <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
              <Link
                className="about-location-directions"
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Abrir en Google Maps{" "}
                <ArrowUpRight aria-hidden="true" size={14} />
              </Link>
            </div>
          </div>
          <div className="about-location-map">
            <iframe
              src={mapsEmbedUrl}
              title="Ubicación de Atomix Solutions en Naucalpan de Juárez"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
