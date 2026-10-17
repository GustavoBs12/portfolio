import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

// Sessão = "validade.assinatura". A assinatura (HMAC) só é gerada por quem tem ADMIN_SESSION_SECRET.
const sign = (v: string) => createHmac("sha256", process.env.ADMIN_SESSION_SECRET ?? "").update(v).digest("hex");

export function makeToken() {
  const exp = String(Date.now() + 7 * 24 * 3600 * 1000);
  return `${exp}.${sign(exp)}`;
}

export async function isAdmin() {
  if (!process.env.ADMIN_SESSION_SECRET) return false;
  const t = (await cookies()).get("admin")?.value;
  const [exp, sig] = (t ?? "").split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}
