import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost } from "../../lib/db";
import { fmtDate } from "../../lib/format";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPost((await params).id);
  return p ? { title: p.title, description: p.excerpt } : { title: "Post não encontrado" };
}

export default async function PostPage({ params }: Props) {
  const p = await getPost((await params).id);
  if (!p) notFound();
  // Linha em branco separa parágrafos; "## " no começo vira subtítulo.
  const blocks = p.content.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <article className="wrap sub">
      <a className="back" href="/blog">← Todos os posts</a>
      <h1 className="page-title">{p.title}</h1>
      <time className="post-meta" dateTime={p.created_at}>{fmtDate(p.created_at)}</time>
      {p.cover_url && <img className="cover" src={p.cover_url} alt="" />}
      <div className="prose">
        {blocks.map((b, i) => (b.startsWith("## ") ? <h2 key={i}>{b.slice(3)}</h2> : <p key={i}>{b}</p>))}
      </div>
    </article>
  );
}
