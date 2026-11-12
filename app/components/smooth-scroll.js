"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const baseOptions = {
  lerp: 0.07,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  anchors: true,
  stopInertiaOnNavigate: true,
  autoRaf: false,
  respectReducedMotion: true,
};

// En pantallas táctiles dejamos que el sistema maneje la inercia nativa.
// Suavizar el touch con JS obliga a recalcular en cada frame y se siente
// pesado en móviles de gama baja/media.
function getLenisOptions() {
  const isCoarsePointer = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;

  if (!isCoarsePointer) {
    return {
      ...baseOptions,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchMultiplier: 1.2,
      touchInertiaExponent: 1.4,
    };
  }

  return {
    ...baseOptions,
    syncTouch: false,
    smoothWheel: false,
  };
}

export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis(getLenisOptions());
    lenisRef.current = lenis;
    window.lenis = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
      if (window.lenis === lenis) delete window.lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return undefined;

    lenis.scrollTo(0, { immediate: true, force: true });

    const frame = window.requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
