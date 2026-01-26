-- =====================================================
-- FIX: Actualizar nombres de productos para que coincidan con proyectos
-- =====================================================

-- 1. Corregir "Granito Negro Zimbawe" a "Granito Negro Zimbabwe" (agregar 'h')
UPDATE products 
SET name = 'Granito Negro Zimbabwe'
WHERE name LIKE '%Zimbawe%';

-- 2. Agregar productos faltantes: Techlam y Quarzo
INSERT INTO products (name, category, color, finish, image, best_seller) VALUES
    ('Techlam', 'Porcelánico', 'Varios', 'Mate', '/images/products/techlam-placeholder.jpg', true),
    ('Quarzo', 'Cuarzo', 'Varios', 'Pulido', '/images/products/quarzo-placeholder.jpg', true)
ON CONFLICT (name) DO NOTHING;

-- Verificar cambios
SELECT id, name, category FROM products 
WHERE name IN ('Granito Negro Zimbabwe', 'Techlam', 'Quarzo')
ORDER BY name;
