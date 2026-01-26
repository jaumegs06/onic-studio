-- =====================================================
-- SEED DE DATOS PARA PRODUCTOS
-- =====================================================
-- Este script puebla la tabla products con los materiales iniciales

-- Limpiar datos existentes (opcional, comentar si quieres mantener datos)
-- TRUNCATE TABLE products RESTART IDENTITY CASCADE;

-- Insertar productos si no existen
INSERT INTO products (name, category, color, finish, image, best_seller) VALUES
    ('Granito Negro Zimbabwe', 'Granito', 'Negro', 'Apomazado', '/images/products/NEGRO ZIMBAWE - GRAANITO.jpg', true),
    ('Mármol Blanco Ibiza', 'Mármol', 'Blanco', 'Pulido', '/images/products/BLANCO IBIZA MARMOL .jpg', true),
    ('Cuarcita Taj Mahal', 'Cuarcita', 'Beige', 'Pulido', '/images/products/BLUE ROMA - CUARCITA .jpg', false),
    ('Caliza Capri', 'Caliza', 'Beige', 'Apomazado', '/images/products/CALIZA CAPRI.jpg', false),
    ('Mármol Travertino', 'Mármol', 'Beige', 'Bruto', '/images/products/TRAVERINO ROJO - MARMOL .jpg', true),
    ('Granito Azul Noche', 'Granito', 'Azul', 'Pulido', '/images/products/AZUL NOCHE - GRANITO.jpg', false),
    ('Granito Alaska', 'Granito', 'Blanco', 'Pulido', '/images/products/ALASKA - GRANITO .jpg', false),
    ('Mármol Rojo Alicante', 'Mármol', 'Rojo', 'Pulido', '/images/products/ROJO ALICANTE - MARMOL .jpg', false),
    ('Mármol Negro Marquina', 'Mármol', 'Negro', 'Pulido', '/images/products/NEGRO MARQUINA - MARMOL .jpg', true)
ON CONFLICT (id) DO NOTHING;

-- Verificar que se insertaron los datos
SELECT COUNT(*) as total_products FROM products;
