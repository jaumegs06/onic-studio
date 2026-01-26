-- =====================================================
-- FIX COMPLETO PARA TABLA PRODUCTS
-- =====================================================
-- Este script arregla las políticas RLS y asegura acceso público a productos

-- 1. Eliminar políticas existentes que puedan estar causando conflictos
DROP POLICY IF EXISTS "Public products read access" ON products;
DROP POLICY IF EXISTS "Allow public read products" ON products;
DROP POLICY IF EXISTS "Service role all access" ON products;

-- 2. Crear política para acceso público de lectura (CRÍTICO para que la web funcione)
CREATE POLICY "products_public_read" ON products
    FOR SELECT 
    USING (true);

-- 3. Crear política para service role (permite todas las operaciones desde el backend)
CREATE POLICY "products_service_role_all" ON products
    FOR ALL
    USING (
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
        OR auth.jwt() ->> 'role' = 'service_role'
    )
    WITH CHECK (
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
        OR auth.jwt() ->> 'role' = 'service_role'
    );

-- 4. Verificar que RLS esté habilitado en la tabla
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
