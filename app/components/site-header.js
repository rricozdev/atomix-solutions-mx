"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, ShoppingCart, X } from "lucide-react";
import { categories } from "../../data/catalog";
import { company, navLinks } from "../../data/site";
import { buttonVariants } from "../../components/ui/button";
import { useQuoteCart } from "./quote-cart-context";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SiteHeader() {
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const animateMobileMenu = useRef(null);
  const closeMobileMenu = useRef(null);
  const mobileMenuTimeline = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useQuoteCart();
  const pathname = usePathname();
  const isProductLocation =
    pathname === "/productos" ||
    pathname.startsWith("/producto/") ||
    categories.some((category) => pathname === `/${category.slug}`);
  const activeHref = isProductLocation
    ? "/productos"
    : navLinks.find((item) => item.href === pathname)?.href;
  const activeLink = navLinks.find((item) => item.href === activeHref);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 24,
        end: "max",
        toggleClass: {
          targets: headerRef.current,
          className: "is-scrolled",
        },
      });
    },
    { scope: headerRef },
  );

  useGSAP(
    (_, contextSafe) => {
      animateMobileMenu.current = contextSafe(() => {
        const menu = mobileMenuRef.current;
        const panel = menu?.querySelector("nav");
        if (!menu?.open || !panel) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const links = panel.querySelectorAll("a");
        const timeline = gsap.timeline({
          onReverseComplete: () => {
            gsap.set([panel, ...links], { clearProps: "all" });
            menu.open = false;
          },
        });
        mobileMenuTimeline.current = timeline;

        timeline.fromTo(
          panel,
          { clipPath: "inset(0 0 100%)", autoAlpha: 0, y: -8 },
          {
            clipPath: "inset(0 0 0%)",
            autoAlpha: 1,
            y: 0,
            duration: 0.36,
            ease: "power3.out",
          },
        );
        timeline.fromTo(
          links,
          { autoAlpha: 0, y: -6 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.22,
            stagger: 0.045,
            ease: "power2.out",
          },
          "-=0.2",
        );
      });

      closeMobileMenu.current = contextSafe(() => {
        const menu = mobileMenuRef.current;
        const panel = menu?.querySelector("nav");
        if (!menu?.open || !panel) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.set([panel, ...panel.querySelectorAll("a")], { clearProps: "all" });
          menu.open = false;
          return;
        }

        const timeline = mobileMenuTimeline.current;
        if (!timeline || timeline.progress() === 0) {
          gsap.set([panel, ...panel.querySelectorAll("a")], { clearProps: "all" });
          menu.open = false;
          return;
        }

        timeline.reverse();
      });
    },
    { scope: headerRef },
  );

  return (
    <>
      <div className="utility-bar">
        <div className="page-shell utility-inner">
          <p>Soluciones de envasado para negocios que avanzan.</p>
          <a href={`tel:${company.phoneE164}`}>{company.phoneDisplay}</a>
        </div>
      </div>
      <header className="site-header" ref={headerRef}>
        <div className="nav-wrap">
          <div className="page-shell nav-inner">
            <Link className="brand-link" href="/" aria-label="Atomix Solutions, inicio">
              <Image
                src="/images/brand/logo-atomix.png"
                alt="Atomix Solutions"
                width={220}
                height={90}
                priority
              />
            </Link>
            <nav className="desktop-nav" aria-label="Navegación principal">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    activeHref === item.href
                      ? pathname === item.href
                        ? "page"
                        : "location"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <span className="mobile-current-page" aria-hidden="true">
              {activeLink?.label}
            </span>
            <button
              className={buttonVariants({
                size: "lg",
                className: "nav-cta nav-cart-trigger",
              })}
              type="button"
              onClick={openCart}
              aria-label={`Abrir carrito de cotización, ${itemCount} ${
                itemCount === 1 ? "artículo" : "artículos"
              }`}
            >
              <ShoppingCart aria-hidden="true" size={17} />
              <span className="nav-cart-label">Cotizar</span>
              {itemCount > 0 && (
                <span className="nav-cart-count" aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </button>
            <details
              className="mobile-menu"
              ref={mobileMenuRef}
              onClick={(event) => {
                if (event.target.closest("summary") && mobileMenuRef.current?.open) {
                  event.preventDefault();
                  closeMobileMenu.current?.();
                }
              }}
              onToggle={() => {
                const isOpen = mobileMenuRef.current?.open ?? false;
                setIsMobileMenuOpen(isOpen);
                if (isOpen) animateMobileMenu.current?.();
              }}
            >
              <summary
                aria-label={
                  isMobileMenuOpen
                    ? "Cerrar menú de navegación"
                    : "Abrir menú de navegación"
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                <Menu className="mobile-menu-open-icon" aria-hidden="true" />
                <X className="mobile-menu-close-icon" aria-hidden="true" />
              </summary>
              <nav id="mobile-navigation" aria-label="Navegación móvil">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={
                      activeHref === item.href
                        ? pathname === item.href
                          ? "page"
                          : "location"
                        : undefined
                    }
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  className="mobile-menu-cart"
                  type="button"
                  onClick={() => {
                    openCart();
                    closeMobileMenu.current?.();
                  }}
                >
                  Carrito de cotización <ShoppingCart aria-hidden="true" size={17} />
                </button>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
