"use client";

import { useState } from "react";

export function AboutLocationMap({ src, title }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`about-location-map${loaded ? " is-loaded" : ""}`}
      aria-busy={!loaded}
    >
      <div className="about-location-map-loading">
        <span className="about-location-map-spinner" aria-hidden="true" />
        <span className="about-location-map-loading-label" role="status">
          Cargando mapa…
        </span>
      </div>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
