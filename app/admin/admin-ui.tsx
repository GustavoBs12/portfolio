"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post, Project } from "../lib/db";

const json = { "Content-Type": "application/json" };

export function Login() {
  const router = useRouter();
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");
    const r = await fetch("/api/admin/session", { method: "POST", headers: json, body: JSON.stringify({ password }) });
    if (r.ok) router.refresh(); else setErr((await r.json()).error ?? "Erro");
  }
  return (
    <form onSubmit={submit}>
      <input name="password" type="password" placeholder="Senha do admin" aria-label="Senha do admin" required />
      <button className="btn primary" type="submit">Entrar</button>
      <p className="err" role="status">{err}</p>
    </form>
  );
}

// Formulário + lista de um tipo de conteúdo (projetos ou posts). Os campos vêm como children.
function Manager({ title, api, items, done, children }: {
  title: string; api: string; items: { id: string; title: string }[]; done: string; children: React.ReactNode;
}) {
  const router = useRouter();
  const [msg, setMsg] = useState("");

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    setMsg("Salvando...");
    const r = await fetch(api, { method: "POST", headers: json, body: JSON.stringify(Object.fromEntries(new FormData(f))) });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error ?? "Erro");
    f.reset(); setMsg(done); router.refresh();
  }
  async function del(item: { id: string; title: string }) {
    if (!confirm(`Apagar "${item.title}"?`)) return;
    const r = await fetch(`${api}?id=${item.id}`, { method: "DELETE" });
    if (!r.ok) setMsg((await r.json()).error ?? "Erro");
    router.refresh();
  }

  return (
    <div className="adm">
      <h2>{title}</h2>
      <form onSubmit={add}>
        {children}
        <button className="btn primary" type="submit">Adicionar</button>
        <p role="status" className={msg === done ? "ok" : msg === "Salvando..." ? "" : "err"}>{msg}</p>
      </form>
      <ul className="adm-list">
        {items.map((p) => (
          <li key={p.id}><span>{p.title}</span><button className="btn" onClick={() => del(p)}>Apagar</button></li>
        ))}
        {items.length === 0 && <li><span>Nada cadastrado ainda.</span></li>}
      </ul>
    </div>
  );
}

export function Panel({ projects, posts }: { projects: Project[]; posts: Post[] }) {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }

  return (
    <>
      <Manager title="Projetos" api="/api/admin/projects" items={projects} done="Projeto adicionado.">
        <input name="title" placeholder="Título do projeto" aria-label="Título" required maxLength={100} />
        <textarea name="description" rows={5} placeholder="Descrição (o que é, o que você fez, resultado)" aria-label="Descrição" required minLength={10} maxLength={3000} />
        <input name="tags" placeholder="Tecnologias separadas por vírgula (Next.js, React)" aria-label="Tecnologias" />
        <input name="live_url" placeholder="Link do site no ar (https://...)" aria-label="Link do site" />
        <input name="repo_url" placeholder="Link do GitHub (https://...)" aria-label="Link do GitHub" />
        <input name="image_url" placeholder="Link de uma imagem de capa (https://...)" aria-label="Imagem de capa" />
      </Manager>

      <Manager title="Posts do blog" api="/api/admin/posts" items={posts} done="Post publicado.">
        <input name="title" placeholder="Título do post" aria-label="Título do post" required maxLength={140} />
        <input name="excerpt" placeholder="Resumo (aparece no cartão do blog)" aria-label="Resumo" required minLength={10} maxLength={300} />
        <textarea name="content" rows={12} placeholder={"Texto do post.\n\nDeixe uma linha em branco entre parágrafos.\n## Assim vira um subtítulo"} aria-label="Texto do post" required minLength={20} maxLength={20000} />
        <input name="cover_url" placeholder="Link de uma imagem de capa (https://...)" aria-label="Imagem de capa do post" />
      </Manager>

      <button className="btn" onClick={logout} style={{ marginTop: 32 }}>Sair</button>
    </>
  );
}
