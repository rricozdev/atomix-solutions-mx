"use client";

import { Check, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuoteCart } from "./quote-cart-context";

export default function AddToQuoteButton({ product }) {
  const { addProduct } = useQuoteCart();
  const [added, setAdded] = useState(false);
  const resetTimer = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(resetTimer.current);
    },
    [],
  );

  return (
    <button
      className="quote-add-button"
      type="button"
      onClick={() => {
        addProduct(product);
        setAdded(true);
        window.clearTimeout(resetTimer.current);
        resetTimer.current = window.setTimeout(() => setAdded(false), 1400);
      }}
      aria-label={
        added
          ? `${product.name} agregado a la cotización`
          : `Agregar ${product.name} a la cotización`
      }
    >
      {added ? (
        <Check aria-hidden="true" size={16} />
      ) : (
        <Plus aria-hidden="true" size={16} />
      )}
      <span>{added ? "Agregado" : "Agregar a cotización"}</span>
    </button>
  );
}
