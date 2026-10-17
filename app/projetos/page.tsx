import type { Metadata } from "next";
import { listProjects } from "../lib/db";
import ProjectCard from "../project-card";

export const metadata: Metadata = { title: "Projetos" };
export const dynamic = "force-dynamic";

export default async function Projetos() {
  const list = await listProjects();
  return (
    <div className="wrap sub">
      <a className="back" href="/">← Voltar ao site</a>
      <h1 className="page-title">Projetos</h1>
      <div className="pgrid">
        {list.map((p, i) => (<ProjectCard key={p.id} p={p} n={i + 1} />))}
      </div>
      {list.length === 0 && <p className="lead">Os projetos aparecem aqui assim que forem adicionados.</p>}
    </div>
  );
}
