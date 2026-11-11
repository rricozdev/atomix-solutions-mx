"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./product-card";

const PAGE_SIZE = 12;

export default function ProductCatalog({ categories, products }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(
    () =>
      activeCategory === "all"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory, products],
  );
  const pageCount = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const pageProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const currentCategory = categories.find(
    (category) => category.slug === activeCategory,
  );

  function chooseCategory(category) {
    setActiveCategory(category);
    setPage(1);
  }

  function changePage(nextPage) {
    setPage(nextPage);
    const browser = document.querySelector(".catalog-browser");
    if (!browser) return;

    if (window.lenis) {
      window.lenis.scrollTo(browser);
      return;
    }

    browser.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="catalog-browser">
      <div className="catalog-layout">
        <aside className="catalog-sidebar" aria-label="Filtros de productos">
          <h2 className="catalog-sidebar-title">Categorías</h2>
          <nav className="catalog-filters" aria-label="Filtrar productos por categoría">
            <button
              className="catalog-filter"
              type="button"
              aria-pressed={activeCategory === "all"}
              onClick={() => chooseCategory("all")}
            >
              Todos
              <span>{products.length}</span>
            </button>
            {categories.map((category) => {
              const count = products.filter(
                (product) => product.category === category.slug,
              ).length;

              return (
                <button
                  className="catalog-filter"
                  key={category.slug}
                  type="button"
                  aria-pressed={activeCategory === category.slug}
                  onClick={() => chooseCategory(category.slug)}
                >
                  {category.short}
                  <span>{count}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="catalog-results">
          <div className="catalog-results-heading" aria-live="polite">
            <div>
              <h2>{currentCategory?.name || "Todos los productos"}</h2>
              <p>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "opción disponible" : "opciones disponibles"}
              </p>
            </div>
            {pageCount > 1 && (
              <span className="catalog-page-indicator">
                Página {page} de {pageCount}
              </span>
            )}
          </div>

          {pageProducts.length > 0 ? (
            <div className="product-grid catalog-product-grid">
              {pageProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="catalog-empty">No hay productos en esta categoría.</p>
          )}

          {pageCount > 1 && (
            <nav className="catalog-pagination" aria-label="Paginación del catálogo">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
              >
                <ArrowLeft aria-hidden="true" size={16} />
                Anterior
              </button>
              <div className="catalog-page-numbers" aria-label="Seleccionar página">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      aria-label={`Página ${pageNumber}`}
                      aria-current={pageNumber === page ? "page" : undefined}
                      onClick={() => changePage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
              </div>
              <button
                type="button"
                disabled={page === pageCount}
                onClick={() => changePage(page + 1)}
              >
                Siguiente
                <ArrowRight aria-hidden="true" size={16} />
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
