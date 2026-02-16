-- 1. Reset: Drop existing table if exists
DROP TABLE IF EXISTS public.contact_messages;

-- 2. Create Table
CREATE TABLE public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies

-- Policy: Allow anyone (anon) to INSERT messages
CREATE POLICY "Allow Public Insert" 
ON public.contact_messages 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Policy: Allow only authenticated users (Admin) and Service Role to VIEW messages
CREATE POLICY "Allow Admin View" 
ON public.contact_messages 
FOR SELECT 
TO authenticated, service_role 
USING (true);

-- 5. (Optional but recommended) Grant usage to anon if needed specifically
GRANT INSERT ON public.contact_messages TO anon;
GRANT INSERT ON public.contact_messages TO authenticated;
GRANT SELECT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
