"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const revealGroups = [
  ".trust-inner",
  ".category-grid",
  ".product-grid",
  ".about-values",
  ".benefits-list",
  ".contact-details",
];

const layoutGroups = [
  ".contact-layout",
  ".about-location-layout",
  ".category-detail",
  ".product-detail",
  ".benefits-layout",
  ".location-inner",
];

const imageFrames = [
  ".about-image",
  ".category-detail-image",
  ".product-detail-image",
];

export default function GsapAnimations({ children }) {
  const scope = useRef(null);
  const pathname = usePathname();
  const [readyPath, setReadyPath] = useState(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReadyPath(pathname));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useGSAP(
    (context, contextSafe) => {
      if (readyPath !== pathname) return;

      let initialized = new WeakSet();
      let observer;
      let firstFrame = 0;
      let secondFrame = 0;
      let animationTimer = 0;
      let skipVisibleTargets = false;

      const isInViewport = (element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < window.innerHeight;
      };

      const animatePage = contextSafe(() => {
        const root = scope.current;
        if (!root) return false;

        let changed = false;
        const markInitialized = (element) => {
          if (initialized.has(element)) return false;
          initialized.add(element);
          changed = true;
          return true;
        };
        const scrollTrigger = (trigger, start = "top 86%") => ({
          trigger,
          start,
          toggleActions: "play none none reverse",
        });
        const addParallax = (trigger, image, start = "top bottom") => {
          gsap.to(image, {
            yPercent: 2,
            ease: "none",
            scrollTrigger: {
              ...scrollTrigger(trigger, start),
              end: "bottom top",
              scrub: true,
            },
          });
        };

        root.querySelectorAll(".hero").forEach((hero) => {
          if (!markInitialized(hero)) return;
          const image = hero.querySelector(".hero-image");
          if (skipVisibleTargets && isInViewport(hero)) {
            if (image) {
              gsap.fromTo(
                image,
                { scale: 1.025 },
                { scale: 1, duration: 1.4, ease: "power2.out" },
              );
              addParallax(hero, image, "top top");
            }
            return;
          }

          const eyebrow = hero.querySelector(".eyebrow");
          const heading = hero.querySelector("h1");
          const description = hero.querySelector(".hero-description");
          const actions = hero.querySelectorAll(".hero-actions > *");
          const entrance = gsap.timeline({
            defaults: { ease: "power2.out" },
          });

          if (eyebrow) {
            entrance.fromTo(
              eyebrow,
              { autoAlpha: 0, x: -12 },
              { autoAlpha: 1, x: 0, duration: 0.55 },
              0,
            );
          }
          if (heading) {
            entrance.fromTo(
              heading,
              { autoAlpha: 0, y: 16, clipPath: "inset(0 0 100% 0)" },
              {
                autoAlpha: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
                duration: 0.8,
              },
              0.12,
            );
          }
          if (description) {
            entrance.fromTo(
              description,
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.55 },
              0.38,
            );
          }
          if (actions.length) {
            entrance.fromTo(
              actions,
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1 },
              0.52,
            );
          }
          if (image) {
            entrance.fromTo(
              image,
              { scale: 1.035 },
              { scale: 1, duration: 1.5, ease: "power2.out" },
              0,
            );
            addParallax(hero, image, "top top");
          }
        });

        root.querySelectorAll("main h1, main h2").forEach((heading) => {
          if (heading.closest(".hero") || !markInitialized(heading)) return;
          if (skipVisibleTargets && isInViewport(heading)) return;

          gsap.fromTo(
            heading,
            { autoAlpha: 0, y: 14, clipPath: "inset(0 0 100% 0)" },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.72,
              ease: "power2.out",
              scrollTrigger: scrollTrigger(heading, "top 88%"),
            },
          );
        });

        revealGroups.forEach((selector) => {
          root.querySelectorAll(selector).forEach((group) => {
            if (!group.children.length || !markInitialized(group)) return;
            const targets = Array.from(group.children).filter(
              (child) => !skipVisibleTargets || !isInViewport(child),
            );
            if (!targets.length) return;

            gsap.fromTo(
              targets,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.62,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: scrollTrigger(group),
              },
            );
          });
        });

        layoutGroups.forEach((selector) => {
          root.querySelectorAll(selector).forEach((group) => {
            const targets = Array.from(group.children).filter(
              (child) =>
                !child.matches(imageFrames.join(",")) &&
                !child.matches(revealGroups.join(",")) &&
                !child.querySelector(imageFrames.join(",")) &&
                (!skipVisibleTargets || !isInViewport(child)),
            );
            if (!targets.length || !markInitialized(group)) return;

            gsap.fromTo(
              targets,
              { autoAlpha: 0, y: 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: scrollTrigger(group),
              },
            );
          });
        });

        imageFrames.forEach((selector) => {
          root.querySelectorAll(selector).forEach((frame) => {
            if (!markInitialized(frame)) return;
            if (skipVisibleTargets && isInViewport(frame)) return;

            gsap.fromTo(
              frame,
              { autoAlpha: 0, clipPath: "inset(0 0 0 8%)" },
              {
                autoAlpha: 1,
                clipPath: "inset(0 0 0 0%)",
                duration: 0.85,
                ease: "power2.out",
                scrollTrigger: scrollTrigger(frame),
              },
            );

            const image = frame.querySelector("img");
            if (image) addParallax(frame, image);
          });
        });

        return changed;
      });

      const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      const cancelScheduledAnimations = () => {
        window.clearTimeout(animationTimer);
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
        animationTimer = 0;
        firstFrame = 0;
        secondFrame = 0;
      };
      const runAnimations = () => {
        firstFrame = 0;
        secondFrame = 0;
        if (animatePage()) ScrollTrigger.refresh();
      };
      const scheduleAnimations = (delay = 0) => {
        cancelScheduledAnimations();
        animationTimer = window.setTimeout(() => {
          firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(runAnimations);
          });
        }, delay);
      };
      const startAnimations = (delay = 0, skipVisible = delay > 0) => {
        initialized = new WeakSet();
        skipVisibleTargets = skipVisible;
        scheduleAnimations(delay);
        observer = new MutationObserver(() => scheduleAnimations(1000));
        if (scope.current) {
          observer.observe(scope.current, { childList: true, subtree: true });
        }
      };

      if (!motionPreference.matches) {
        startAnimations(2500, true);
      }

      const handleMotionPreference = (event) => {
        if (event.matches) {
          observer?.disconnect();
          cancelScheduledAnimations();
          context.revert();
        } else {
          startAnimations(2500, true);
        }
      };
      motionPreference.addEventListener("change", handleMotionPreference);

      return () => {
        observer?.disconnect();
        cancelScheduledAnimations();
        motionPreference.removeEventListener("change", handleMotionPreference);
      };
    },
    {
      scope,
      dependencies: [pathname, readyPath],
      revertOnUpdate: true,
    },
  );

  return <div ref={scope}>{children}</div>;
}
