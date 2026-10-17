import { NextResponse } from "next/server";
import { isAdmin } from "../../../lib/auth";
import { addPost, deletePost } from "../../../lib/db";
import { link } from "../../../lib/validate";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const title = String(b.title ?? "").trim();
  const excerpt = String(b.excerpt ?? "").trim();
  const content = String(b.content ?? "").trim().replace(/\r\n/g, "\n");
  const cover_url = link(b.cover_url);
  if (title.length < 2 || title.length > 140) return NextResponse.json({ error: "Título inválido." }, { status: 400 });
  if (excerpt.length < 10 || excerpt.length > 300) return NextResponse.json({ error: "O resumo deve ter de 10 a 300 caracteres." }, { status: 400 });
  if (content.length < 20 || content.length > 20000) return NextResponse.json({ error: "O texto deve ter de 20 a 20000 caracteres." }, { status: 400 });
  if (cover_url === undefined) return NextResponse.json({ error: "Links devem começar com https:// (ou / para arquivos do site)." }, { status: 400 });
  try { await addPost({ title, excerpt, content, cover_url }); } catch { return NextResponse.json({ error: "Falha ao salvar no banco. Você criou a tabela posts (supabase.sql)?" }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  try { await deletePost(id); } catch { return NextResponse.json({ error: "Falha ao apagar." }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
