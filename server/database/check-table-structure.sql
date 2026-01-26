-- Query to check the actual structure of projects table
-- Run this in Supabase SQL Editor to see what columns exist and their constraints

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM 
    information_schema.columns
WHERE 
    table_name = 'projects'
ORDER BY 
    ordinal_position;
