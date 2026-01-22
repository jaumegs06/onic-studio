-- Migration to update projects table with new schema for admin management
-- Run this in Supabase SQL Editor

-- Add new columns to projects table (all nullable initially)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS location VARCHAR(255),
ADD COLUMN IF NOT EXISTS year VARCHAR(10),
ADD COLUMN IF NOT EXISTS materials TEXT,
ADD COLUMN IF NOT EXISTS thumbnail TEXT,
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Migrate existing data if 'image' column exists
-- Use it as thumbnail for existing projects
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'projects' AND column_name = 'image') THEN
        -- Copy image to thumbnail
        UPDATE projects SET thumbnail = image WHERE thumbnail IS NULL OR thumbnail = '';
        -- Set default location for existing projects
        UPDATE projects SET location = 'Mallorca' WHERE location IS NULL OR location = '';
    END IF;
END $$;

-- NOTE: Do not set NOT NULL constraints yet
-- Run the data migration script first (node server/scripts/migrate-projects.js)
-- Then you can manually set NOT NULL if needed

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_location ON projects(location);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- Create trigger for updated_at if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_updated_at') THEN
        CREATE TRIGGER update_projects_updated_at
            BEFORE UPDATE ON projects
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Grant permissions (if needed)
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY; -- Already enabled in schema
