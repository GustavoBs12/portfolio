import { NextResponse } from "next/server";
import { isAdmin } from "../../../lib/auth";
import { addProject, deleteProject } from "../../../lib/db";
import { link } from "../../../lib/validate";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const title = String(b.title ?? "").trim();
  const description = String(b.description ?? "").trim();
  const tags = String(b.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean).slice(0, 8).map((t) => t.slice(0, 24));
  const live_url = link(b.live_url), repo_url = link(b.repo_url), image_url = link(b.image_url);
  if (title.length < 2 || title.length > 100) return NextResponse.json({ error: "Título inválido." }, { status: 400 });
  if (description.length < 10 || description.length > 3000) return NextResponse.json({ error: "Descrição deve ter de 10 a 3000 caracteres." }, { status: 400 });
  if (live_url === undefined || repo_url === undefined || image_url === undefined)
    return NextResponse.json({ error: "Links devem começar com https:// (ou / para arquivos do site)." }, { status: 400 });
  try { await addProject({ title, description, tags, live_url, repo_url, image_url }); } catch { return NextResponse.json({ error: "Falha ao salvar no banco." }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  try { await deleteProject(id); } catch { return NextResponse.json({ error: "Falha ao apagar." }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
