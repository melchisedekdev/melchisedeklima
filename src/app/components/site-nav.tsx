"use client";

import { useState } from "react";
import { LuBookOpen, LuBriefcase, LuMail, LuMenu, LuRadio, LuX } from "react-icons/lu";

const items = [
  { label: "História", href: "#origem", Icon: LuBookOpen },
  { label: "Trajetória", href: "#jornada", Icon: LuBriefcase },
  { label: "Presença", href: "#sinal", Icon: LuRadio },
  { label: "Contato", href: "#contato", Icon: LuMail },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Navegação principal">
      <a className="monogram" href="#inicio" aria-label="Início" onClick={() => setOpen(false)}>
        ML<span>.</span>
      </a>
      <div id="site-nav-links" className={`nav-items${open ? " is-open" : ""}`}>
        {items.map(({ label, href, Icon }) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            <Icon className="nav-item-icon" aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </div>
      <button
        className="nav-toggle"
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="site-nav-links"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
      </button>
    </nav>
  );
}
