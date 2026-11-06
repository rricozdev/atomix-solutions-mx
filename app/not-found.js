import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "../components/ui/button";
import NotFoundScene from "./components/not-found-scene";

const heading = "No encontramos esa página.";

export default function NotFound() {
  return (
    <main id="main" className="page-hero not-found">
      <NotFoundScene>
        <div className="not-found-mark" aria-hidden="true">
          <span className="not-found-digit">4</span>
          <span className="not-found-digit not-found-zero">0</span>
          <span className="not-found-digit">4</span>
          <div className="not-found-runway">
            <svg
              className="not-found-dinosaur"
              viewBox="0 0 92 62"
              role="presentation"
            >
              <path
                className="not-found-dinosaur-tail"
                d="M25 35 5 27l11 15-12 8 25-4z"
              />
              <path
                className="not-found-dinosaur-body"
                d="M20 31c0-11 9-19 21-19h10c9 0 14 6 16 15l13 3c5 1 8 5 8 10v5H27c-5 0-7-5-7-14z"
              />
              <path
                className="not-found-dinosaur-neck"
                d="M48 22V12c0-5 4-9 9-9h13c6 0 10 4 10 10v9H67l-5 8z"
              />
              <path
                className="not-found-dinosaur-snout"
                d="M72 10h10c5 0 8 4 8 8v3H72z"
              />
              <circle className="not-found-dinosaur-eye" cx="76" cy="12" r="2" />
              <path className="not-found-dinosaur-spot" d="M31 23a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm13-5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
              <path
                className="not-found-dinosaur-leg not-found-dinosaur-leg-back"
                d="M32 43v11h8l2-4"
              />
              <path
                className="not-found-dinosaur-leg not-found-dinosaur-leg-front"
                d="M59 43v11h8l2-4"
              />
            </svg>
          </div>
        </div>
        <div className="not-found-copy page-heading">
          <p className="eyebrow not-found-label">Error 404</p>
          <h1 aria-label={heading}>
            <span className="not-found-title-visual" aria-hidden="true">
              {heading.split(" ").map((word, wordIndex) => (
                <span className="not-found-title-word" key={`${word}-${wordIndex}`}>
                  {Array.from(word, (letter, letterIndex) => (
                    <span
                      className="not-found-title-letter"
                      key={`${letter}-${letterIndex}`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
          <p className="not-found-description">
            La dirección pudo haber cambiado. Vuelve al inicio o encuentra tu
            próximo componente en el catálogo.
          </p>
          <div className="not-found-actions">
            <Link
              className={buttonVariants({
                size: "lg",
                className: "button button-light",
              })}
              href="/"
            >
              <ArrowLeft aria-hidden="true" size={17} />
              Volver al inicio
            </Link>
            <Link
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "button button-outline-light",
              })}
              href="/productos"
            >
              Ver catálogo
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </NotFoundScene>
    </main>
  );
}
