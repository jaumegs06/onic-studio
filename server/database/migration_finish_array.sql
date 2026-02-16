-- Migration: Change product finish to array
ALTER TABLE products 
ALTER COLUMN finish TYPE text[] 
USING regexp_split_to_array(finish, ','); -- Split existing comma-separated strings if any, or just wrap in array if single value
