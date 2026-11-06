"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const layers = [-1, 0, 1];
const coordinates = [-1, 0, 1];
const faceNames = ["front", "right", "back", "left", "top", "bottom"];
const tones = ["teal", "navy", "leaf"];

function getTone(x, y, z) {
  return tones[(x + y + z + 6) % tones.length];
}

function getDrift(x, y, z) {
  const seed = (x + 2) * 9 + (y + 2) * 3 + z + 2;
  return {
    x: ((seed % 3) - 1) * 3,
    y: (((seed + 1) % 3) - 1) * 3,
    z: (((seed + 2) % 3) - 1) * 4,
  };
}

export default function VoxelCubeLoader({ label }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rotor = scope.current?.querySelector(".voxel-loader__rotor");
      const modules = gsap.utils.toArray(".voxel-loader__module", scope.current);

      if (!rotor || !modules.length) return;

      gsap.fromTo(
        rotor,
        { rotationX: -24, rotationY: 28 },
        {
          rotationX: 336,
          rotationY: 388,
          duration: 16,
          ease: "none",
          repeat: -1,
        },
      );

      const assembly = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.45,
        defaults: { ease: "power2.inOut" },
      });

      assembly
        .to(
          modules,
          {
            x: (_, module) =>
              Number(module.dataset.x) * 15 +
              Number(module.dataset.driftX),
            y: (_, module) =>
              Number(module.dataset.y) * 15 +
              Number(module.dataset.driftY),
            z: (_, module) =>
              Number(module.dataset.z) * 15 +
              Number(module.dataset.driftZ),
            scale: 0.92,
            duration: 1.35,
            stagger: { each: 0.018, from: "center" },
          },
          0.55,
        )
        .to(
          modules,
          {
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            duration: 1.2,
            stagger: { each: 0.014, from: "edges" },
          },
          2.5,
        );
    },
    { scope },
  );

  return (
    <section
      className="voxel-loader"
      ref={scope}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="voxel-loader__scene" aria-hidden="true">
        <div className="voxel-loader__glow" />
        <div className="voxel-loader__rotor">
          {layers.map((z) => (
            <div className="voxel-loader__layer" key={z} data-layer={z}>
              {coordinates.flatMap((y) =>
                coordinates.map((x) => {
                  const drift = getDrift(x, y, z);

                  return (
                    <div
                      className="voxel-loader__cell"
                      key={`${x}-${y}-${z}`}
                    >
                      <div
                        className={`voxel-loader__module voxel-loader__module--${getTone(x, y, z)}`}
                        data-x={x}
                        data-y={y}
                        data-z={z}
                        data-drift-x={drift.x}
                        data-drift-y={drift.y}
                        data-drift-z={drift.z}
                      >
                        {faceNames.map((face) => (
                          <span
                            className={`voxel-loader__face voxel-loader__face--${face}`}
                            key={face}
                          />
                        ))}
                      </div>
                    </div>
                  );
                }),
              )}
            </div>
          ))}
        </div>
      </div>
      <span className="voxel-loader__label">{label}</span>
    </section>
  );
}
