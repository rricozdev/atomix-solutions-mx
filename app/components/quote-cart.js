"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import {
  ArrowUpRight,
  Check,
  Minus,
  PackageOpen,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import gsap from "gsap";
import { whatsappUrl } from "../../data/site";
import { useQuoteCart } from "./quote-cart-context";

function getQuoteMessage(items) {
  const productLines = items.map(({ product, quantity }, index) => {
    const specifications = [
      `Medida / rosca: ${product.neck}`,
      ...product.specs.map(({ label, value }) => `${label}: ${value}`),
    ];

    return [
      `${index + 1}. ${product.name}`,
      ...specifications.map((specification) => `   ${specification}`),
      `   Cantidad solicitada: ${quantity}`,
    ].join("\n");
  });

  return `¡Hola! Me gustaría cotizar estos productos:\n\n${productLines.join("\n\n")}`;
}

function QuoteCartToast({ toast, dismissToast }) {
  const toastRef = useRef(null);

  useEffect(() => {
    const element = toastRef.current;
    if (!element) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reducedMotion ? 0 : 0.24;
    const enter = gsap.fromTo(
      element,
      { autoAlpha: 0, y: -10 },
      { autoAlpha: 1, y: 0, duration, ease: "power2.out" },
    );
    const timeout = window.setTimeout(() => {
      gsap.to(element, {
        autoAlpha: 0,
        y: -8,
        duration: reducedMotion ? 0 : 0.18,
        onComplete: () => dismissToast(toast.id),
      });
    }, 3200);

    return () => {
      window.clearTimeout(timeout);
      enter.kill();
      gsap.killTweensOf(element);
    };
  }, [dismissToast, toast.id]);

  return (
    <div
      className="quote-cart-toast"
      ref={toastRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <Check aria-hidden="true" size={18} />
      <span>{toast.message}</span>
      <button
        type="button"
        aria-label="Cerrar aviso"
        onClick={() => dismissToast(toast.id)}
      >
        <X aria-hidden="true" size={16} />
      </button>
    </div>
  );
}

export default function QuoteCart() {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const {
    items,
    isOpen,
    toast,
    closeCart,
    setQuantity,
    removeProduct,
    clearCart,
    dismissToast,
  } = useQuoteCart();

  const message = useMemo(() => getQuoteMessage(items), [items]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!dialog || !panel || !backdrop) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reducedMotion ? 0 : undefined;
    let timeline;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      timeline = gsap.timeline();
      timeline.fromTo(
        backdrop,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: duration ?? 0.28, ease: "power2.out" },
        0,
      );
      timeline.fromTo(
        panel,
        { xPercent: 100 },
        {
          xPercent: 0,
          duration: duration ?? 0.42,
          ease: "power3.out",
        },
        0,
      );
    } else if (dialog.open) {
      timeline = gsap.timeline({
        onComplete: () => {
          dialog.close();
          gsap.set([panel, backdrop], { clearProps: "all" });
        },
      });
      timeline.to(
        backdrop,
        { autoAlpha: 0, duration: duration ?? 0.22, ease: "power2.in" },
        0,
      );
      timeline.to(
        panel,
        {
          xPercent: 100,
          duration: duration ?? 0.32,
          ease: "power2.in",
        },
        0,
      );
    }

    return () => timeline?.kill();
  }, [isOpen]);

  return (
    <>
      <dialog
        className="quote-cart-dialog"
        ref={dialogRef}
        aria-labelledby="quote-cart-title"
        onClose={closeCart}
        onCancel={(event) => {
          event.preventDefault();
          closeCart();
        }}
      >
        <div
          className="quote-cart-backdrop"
          ref={backdropRef}
          aria-hidden="true"
          onClick={closeCart}
        />
        <div className="quote-cart-panel" ref={panelRef}>
          <header className="quote-cart-header">
            <div>
              <p className="eyebrow">Tu selección</p>
              <h2 id="quote-cart-title">Carrito de cotización</h2>
            </div>
            <button
              className="quote-cart-close"
              type="button"
              onClick={closeCart}
              aria-label="Cerrar carrito de cotización"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </header>

          {items.length > 0 ? (
            <>
              <div className="quote-cart-items">
                {items.map(({ product, quantity }) => (
                  <article className="quote-cart-item" key={product.id}>
                    <div className="quote-cart-image">
                      <Image src={product.image} alt="" fill sizes="76px" />
                    </div>
                    <div className="quote-cart-item-copy">
                      <h3>{product.name}</h3>
                      <p>
                        {product.neck}
                        {product.piecesPerBox
                          ? ` · ${product.piecesPerBox.toLocaleString("es-MX")} pzas/caja`
                          : ""}
                      </p>
                      <div className="quote-cart-item-controls">
                        <div
                          className="quote-quantity-control"
                          aria-label={`Cantidad de ${product.name}`}
                        >
                          <button
                            type="button"
                            aria-label={`Reducir cantidad de ${product.name}`}
                            disabled={quantity <= 1}
                            onClick={() => setQuantity(product.id, quantity - 1)}
                          >
                            <Minus aria-hidden="true" size={14} />
                          </button>
                          <span aria-live="polite">{quantity}</span>
                          <button
                            type="button"
                            aria-label={`Aumentar cantidad de ${product.name}`}
                            onClick={() => setQuantity(product.id, quantity + 1)}
                          >
                            <Plus aria-hidden="true" size={14} />
                          </button>
                        </div>
                        <button
                          className="quote-cart-remove"
                          type="button"
                          aria-label={`Quitar ${product.name} de la cotización`}
                          onClick={() => removeProduct(product.id)}
                        >
                          <Trash2 aria-hidden="true" size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <footer className="quote-cart-footer">
                <button
                  className="quote-cart-clear"
                  type="button"
                  onClick={clearCart}
                >
                  Vaciar selección
                </button>
                <a
                  className="quote-cart-submit"
                  href={whatsappUrl(message)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Cotizar por WhatsApp
                  <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              </footer>
            </>
          ) : (
            <div className="quote-cart-empty">
              <PackageOpen aria-hidden="true" size={34} />
              <h3>Aún no agregas productos</h3>
              <p>
                Explora el catálogo y guarda aquí los productos que quieras
                cotizar.
              </p>
              <button type="button" onClick={closeCart}>
                Seguir explorando
              </button>
            </div>
          )}
        </div>
        {toast && isOpen && (
          <QuoteCartToast
            key={toast.id}
            toast={toast}
            dismissToast={dismissToast}
          />
        )}
      </dialog>
      {toast && !isOpen && (
        <QuoteCartToast
          key={toast.id}
          toast={toast}
          dismissToast={dismissToast}
        />
      )}
    </>
  );
}
