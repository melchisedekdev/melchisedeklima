"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  ["inicio", "Início"],
  ["origem", "Origens"],
  ["jornada", "Jornada"],
  ["formacao", "Formação"],
  ["perspectivas", "Perspectivas"],
  ["signal-title", "Presença"],
  ["notes-title", "Notas"],
  ["recomendacoes", "Recomendações"],
  ["contato", "Contato"],
] as const;

export function SectionRail() {
  const [activeId, setActiveId] = useState("inicio");
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateRotation = () => {
      frame = 0;
      railRef.current?.style.setProperty("--compass-turn", `${window.scrollY * 0.018}deg`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateRotation);
    };
    updateRotation();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const observed = sections.flatMap(([id]) => {
      const element = document.getElementById(id)?.closest("section");
      return element instanceof HTMLElement ? [{ id, element }] : [];
    });
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const current = observed.find(({ element }) => element === visible?.target);
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-38% 0px -48%", threshold: [0, 0.1, 0.4] },
    );
    observed.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className={`section-rail${activeId === "inicio" ? "" : " is-visible"}`} ref={railRef} aria-label="Progresso pelos capítulos">
      <div className="compass" aria-hidden="true">
        <div className="compass-ring">
          {Array.from({ length: 36 }, (_, index) => <i className={index % 3 === 0 ? "major" : undefined} key={index} style={{ transform: `rotate(${index * 10}deg)` }} />)}
        </div>
      </div>
      <nav className="compass-chapter-nav" aria-label="Navegar por sections">
        <ol className="compass-chapters">
          {sections.map(([id, label], index) => (
            <li className={activeId === id ? "is-active" : undefined} key={id} style={{ top: `${12 + index * 24}px` }}>
              <a href={`#${id}`} aria-current={activeId === id ? "location" : undefined}>
                <i aria-hidden="true" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{label}</b>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
