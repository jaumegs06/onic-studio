-- Fix primary key sequence for products table
-- This sets the sequence to the maximum existing ID, so the next insert will be MAX + 1
SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 0) FROM products) + 1);
