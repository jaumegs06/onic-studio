-- 1. Create Storage Bucket for Project Images (if it doesn't exist)
insert into storage.buckets (id, name, public) 
values ('projects', 'projects', true)
on conflict (id) do nothing;

-- 2. Storage Policies (Safe to run multiple times, drops existing policies first to update them)
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'projects' );

drop policy if exists "Admin Upload" on storage.objects;
create policy "Admin Upload"
  on storage.objects for insert
  with check ( bucket_id = 'projects' AND (auth.role() = 'service_role' OR auth.role() = 'authenticated') );

drop policy if exists "Admin Update" on storage.objects;
create policy "Admin Update"
  on storage.objects for update
  with check ( bucket_id = 'projects' AND (auth.role() = 'service_role' OR auth.role() = 'authenticated') );

drop policy if exists "Admin Delete" on storage.objects;
create policy "Admin Delete"
  on storage.objects for delete
  using ( bucket_id = 'projects' AND (auth.role() = 'service_role' OR auth.role() = 'authenticated') );

-- 3. Ensure Table Columns Exist (Idempotent)
-- Add columns if they are missing (using a safe block)
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'location') then
    alter table projects add column location text;
  end if;

  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'year') then
    alter table projects add column year text;
  end if;

  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'materials') then
    alter table projects add column materials text;
  end if;

  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'images') then
    alter table projects add column images jsonb default '[]'::jsonb;
  end if;
end $$;
