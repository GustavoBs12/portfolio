"use client";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "./project-card";
import type { Card } from "./lib/db";

// Carrossel com rolagem nativa (arrasta no celular) e bolinhas de página, como no layout.
export default function ProjectCarousel({ items }: { items: Card[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const step = (el: HTMLDivElement) => el.clientWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);

  useEffect(() => {
    const el = track.current!;
    const update = () => {
      const s = step(el);
      const total = Math.max(1, Math.ceil((el.scrollWidth + s - el.clientWidth) / s - 0.01));
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
      setPages(total);
      setPage(atEnd ? total - 1 : Math.round(el.scrollLeft / s));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, []);

  const go = (i: number) => {
    const el = track.current!;
    el.scrollTo({ left: Math.min(i * step(el), el.scrollWidth - el.clientWidth), behavior: "smooth" });
  };

  return (
    <>
      <div className="track" ref={track}>
        {items.map((p, i) => (<ProjectCard key={p.id || p.title} p={p} n={i + 1} />))}
      </div>
      {pages > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} type="button" aria-label={`Página ${i + 1} de projetos`} aria-current={i === page} onClick={() => go(i)} />
          ))}
        </div>
      )}
    </>
  );
}
