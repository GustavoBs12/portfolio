import type { Metadata } from "next";
import { Icon } from "../icons";
import { listPosts } from "../lib/db";
import { fmtDate } from "../lib/format";

export const metadata: Metadata = { title: "Blog", description: "Artigos sobre desenvolvimento web, sites e sistemas." };
export const dynamic = "force-dynamic";

export default async function Blog() {
  const posts = await listPosts();
  return (
    <div className="wrap sub">
      <span className="eyebrow">Blog</span>
      <h1 className="page-title">O que ando escrevendo</h1>
      <p className="lead">Dicas e bastidores sobre sites, sistemas e desenvolvimento web.</p>
      <div className="pgrid">
        {posts.map((p) => (
          <a className="pcard" key={p.id} href={`/blog/${p.id}`}>
            <div className="pcard-img">
              {p.cover_url ? <img src={p.cover_url} alt="" loading="lazy" /> : <div className="pcard-ph" aria-hidden="true"><Icon name="book" /></div>}
            </div>
            <div className="pcard-body">
              <time className="post-meta" dateTime={p.created_at}>{fmtDate(p.created_at)}</time>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="pcard-link">Ler post <Icon name="arrow" size={14} /></span>
            </div>
          </a>
        ))}
      </div>
      {posts.length === 0 && <p className="lead">Os primeiros posts estão chegando. Volte em breve.</p>}
    </div>
  );
}
