// Só aceita links http(s): bloqueia "javascript:" e similares. undefined = inválido, null = vazio.
// Caminhos do próprio site (ex.: "/capa.png", arquivos em public/) também valem.
export const link = (v: unknown) => {
  const s = String(v ?? "").trim();
  if (!s) return null;
  if (/^\/[^/\\]/.test(s)) return s;
  try { return ["http:", "https:"].includes(new URL(s).protocol) ? s : undefined; } catch { return undefined; }
};
