"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";
import { SITE } from "./site";

const links = [
  ["Início", "/"],
  ["Sobre", "/#sobre"],
  ["Skills", "/#skills"],
  ["Projetos", "/#projetos"],
  ["Blog", "/blog"],
  ["Contato", "/#contato"],
] as const;

export default function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const current = (href: string) =>
    href === "/" ? path === "/" : href === "/blog" ? path.startsWith("/blog") : href === "/#projetos" && path.startsWith("/projetos");

  return (
    <header className="nav">
      <div className="wrap">
        <a className="logo" href="/"><Icon name="code" size={26} />{SITE.name}</a>
        <nav aria-label="Principal">
          <button className="menu-btn" type="button" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen(!open)}>
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
          <ul id="menu" className={open ? "links open" : "links"} onClick={() => setOpen(false)}>
            {links.map(([t, h]) => (
              <li key={h}><a href={h} aria-current={current(h) ? "page" : undefined}>{t}</a></li>
            ))}
            <li className="hire-m"><a className="btn primary sm" href="/#contato">Contratar</a></li>
          </ul>
        </nav>
        <a className="btn primary sm hire" href="/#contato">Contratar <Icon name="arrow" /></a>
      </div>
    </header>
  );
}
