
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact','demo','trial','partner','newsletter')),
  name text,
  email text not null,
  phone text,
  company text,
  message text,
  payload jsonb,
  locale text default 'en',
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
-- Anyone can insert leads (public forms); no select for anonymous.
create policy "anyone can insert leads" on public.leads for insert with check (true);
