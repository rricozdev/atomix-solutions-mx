import { categories, products } from "../../data/catalog";
import { createPageMetadata } from "../../data/seo";
import ProductCatalog from "../components/product-catalog";

export const metadata = createPageMetadata({
  title: "Catálogo de productos",
  description:
    "Explora tapas Disktop y FlipTop, atomizadores, triggers y bombas dosificadoras para tus envases.",
  path: "/productos",
});

export default function ProductsPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-shell page-heading">
          <p className="eyebrow">Catálogo Atomix</p>
          <h1>Encuentra el componente ideal para <span>tu producto.</span></h1>
          <p>
            Explora nuestro catálogo de soluciones para envasado. Cada categoría
            reúne distintas opciones de medidas, acabados y mecanismos.
          </p>
        </div>
      </section>
      <section className="catalog-section">
        <div className="page-shell">
          <ProductCatalog categories={categories} products={products} />
        </div>
      </section>
    </main>
  );
}
