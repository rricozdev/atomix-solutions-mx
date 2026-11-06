import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "../components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="page-hero not-found">
      <div className="page-shell page-heading">
        <p className="eyebrow">Error 404</p>
        <h1>No encontramos esa página.</h1>
        <p>Puede que el enlace haya cambiado. Explora el catálogo para encontrar lo que buscas.</p>
        <Link
          className={buttonVariants({
            size: "lg",
            className: "button button-light",
          })}
          href="/productos"
        >
          Ir al catálogo <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </main>
  );
}
