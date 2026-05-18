create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('dispatcher', 'driver', 'merchant')),
  display_name text not null,
  contact_name text,
  merchant_id text,
  driver_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function private.set_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  merchant_name text;
begin
  merchant_name := nullif(trim(new.raw_user_meta_data->>'merchant_name'), '');

  insert into public.profiles (
    id,
    role,
    display_name,
    contact_name,
    merchant_id
  )
  values (
    new.id,
    'merchant',
    coalesce(merchant_name, split_part(new.email, '@', 1), 'Merchant'),
    nullif(trim(new.raw_user_meta_data->>'contact_name'), ''),
    'M-' || substring(replace(new.id::text, '-', ''), 1, 8)
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function private.handle_new_user();
