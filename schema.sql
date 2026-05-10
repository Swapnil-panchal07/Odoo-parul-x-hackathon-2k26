-- Traveloop Supabase Database Schema

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Linked to Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  language text default 'en',
  currency text default 'USD',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Trips Table
create table public.trips (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  destination text,
  start_date date,
  end_date date,
  travelers integer default 1,
  budget_target numeric,
  travel_type text default 'leisure',
  description text,
  cover_image text,
  is_public boolean default false,
  status text default 'Planning',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.trips enable row level security;
create policy "Users can view own trips" on public.trips for select using (auth.uid() = user_id);
create policy "Users can view public trips" on public.trips for select using (is_public = true);
create policy "Users can insert own trips" on public.trips for insert with check (auth.uid() = user_id);
create policy "Users can update own trips" on public.trips for update using (auth.uid() = user_id);
create policy "Users can delete own trips" on public.trips for delete using (auth.uid() = user_id);

-- 3. Stops Table
create table public.stops (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references public.trips on delete cascade not null,
  city text not null,
  country text,
  dates text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.stops enable row level security;
create policy "Users can view stops for viewable trips" on public.stops for select using (
  exists (select 1 from public.trips where id = stops.trip_id and (user_id = auth.uid() or is_public = true))
);
create policy "Users can manage stops for own trips" on public.stops for all using (
  exists (select 1 from public.trips where id = stops.trip_id and user_id = auth.uid())
);

-- 4. Activities Table
create table public.activities (
  id uuid default uuid_generate_v4() primary key,
  stop_id uuid references public.stops on delete cascade not null,
  title text not null,
  type text default 'Other',
  time text,
  cost text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.activities enable row level security;
create policy "Users can view activities for viewable stops" on public.activities for select using (
  exists (
    select 1 from public.stops s 
    join public.trips t on t.id = s.trip_id 
    where s.id = activities.stop_id and (t.user_id = auth.uid() or t.is_public = true)
  )
);
create policy "Users can manage activities for own stops" on public.activities for all using (
  exists (
    select 1 from public.stops s 
    join public.trips t on t.id = s.trip_id 
    where s.id = activities.stop_id and t.user_id = auth.uid()
  )
);

-- 5. Expenses Table
create table public.expenses (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references public.trips on delete cascade not null,
  title text not null,
  category text not null,
  amount numeric not null,
  date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.expenses enable row level security;
create policy "Users can view own expenses" on public.expenses for select using (
  exists (select 1 from public.trips where id = expenses.trip_id and user_id = auth.uid())
);
create policy "Users can manage own expenses" on public.expenses for all using (
  exists (select 1 from public.trips where id = expenses.trip_id and user_id = auth.uid())
);

-- 6. Packing Items Table
create table public.packing_items (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references public.trips on delete cascade not null,
  text text not null,
  category text not null,
  packed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.packing_items enable row level security;
create policy "Users can view own packing items" on public.packing_items for select using (
  exists (select 1 from public.trips where id = packing_items.trip_id and user_id = auth.uid())
);
create policy "Users can manage own packing items" on public.packing_items for all using (
  exists (select 1 from public.trips where id = packing_items.trip_id and user_id = auth.uid())
);

-- 7. Trip Notes Table
create table public.trip_notes (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references public.trips on delete cascade not null,
  title text,
  content text,
  location text,
  color text default 'bg-white',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.trip_notes enable row level security;
create policy "Users can view own notes" on public.trip_notes for select using (
  exists (select 1 from public.trips where id = trip_notes.trip_id and user_id = auth.uid())
);
create policy "Users can manage own notes" on public.trip_notes for all using (
  exists (select 1 from public.trips where id = trip_notes.trip_id and user_id = auth.uid())
);
