"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function NotFoundScene({ children }) {
  const sceneRef = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const scene = sceneRef.current;
      if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const digits = scene.querySelectorAll(".not-found-digit");
      const label = scene.querySelector(".not-found-label");
      const letters = scene.querySelectorAll(".not-found-title-letter");
      const description = scene.querySelector(".not-found-description");
      const actions = scene.querySelectorAll(".not-found-actions a");
      const runway = scene.querySelector(".not-found-runway");
      const dinosaur = scene.querySelector(".not-found-dinosaur");
      const legs = scene.querySelectorAll(".not-found-dinosaur-leg");
      const entrance = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      entrance.fromTo(
        digits,
        { autoAlpha: 0, y: 30, scale: 0.84, rotateX: -36 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.72,
          stagger: 0.12,
          ease: "back.out(1.5)",
        },
      );
      entrance.fromTo(
        label,
        { autoAlpha: 0, x: -12 },
        { autoAlpha: 1, x: 0, duration: 0.35 },
        "-=0.36",
      );
      entrance.fromTo(
        letters,
        { autoAlpha: 0, y: 24, rotateX: -55 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 0.46,
          stagger: 0.022,
          ease: "power3.out",
        },
        "-=0.08",
      );
      entrance.fromTo(
        description,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.4 },
        "-=0.16",
      );
      entrance.fromTo(
        actions,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          stagger: 0.1,
        },
        "-=0.12",
      );

      const runCycle = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 0.18 })
        .to(dinosaur, {
          x: () => runway.clientWidth - dinosaur.getBoundingClientRect().width,
          duration: 1.9,
          ease: "sine.inOut",
        })
        .to(dinosaur, { scaleX: -1, duration: 0.12 })
        .to(dinosaur, { x: 0, duration: 1.9, ease: "sine.inOut" })
        .to(dinosaur, { scaleX: 1, duration: 0.12 });
      const legCycle = gsap.to(legs, {
        rotate: 24,
        transformOrigin: "50% 0%",
        duration: 0.14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      entrance.eventCallback("onComplete", () => runCycle.play());

      const liftAction = contextSafe((event) => {
        gsap.to(event.currentTarget, {
          y: -3,
          duration: 0.2,
          ease: "power2.out",
        });
      });
      const resetAction = contextSafe((event) => {
        gsap.to(event.currentTarget, {
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      actions.forEach((action) => {
        action.addEventListener("mouseenter", liftAction);
        action.addEventListener("mouseleave", resetAction);
        action.addEventListener("focus", liftAction);
        action.addEventListener("blur", resetAction);
      });

      return () => {
        actions.forEach((action) => {
          action.removeEventListener("mouseenter", liftAction);
          action.removeEventListener("mouseleave", resetAction);
          action.removeEventListener("focus", liftAction);
          action.removeEventListener("blur", resetAction);
        });
        runCycle.kill();
        legCycle.kill();
      };
    },
    { scope: sceneRef },
  );

  return (
    <div className="page-shell not-found-inner" ref={sceneRef}>
      {children}
    </div>
  );
}
