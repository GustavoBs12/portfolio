import { notFound } from "next/navigation";
import { getProject } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await getProject((await params).id);
  if (!p) notFound();
  return (
    <div className="wrap sub">
      <a className="back" href="/projetos">← Todos os projetos</a>
      <h1 className="page-title">{p.title}</h1>
      {p.image_url && <img className="cover" src={p.image_url} alt={`Capa do projeto ${p.title}`} />}
      <p className="lead" style={{ whiteSpace: "pre-line", marginTop: 20 }}>{p.description}</p>
      <div className="tags">{p.tags.map((t) => (<span className="tag" key={t}>{t}</span>))}</div>
      <div className="btns" style={{ marginTop: 28 }}>
        {p.live_url && <a className="btn primary" href={p.live_url} target="_blank" rel="noopener noreferrer">Ver site</a>}
        {p.repo_url && <a className="btn" href={p.repo_url} target="_blank" rel="noopener noreferrer">Ver código</a>}
      </div>
    </div>
  );
}
