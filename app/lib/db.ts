// Acesso ao banco (Supabase) só pelo servidor. A chave service_role NUNCA vai para o navegador.
export type Project = {
  id: string; title: string; description: string; tags: string[];
  live_url: string | null; repo_url: string | null; image_url: string | null; created_at: string;
};
export type Card = Pick<Project, "id" | "title" | "description" | "tags" | "image_url">;

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const dbReady = Boolean(url && key);

async function rest(path: string, init: RequestInit = {}) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation", ...init.headers },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}

export async function listProjects(): Promise<Project[]> {
  if (!dbReady) return [];
  try { return await rest("projects?select=*&order=created_at.desc"); } catch { return []; }
}

export async function getProject(id: string): Promise<Project | null> {
  if (!dbReady || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  try { return (await rest(`projects?select=*&id=eq.${id}`))[0] ?? null; } catch { return null; }
}

export const addProject = (p: Omit<Project, "id" | "created_at">) =>
  rest("projects", { method: "POST", body: JSON.stringify(p) });

export const deleteProject = (id: string) => rest(`projects?id=eq.${id}`, { method: "DELETE" });

// ---- Blog ----
export type Post = {
  id: string; title: string; excerpt: string; content: string; cover_url: string | null; created_at: string;
};

export async function listPosts(): Promise<Post[]> {
  if (!dbReady) return [];
  try { return await rest("posts?select=*&order=created_at.desc"); } catch { return []; }
}

export async function getPost(id: string): Promise<Post | null> {
  if (!dbReady || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  try { return (await rest(`posts?select=*&id=eq.${id}`))[0] ?? null; } catch { return null; }
}

export const addPost = (p: Omit<Post, "id" | "created_at">) =>
  rest("posts", { method: "POST", body: JSON.stringify(p) });

export const deletePost = (id: string) => rest(`posts?id=eq.${id}`, { method: "DELETE" });
