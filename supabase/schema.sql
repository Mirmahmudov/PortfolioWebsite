-- ============================================================
-- Portfolio CMS — Supabase schema
-- SQL Editor da bir marta ishga tushiring (Run)
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- PROFIL (bitta qator — sayt haqida)
-- ------------------------------------------------------------
create table if not exists public.site_profile (
  id int primary key default 1 check (id = 1),
  full_name text default 'Asadbek Mirmahmudov',
  phone text,
  email text,
  telegram text,
  linkedin text,
  github text,
  website text,
  city_uz text,
  city_ru text,
  city_en text,
  degree_uz text,
  degree_ru text,
  degree_en text,
  freelance_uz text,
  freelance_ru text,
  freelance_en text,
  home_bio_uz text,
  home_bio_ru text,
  home_bio_en text,
  about_p1_uz text,
  about_p1_ru text,
  about_p1_en text,
  about_p2_uz text,
  about_p2_ru text,
  about_p2_en text,
  role_uz text default 'Frontend dasturchi',
  role_ru text default 'Frontend-разработчик',
  role_en text default 'Frontend Developer',
  birthday date,
  updated_at timestamptz default now()
);

insert into public.site_profile (id, phone, email, telegram, linkedin, github, website,
  city_uz, city_ru, city_en, degree_uz, degree_ru, degree_en,
  freelance_uz, freelance_ru, freelance_en, birthday)
values (
  1,
  '+998 91 344 44 68',
  'asadbekmirmahmudov3@gmail.com',
  'https://t.me/MirmahmudovAsadbek',
  'https://www.linkedin.com/in/asadbek-mirmahmudov-744b94282/',
  'https://github.com/Mirmahmudov',
  'https://bekportfoliosite.netlify.app/',
  'Chust, Namangan',
  'Чуст, Наманган',
  'Chust, Namangan',
  'Bakalavr — Kompyuter injiniringi',
  'Бакалавр — Компьютерная инженерия',
  'Bachelor''s — Computer Engineering',
  'Mavjud',
  'Доступен',
  'Available',
  '2003-09-23'
)
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- PORTFOLIO LOYIHALAR
-- ------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  sort_order int not null default 0,
  title_uz text not null default '',
  title_ru text not null default '',
  title_en text not null default '',
  desc_uz text not null default '',
  desc_ru text not null default '',
  desc_en text not null default '',
  tech text[] not null default '{}',
  image_url text,
  github_url text,
  live_url text,
  is_private boolean not null default false,
  is_featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_sort_idx on public.projects (sort_order asc, created_at desc);

-- ------------------------------------------------------------
-- BLOG
-- ------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  sort_order int not null default 0,
  tag_uz text default '',
  tag_ru text default '',
  tag_en text default '',
  title_uz text not null default '',
  title_ru text not null default '',
  title_en text not null default '',
  excerpt_uz text not null default '',
  excerpt_ru text not null default '',
  excerpt_en text not null default '',
  body_uz text not null default '',
  body_ru text not null default '',
  body_en text not null default '',
  published_at date default current_date,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_sort_idx on public.blog_posts (published_at desc, sort_order asc);

-- ------------------------------------------------------------
-- updated_at trigger
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

drop trigger if exists site_profile_updated_at on public.site_profile;
create trigger site_profile_updated_at
  before update on public.site_profile
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------
alter table public.site_profile enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;

-- Public read
drop policy if exists "Public read profile" on public.site_profile;
create policy "Public read profile"
  on public.site_profile for select
  using (true);

drop policy if exists "Public read published projects" on public.projects;
create policy "Public read published projects"
  on public.projects for select
  using (published = true);

drop policy if exists "Public read published posts" on public.blog_posts;
create policy "Public read published posts"
  on public.blog_posts for select
  using (published = true);

-- Authenticated admin (birinchi Auth user = admin)
drop policy if exists "Auth manage profile" on public.site_profile;
create policy "Auth manage profile"
  on public.site_profile for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Auth manage projects" on public.projects;
create policy "Auth manage projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Auth manage posts" on public.blog_posts;
create policy "Auth manage posts"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- Auth user o'z projects ni draft (unpublished) ko'ra olishi
drop policy if exists "Auth read all projects" on public.projects;
create policy "Auth read all projects"
  on public.projects for select
  to authenticated
  using (true);

drop policy if exists "Auth read all posts" on public.blog_posts;
create policy "Auth read all posts"
  on public.blog_posts for select
  to authenticated
  using (true);

-- ------------------------------------------------------------
-- STORAGE
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

-- Public read images
drop policy if exists "Public read portfolio images" on storage.objects;
create policy "Public read portfolio images"
  on storage.objects for select
  using (bucket_id = 'portfolio');

-- Auth upload
drop policy if exists "Auth upload portfolio images" on storage.objects;
create policy "Auth upload portfolio images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio');

drop policy if exists "Auth update portfolio images" on storage.objects;
create policy "Auth update portfolio images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio');

drop policy if exists "Auth delete portfolio images" on storage.objects;
create policy "Auth delete portfolio images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio');
