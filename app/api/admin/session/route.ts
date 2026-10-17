import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { makeToken } from "../../../lib/auth";

const tries = new Map<string, number[]>();
const h = (s: string) => createHash("sha256").update(s).digest();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const recent = (tries.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
  tries.set(ip, [...recent, now]);

  const body = await req.json().catch(() => ({}));
  const real = process.env.ADMIN_PASSWORD;
  if (!real || !process.env.ADMIN_SESSION_SECRET) return NextResponse.json({ error: "Admin não configurado." }, { status: 500 });
  if (!timingSafeEqual(h(String(body.password ?? "")), h(real))) return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", makeToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 7 * 24 * 3600 });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin");
  return res;
}
