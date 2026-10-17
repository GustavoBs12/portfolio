import type { Metadata } from "next";
import { isAdmin } from "../lib/auth";
import { listProjects, listPosts, dbReady } from "../lib/db";
import { Login, Panel } from "./admin-ui";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Admin() {
  const ok = await isAdmin();
  return (
    <div className="wrap sub">
      <a className="back" href="/">← Voltar ao site</a>
      <h1 className="page-title">Painel admin</h1>
      {!ok ? <Login /> : !dbReady ? <p className="err">Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.</p> : <Panel projects={await listProjects()} posts={await listPosts()} />}
    </div>
  );
}
