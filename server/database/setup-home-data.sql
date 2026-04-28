-- Create home_data table if it doesn't exist
CREATE TABLE IF NOT EXISTS home_data (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE home_data ENABLE ROW LEVEL SECURITY;

-- Allow anyone to READ (public slider images)
DROP POLICY IF EXISTS "Public can read home_data" ON home_data;
CREATE POLICY "Public can read home_data"
    ON home_data FOR SELECT
    USING (true);

-- Allow authenticated users (admin) to INSERT/UPDATE
DROP POLICY IF EXISTS "Authenticated users can manage home_data" ON home_data;
CREATE POLICY "Authenticated users can manage home_data"
    ON home_data FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
