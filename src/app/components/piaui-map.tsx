"use client";

import { useEffect, useRef } from "react";

export function PiauiMap() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    void import("brazil-map").then(async () => {
      if (!active || !mountRef.current) return;

      const map = document.createElement("brazil-component");
      map.setAttribute("hidden-states", "");
      map.setAttribute("static", "");
      map.setAttribute("aria-label", "Mapa do Brasil com o Piauí em destaque");
      mountRef.current.replaceChildren(map);

      const highlightPiaui = () => {
        if (!active) return;
        const piaui = map.shadowRoot?.querySelector<SVGPathElement>("#BR-PI");
        if (!piaui) return;

        piaui.style.setProperty("fill", "#7653a7", "important");
        piaui.style.setProperty("stroke", "#4b2f72", "important");
      };

      window.setTimeout(highlightPiaui, 0);
      window.setTimeout(highlightPiaui, 120);
    });

    return () => {
      active = false;
    };
  }, []);

  return <div ref={mountRef} className="piaui-map" aria-hidden="true" />;
}
