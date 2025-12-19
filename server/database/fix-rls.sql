-- Fix RLS policies for contact_messages to allow Service Role Key access

-- Drop existing policies
DROP POLICY IF EXISTS "Public contact messages insert" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated contact messages read" ON contact_messages;

-- Allow anyone to insert contact messages (public form)
CREATE POLICY "Allow public insert" ON contact_messages
    FOR INSERT 
    WITH CHECK (true);

-- Allow service role to read all messages (for backend API)
CREATE POLICY "Allow service role read" ON contact_messages
    FOR SELECT
    USING (true);

-- Optionally: Also allow authenticated users to read
CREATE POLICY "Allow authenticated read" ON contact_messages
    FOR SELECT
    USING (auth.role() = 'authenticated' OR auth.jwt() ->> 'role' = 'service_role');
