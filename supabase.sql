-- Cole no SQL Editor do Supabase e clique em Run.
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  live_url text,
  repo_url text,
  image_url text,
  created_at timestamptz not null default now()
);
-- Segurança: com RLS ligado e sem políticas, ninguém acessa pelo navegador. Só o servidor (chave service_role).
alter table projects enable row level security;

-- Blog. Se você já tinha criado a tabela projects, rode só a partir daqui.
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text not null,
  cover_url text,
  created_at timestamptz not null default now()
);
alter table posts enable row level security;
