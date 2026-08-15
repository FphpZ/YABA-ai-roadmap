create extension if not exists "uuid-ossp";

-- =====================================================
-- PROFILS UTILISATEURS
-- =====================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  locale text not null default 'fr',
  goal text,
  xp integer not null default 0,
  level integer not null default 0,
  created_at timestamptz not null default now()
);

-- =====================================================
-- MONDES / TERRITOIRES
-- =====================================================

create table if not exists public.worlds (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  color text,
  emoji text,
  prerequisites text[] not null default '{}',
  position jsonb,
  created_at timestamptz not null default now()
);

-- =====================================================
-- PROGRESSION DES MONDES
-- =====================================================

create table if not exists public.user_world_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  world_id uuid not null references public.worlds(id) on delete cascade,
  unlocked boolean not null default false,
  completed boolean not null default false,
  progress integer not null default 0,
  unlocked_at timestamptz,
  completed_at timestamptz,
  unique(user_id, world_id)
);

-- =====================================================
-- MISSIONS
-- =====================================================

create table if not exists public.missions (
  id uuid primary key default uuid_generate_v4(),
  world_id uuid not null references public.worlds(id) on delete cascade,
  title text not null,
  brief text,
  initial_prompt text,
  xp_reward integer not null default 100,
  criteria jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- =====================================================
-- TENTATIVES DE MISSIONS
-- =====================================================

create table if not exists public.mission_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mission_id uuid not null references public.missions(id) on delete cascade,
  submission text not null,
  score numeric check (score >= 0 and score <= 100),
  feedback jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- =====================================================
-- OUTILS IA
-- =====================================================

create table if not exists public.tools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  description text,
  level text,
  url text,
  alternatives text[] not null default '{}',
  prompts text[] not null default '{}',
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- =====================================================
-- BIBLIOTHÈQUE
-- =====================================================

create table if not exists public.library_resources (
  id uuid primary key default uuid_generate_v4(),
  type text not null,
  title text not null,
  url text,
  description text,
  tags text[] not null default '{}',
  locale text not null default 'fr',
  created_at timestamptz not null default now()
);

-- =====================================================
-- PROJETS
-- =====================================================

create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  level text not null,
  title text not null,
  description text,
  objectives text[] not null default '{}',
  xp_reward integer not null default 100,
  created_at timestamptz not null default now()
);

-- =====================================================
-- SOUMISSIONS DE PROJETS
-- =====================================================

create table if not exists public.project_submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  repo_url text,
  demo_url text,
  status text not null default 'draft',
  review text,
  score numeric,
  created_at timestamptz not null default now()
);

-- =====================================================
-- BADGES
-- =====================================================

create table if not exists public.badges (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  title text not null,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

-- =====================================================
-- BADGES UTILISATEURS
-- =====================================================

create table if not exists public.user_badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamptz not null default now(),
  unique(user_id, badge_id)
);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

alter table public.profiles enable row level security;
alter table public.worlds enable row level security;
alter table public.user_world_progress enable row level security;
alter table public.missions enable row level security;
alter table public.mission_attempts enable row level security;
alter table public.tools enable row level security;
alter table public.library_resources enable row level security;
alter table public.projects enable row level security;
alter table public.project_submissions enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

-- Profiles

create policy "Users can read own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

-- Public content

create policy "Public can read worlds"
on public.worlds
for select
using (true);

create policy "Public can read missions"
on public.missions
for select
using (true);

create policy "Public can read tools"
on public.tools
for select
using (true);

create policy "Public can read library resources"
on public.library_resources
for select
using (true);

create policy "Public can read projects"
on public.projects
for select
using (true);

create policy "Public can read badges"
on public.badges
for select
using (true);

-- User progression

create policy "Users can read own world progress"
on public.user_world_progress
for select
using (auth.uid() = user_id);

create policy "Users can insert own world progress"
on public.user_world_progress
for insert
with check (auth.uid() = user_id);

create policy "Users can update own world progress"
on public.user_world_progress
for update
using (auth.uid() = user_id);

-- Mission attempts

create policy "Users can read own mission attempts"
on public.mission_attempts
for select
using (auth.uid() = user_id);

create policy "Users can insert own mission attempts"
on public.mission_attempts
for insert
with check (auth.uid() = user_id);

-- Project submissions

create policy "Users can read own project submissions"
on public.project_submissions
for select
using (auth.uid() = user_id);

create policy "Users can insert own project submissions"
on public.project_submissions
for insert
with check (auth.uid() = user_id);

create policy "Users can update own project submissions"
on public.project_submissions
for update
using (auth.uid() = user_id);

-- User badges

create policy "Users can read own badges"
on public.user_badges
for select
using (auth.uid() = user_id);

create policy "Users can insert own badges"
on public.user_badges
for insert
with check (auth.uid() = user_id);