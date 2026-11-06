import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "../../components/ui/badge";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "../../data/catalog";
import ProductCard from "../components/product-card";
import { whatsappUrl } from "../../data/site";
import { buttonVariants } from "../../components/ui/button";
import VoxelCubeLoader from "../components/voxel-cube-loader";
import { createPageMetadata } from "../../data/seo";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return createPageMetadata({
    title: category.name,
    description: category.description,
    path: `/${slug}`,
    image: category.image,
  });
}

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <main id="main">
          <VoxelCubeLoader label="Cargando categoría" />
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-shell page-heading">
          <p className="eyebrow">Catálogo Atomix · {category.short}</p>
          <h1>{category.tagline}<span>.</span></h1>
          <p>{category.description}</p>
        </div>
      </section>
      <section className="page-shell category-detail">
        <div className="category-detail-image">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 650px) 100vw, 45vw"
            priority
          />
        </div>
        <div className="category-detail-copy">
          <p className="eyebrow">Elige según tu aplicación</p>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
          <div className="tag-list" aria-label="Aplicaciones recomendadas">
            {category.uses.map((use) => (
              <Badge key={use} variant="outline">
                {use}
              </Badge>
            ))}
          </div>
          <p className="detail-size-note">
            Medidas disponibles: {category.sizes.join(" · ")}
          </p>
          <a
            className={buttonVariants({
              size: "lg",
              className: "button button-dark",
            })}
            href={whatsappUrl(`¡Hola! Me interesa conocer opciones de ${category.name}.`)}
            target="_blank"
            rel="noreferrer"
          >
            Consultar por WhatsApp <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>
      </section>
      <section className="catalog-section">
        <div className="page-shell">
          <div className="catalog-category-heading">
            <h2>Opciones disponibles</h2>
            <p>{categoryProducts.length} productos</p>
          </div>
          <div className="product-grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
