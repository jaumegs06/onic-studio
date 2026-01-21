-- FORCE RESET SCRIPT
-- WARNING: This will delete ALL existing projects and re-insert the default ones.

-- 1. Reset Table Data
TRUNCATE TABLE projects RESTART IDENTITY CASCADE;

-- 2. Ensure 'is_featured' column exists
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- 3. Reset Policies (Security Rules)
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON projects;

-- 4. Create Correct Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON projects FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON projects FOR DELETE USING (true);

-- 5. Insert Default Projects (Featured)
INSERT INTO projects (title, category, location, year, materials, image, images, description, is_featured)
VALUES 
(
  'Hotel Meliá Beach',
  'Hoteles',
  'Mallorca',
  '2024',
  'Techlam, Quarzo',
  '/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8806.jpg',
  '[
    "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8806.jpg",
    "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8811.jpg",
    "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8820.jpg",
    "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8821.jpg",
    "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8827.jpg",
    "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8845 ret.jpg",
    "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8861 ret.jpg",
    "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8868 ret.jpg"
  ]'::jsonb,
  'Renovación integral de espacios del hotel con materiales de alta gama. El proyecto incluye la reforma completa de baños con Techlam y la instalación de una nueva barra de bar en Quarzo, combinando funcionalidad y diseño premium.',
  true
),
(
  'Hotel Katmandu',
  'Restauración',
  'Mallorca',
  '2024',
  'Granito Negro Zimbabwe',
  '/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8961.jpg',
  '[
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8961.jpg",
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8965.jpg",
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8971.jpg",
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8976.jpg",
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8977.jpg",
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8982.jpg",
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8995.jpg",
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8997.jpg",
    "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_9006.jpg"
  ]'::jsonb,
  'Diseño y ejecución de buffet en granito Negro Zimbabwe. Un espacio gastronómico que destaca por la elegancia atemporal de la piedra natural, su resistencia y acabado impecable.',
  true
),
(
  'Apartamentos Cala Major',
  'Residencial',
  'Mallorca',
  '2024',
  'Techlam',
  '/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg',
  '[
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8593.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8596.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8598.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8603.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8611.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8624.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8626.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8632.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8637.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8639.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8641.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8657.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8662.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8664.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8665.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8669.jpg",
    "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8671.jpg"
  ]'::jsonb,
  'Reforma integral de apartamentos con material Techlam en cocinas, baños y espacios comunes. Un proyecto residencial que apuesta por la innovación, calidad en cada detalle y durabilidad.',
  true
);

-- Update constraint just in case
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'projects_category_check' AND table_name = 'projects'
    ) THEN
        ALTER TABLE projects DROP CONSTRAINT projects_category_check;
        ALTER TABLE projects ADD CONSTRAINT projects_category_check 
        CHECK (category IN ('Hoteles', 'Restauración', 'Residencial'));
    END IF;
END $$;
