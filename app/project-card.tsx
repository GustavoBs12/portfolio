import { Icon } from "./icons";
import type { Card } from "./lib/db";

// Cartão de projeto usado na home (carrossel) e em /projetos. Exemplos sem id não viram link.
export default function ProjectCard({ p, n }: { p: Card; n: number }) {
  const desc = p.description.length > 120 ? `${p.description.slice(0, 120)}...` : p.description;
  const body = (
    <>
      <div className="pcard-img">
        <span className="pcard-n">{String(n).padStart(2, "0")}</span>
        {p.image_url ? <img src={p.image_url} alt="" loading="lazy" /> : <div className="pcard-ph" aria-hidden="true"><Icon name="code" /></div>}
      </div>
      <div className="pcard-body">
        <h3>{p.title}</h3>
        <p>{desc}</p>
        {p.tags.length > 0 && <div className="tags">{p.tags.map((t) => (<span className="tag" key={t}>{t}</span>))}</div>}
        {p.id && <span className="pcard-link">Ver projeto <Icon name="arrow" size={14} /></span>}
      </div>
    </>
  );
  return p.id ? <a className="pcard" href={`/projetos/${p.id}`}>{body}</a> : <article className="pcard">{body}</article>;
}
