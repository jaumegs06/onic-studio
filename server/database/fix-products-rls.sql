-- Fix RLS policies for products table to allow authenticated users to manage products

-- Drop existing policies if they exist (to be safe/updating)
DROP POLICY IF EXISTS "Authenticated users insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users update products" ON products;
DROP POLICY IF EXISTS "Authenticated users delete products" ON products;

-- Allow authenticated users to insert products
CREATE POLICY "Authenticated users insert products" ON products
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update products
CREATE POLICY "Authenticated users update products" ON products
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete products
CREATE POLICY "Authenticated users delete products" ON products
    FOR DELETE
    USING (auth.role() = 'authenticated');
