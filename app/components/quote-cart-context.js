"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProductById } from "../../data/catalog";
import {
  MAX_QUOTE_QUANTITY,
  quoteCartItemSchema,
  quoteQuantitySchema,
} from "../../lib/validation";

const STORAGE_KEY = "atomix-quote-cart";
const QuoteCartContext = createContext(null);

export function QuoteCartProvider({ children }) {
  const [storedItems, setStoredItems] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastId = useRef(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (!Array.isArray(parsed)) {
            throw new TypeError("El contenido guardado del carrito no es válido.");
          }

          const validItems = parsed.flatMap((item) => {
            const result = quoteCartItemSchema.safeParse(item);
            return result.success && getProductById(result.data.id)
              ? [result.data]
              : [];
          });
          if (validItems.length !== parsed.length) {
            console.warn(
              "Se descartaron artículos inválidos del carrito de cotización.",
            );
          }
          setStoredItems(validItems);
        }
      } catch (error) {
        console.error("No se pudo recuperar el carrito de cotización.", error);
      } finally {
        setIsReady(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
    } catch (error) {
      console.error("No se pudo guardar el carrito de cotización.", error);
    }
  }, [isReady, storedItems]);

  const items = useMemo(
    () =>
      storedItems
        .map((item) => ({ ...item, product: getProductById(item.id) }))
        .filter((item) => item.product),
    [storedItems],
  );
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const notify = useCallback((message) => {
    toastId.current += 1;
    setToast({ id: toastId.current, message });
  }, []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const dismissToast = useCallback((id) => {
    setToast((current) => (current?.id === id ? null : current));
  }, []);
  const addProduct = useCallback(
    (product) => {
      if (!getProductById(product?.id)) return;

      setStoredItems((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, MAX_QUOTE_QUANTITY),
                }
              : item,
          );
        }
        return [...current, { id: product.id, quantity: 1 }];
      });
      notify(`Agregaste ${product.name} a tu cotización.`);
    },
    [notify],
  );
  const setQuantity = useCallback((id, quantity) => {
    const result = quoteQuantitySchema.safeParse(quantity);
    if (!result.success || !getProductById(id)) return;

    setStoredItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: result.data } : item,
      ),
    );
  }, []);
  const removeProduct = useCallback(
    (id) => {
      setStoredItems((current) => current.filter((item) => item.id !== id));
      const product = getProductById(id);
      notify(
        product
          ? `Quitaste ${product.name} de la cotización.`
          : "Quitaste un producto de la cotización.",
      );
    },
    [notify],
  );
  const clearCart = useCallback(() => {
    setStoredItems([]);
    notify("Vaciaste tu selección de cotización.");
  }, [notify]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      isOpen,
      toast,
      openCart,
      closeCart,
      addProduct,
      setQuantity,
      removeProduct,
      clearCart,
      dismissToast,
    }),
    [
      isOpen,
      items,
      itemCount,
      toast,
      openCart,
      closeCart,
      addProduct,
      setQuantity,
      removeProduct,
      clearCart,
      dismissToast,
    ],
  );

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error("useQuoteCart debe usarse dentro de QuoteCartProvider.");
  }
  return context;
}
