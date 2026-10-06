"use client";

import { useEffect, useState } from "react";

type SplashPhase = "loading" | "leaving" | "hidden";

const minimumVisibleMs = 850;
const maximumVisibleMs = 10000;
const fadeOutMs = 420;

export function LoadingSplash() {
  const [phase, setPhase] = useState<SplashPhase>("loading");

  useEffect(() => {
    const startedAt = performance.now();
    const body = document.body;
    const previousOverflow = body.style.overflow;
    let finished = false;
    let finishTimer = 0;
    let removeTimer = 0;
    let maximumTimer = 0;

    body.style.overflow = "hidden";

    const dismiss = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(maximumTimer);
      const remaining = Math.max(0, minimumVisibleMs - (performance.now() - startedAt));
      finishTimer = window.setTimeout(() => {
        setPhase("leaving");
        body.style.overflow = previousOverflow;
        removeTimer = window.setTimeout(() => setPhase("hidden"), fadeOutMs);
      }, remaining);
    };

    maximumTimer = window.setTimeout(dismiss, maximumVisibleMs);
    if (document.readyState === "complete") dismiss();
    else window.addEventListener("load", dismiss, { once: true });

    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(finishTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(maximumTimer);
      body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className="loading-splash" data-phase={phase} role="status" aria-live="polite" aria-label="Carregando portfólio">
      <div className="loading-splash-content">
        <div className="loading-splash-monogram" aria-hidden="true">M<span>L.</span></div>
        <div className="loading-splash-spinner" aria-hidden="true" />
        <p>PREPARANDO O PRÓXIMO CAPÍTULO</p>
        <div className="loading-splash-progress" aria-hidden="true"><i /></div>
      </div>
    </div>
  );
}
