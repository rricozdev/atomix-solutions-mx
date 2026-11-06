import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import {
  getCategory,
  getProduct,
  getRelated,
  products,
} from "../../../data/catalog";
import ProductCard from "../../components/product-card";
import { whatsappUrl } from "../../../data/site";
import { buttonVariants } from "../../../components/ui/button";
import VoxelCubeLoader from "../../components/voxel-cube-loader";
import AddToQuoteButton from "../../components/add-to-quote-button";
import { createPageMetadata } from "../../../data/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return createPageMetadata({
    title: product.name,
    description: product.description,
    path: `/producto/${slug}`,
    image: product.image,
  });
}

export default function ProductPage({ params }) {
  return (
    <Suspense
      fallback={
        <main id="main">
          <VoxelCubeLoader label="Cargando producto" />
        </main>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const category = getCategory(product.category);
  const relatedProducts = getRelated(product, 4);
  const details = product.specs.filter((spec) => spec.label !== "Color");
  const message = `¡Hola! Me interesa recibir información sobre ${product.name}.`;

  return (
    <main id="main">
      <section className="page-shell product-detail">
        <div className="product-detail-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 650px) 100vw, 50vw"
          />
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">
            <Link href={`/${category.slug}`}>{category.name}</Link>
          </p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <dl className="spec-list">
            <div>
              <dt>Medida / rosca</dt>
              <dd>{product.neck}</dd>
            </div>
            {details.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          {product.colors.length > 0 && (
            <div className="product-colors">
              <span className="detail-label">Colores disponibles</span>
              <p>{product.colors.join(" · ")}</p>
            </div>
          )}
          <div className="detail-actions">
            <AddToQuoteButton product={product} />
            <a
              className={buttonVariants({
                size: "lg",
                className: "button button-dark",
              })}
              href={whatsappUrl(message)}
              target="_blank"
              rel="noreferrer"
            >
              Consultar este producto <ArrowUpRight aria-hidden="true" size={17} />
            </a>
            <Link
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "button button-outline",
              })}
              href="/productos"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </section>
      {relatedProducts.length > 0 && (
        <section className="featured-section">
          <div className="page-shell">
            <div className="catalog-category-heading">
              <h2>Más de {category.short}</h2>
              <Link className="text-link text-link-light" href={`/${category.slug}`}>
                Ver categoría <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <div className="product-grid">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
