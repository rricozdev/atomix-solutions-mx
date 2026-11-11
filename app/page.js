import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  MessageCircle,
  PackageCheck,
  Truck,
} from "lucide-react";
import { categories, products } from "../data/catalog";
import { company, mapsDirectionsUrl, whatsappUrl } from "../data/site";
import { buttonVariants } from "../components/ui/button";
import ContactForm from "./components/contact-form";
import ProductCard from "./components/product-card";

const benefits = [
  [Truck, "Envíos a todo México", "Tu operación llega más lejos."],
  [PackageCheck, "Stock disponible", "Productos listos para envío inmediato."],
  [
    MessageCircle,
    "Atención personalizada",
    "Te ayudamos a encontrar la medida ideal.",
  ],
  [ArrowRight, "Precios competitivos", "Opciones que cuidan tu operación."],
];

const featuredProducts = products.filter((product) => product.featured);
const primaryActionClass = buttonVariants({
  size: "lg",
  className: "button button-light",
});
const secondaryActionClass = buttonVariants({
  size: "lg",
  variant: "outline",
  className: "button button-outline-light",
});

export default function Home() {
  return (
    <>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <picture className="hero-picture">
            <source
              media="(max-width: 650px)"
              srcSet="/images/ui/slide-2.jpeg"
            />
            <Image
              src="/images/ui/slide.jpeg"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="hero-image"
            />
          </picture>
          <div className="hero-shade" />
          <div className="hero-inner page-shell">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light">
                Componentes para envasado · México
              </p>
              <h1 id="hero-title">
                La solución perfecta
                <br />
                <span>para cada aplicación.</span>
              </h1>
              <p className="hero-description">
                Tapas, atomizadores y sistemas dosificadores para que cada
                producto tenga el cierre que necesita.
              </p>
              <div className="hero-actions">
                <Link className={primaryActionClass} href="/productos">
                  Explorar productos{" "}
                  <ArrowUpRight aria-hidden="true" size={17} />
                </Link>
                <a
                  className={secondaryActionClass}
                  href={whatsappUrl(
                    "¡Hola! Me interesa conocer sus productos.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Cotizar por WhatsApp{" "}
                  <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="trust-strip"
          aria-label="Ventajas de Atomix Solutions"
        >
          <div className="page-shell trust-inner">
            <p>
              <PackageCheck aria-hidden="true" size={17} /> Distribución
              especializada
            </p>
            <p>
              <Truck aria-hidden="true" size={17} /> Envíos a todo México
            </p>
            <p>
              <MessageCircle aria-hidden="true" size={17} /> Atención de persona
              a persona
            </p>
          </div>
        </section>

        <section className="section section-categories" id="categorias">
          <div className="page-shell">
            <div className="section-heading section-heading-split">
              <div>
                <p className="eyebrow">Catálogo / 05 familias</p>
                <h2>
                  Un catálogo pensado
                  <br />
                  para <span>cada producto.</span>
                </h2>
              </div>
              <p className="section-intro">
                Diferentes cierres, medidas y mecanismos para acompañar tus
                fórmulas desde la primera prueba hasta la producción.
              </p>
            </div>
            <div className="category-grid">
              {categories.map((category) => (
                <Link
                  className="category-card"
                  href={`/${category.slug}`}
                  key={category.slug}
                >
                  <div className="category-image">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 22vw"
                    />
                  </div>
                  <div className="category-copy">
                    <div>
                      <h3>{category.name}</h3>
                      <p>{category.tagline}</p>
                    </div>
                    <span className="category-arrow" aria-hidden="true">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="section-footer-link">
              <Link className="text-link" href="/productos">
                Ver catálogo completo{" "}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="featured-section featured-section-paper">
          <div className="page-shell">
            <div className="section-heading section-heading-split">
              <div>
                <p className="eyebrow">Referencias / Selección de temporada</p>
                <h2>
                  Cierres hechos para
                  <br />
                  <span>el uso diario.</span>
                </h2>
              </div>
              <div className="featured-aside">
                <p>
                  Conoce algunos de los productos que nuestros clientes eligen
                  para sus proyectos.
                </p>
                <Link className="text-link" href="/productos">
                  Ver todos los productos{" "}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>
            <div className="product-grid product-grid-featured">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="nosotros">
          <div className="page-shell">
            <div className="about-topline">
              <p className="eyebrow">Sobre Atomix Solutions</p>
              <span>Un socio para cada etapa</span>
            </div>
            <div className="about-layout">
              <h2>
                Cada detalle
                <br />
                <span>del envase</span>
                <br />
                cuenta.
              </h2>
              <div className="about-copy">
                <p>
                  Somos especialistas en tapas y complementos para botellas.
                  Reunimos variedad, calidad y atención cercana para resolver
                  las necesidades de envasado de cada cliente.
                </p>
                <p>
                  Trabajamos contigo para encontrar el tamaño, el acabado y el
                  mecanismo adecuado, con inventario disponible y entregas a
                  todo México.
                </p>
                <Link className="text-link" href="/nosotros">
                  Conoce más sobre nosotros{" "}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>
            <figure className="about-image">
              <div className="about-image-frame">
                <Image
                  src="/images/ui/img-nosotros-1-20261105.webp"
                  alt="Selección de cinco tapas y sistemas dosificadores Atomix"
                  fill
                  sizes="(max-width: 800px) 100vw, 1200px"
                />
              </div>
              <figcaption>
                Componentes para envasado, con atención en cada detalle.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="benefits-section">
          <div className="page-shell benefits-layout">
            <div className="benefits-heading">
              <p className="eyebrow eyebrow-light">Distribución / México</p>
              <h2>
                Lo que tu operación necesita, <span>sin complicaciones.</span>
              </h2>
              <a className={primaryActionClass} href={whatsappUrl()}>
                Hablemos de tu proyecto{" "}
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
            <div className="benefits-list">
              {benefits.map(([Icon, title, description]) => (
                <article className="benefit-item" key={title}>
                  <Icon className="benefit-icon" aria-hidden="true" size={18} />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="page-shell contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Estamos para ayudarte</p>
              <h2>
                ¿Buscas la pieza correcta para tu <span>producto?</span>
              </h2>
              <p>
                Cuéntanos qué necesitas. Nuestro equipo te orientará sobre
                opciones, medidas y disponibilidad.
              </p>
              <div className="contact-details">
                <a href={`tel:${company.phoneE164}`}>
                  <span className="detail-label">Llámanos</span>
                  <strong>{company.phoneDisplay}</strong>
                </a>
                <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer">
                  <span className="detail-label">Visítanos</span>
                  <strong>
                    {company.address.city}, {company.address.state}
                  </strong>
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        <section className="location-band">
          <div className="page-shell location-inner">
            <div>
              <p className="eyebrow eyebrow-light">Encuéntranos</p>
              <h2>
                Desde Naucalpan,
                <br />
                para todo México.
              </h2>
            </div>
            <p className="location-address">
              {company.address.street}
              <br />
              {company.address.neighborhood}, C.P. {company.address.postalCode}
              <br />
              {company.address.city}, {company.address.state}
            </p>
            <a
              className={secondaryActionClass}
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin aria-hidden="true" size={17} /> Cómo llegar{" "}
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
