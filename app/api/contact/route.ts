import { NextResponse } from "next/server";

// Limite simples por IP: 3 envios a cada 10 minutos (fica na memória do servidor).
const hits = new Map<string, number[]>();

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 3) {
    return NextResponse.json({ error: "Muitas tentativas. Tente novamente em alguns minutos." }, { status: 429 });
  }
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // Campo "site" é uma armadilha para robôs: pessoas não veem nem preenchem.
  if (body.site) return NextResponse.json({ ok: true });

  const nome = String(body.nome ?? "").trim().replace(/[\r\n]+/g, " ");
  const email = String(body.email ?? "").trim();
  const mensagem = String(body.mensagem ?? "").trim();

  if (nome.length < 2 || nome.length > 80) return NextResponse.json({ error: "Informe seu nome." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120)
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  if (mensagem.length < 10 || mensagem.length > 2000)
    return NextResponse.json({ error: "A mensagem deve ter entre 10 e 2000 caracteres." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "Envio não configurado no servidor." }, { status: 500 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Portfólio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Novo contato do portfólio: ${nome}`,
      html: `<p><b>Nome:</b> ${esc(nome)}</p><p><b>E-mail:</b> ${esc(email)}</p><p>${esc(mensagem).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "Não foi possível enviar agora. Tente de novo." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
