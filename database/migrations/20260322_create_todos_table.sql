-- Create the tasks table
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  completed boolean default false not null,
  metadata text,
  created_at timestamptz default now() not null,
  user_id uuid references auth.users(id) on delete cascade
);

-- Set up Row Level Security (RLS)
alter table public.todos enable row level security;

-- Create policies
-- Policy to allow users to see only their own tasks
create policy "Users can view their own tasks"
  on public.todos for select
  using (auth.uid() = user_id);

-- Policy to allow users to insert their own tasks
create policy "Users can insert their own tasks"
  on public.todos for insert
  with check (auth.uid() = user_id);

-- Policy to allow users to update their own tasks
create policy "Users can update their own tasks"
  on public.todos for update
  using (auth.uid() = user_id);

-- Policy to allow users to delete their own tasks
create policy "Users can delete their own tasks"
  on public.todos for delete
  using (auth.uid() = user_id);
