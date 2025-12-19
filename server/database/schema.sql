-- Onic Studio Database Schema
-- Created for Supabase migration

-- Enable UUID extension for generating IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster username lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    finish VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    best_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for filtering and searching products
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_color ON products(color);
CREATE INDEX IF NOT EXISTS idx_products_finish ON products(finish);
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(best_seller);

-- =====================================================
-- CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    project_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    email_sent BOOLEAN DEFAULT FALSE
);

-- Index for timestamp queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_timestamp ON contact_messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email_sent ON contact_messages(email_sent);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- =====================================================
-- SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- HOME DATA TABLE (Key-Value Store)
-- =====================================================
CREATE TABLE IF NOT EXISTS home_data (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for key lookups
CREATE INDEX IF NOT EXISTS idx_home_data_key ON home_data(key);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_data ENABLE ROW LEVEL SECURITY;

-- Public read access for products (anyone can view)
CREATE POLICY "Public products read access" ON products
    FOR SELECT USING (true);

-- Public read access for projects
CREATE POLICY "Public projects read access" ON projects
    FOR SELECT USING (true);

-- Public read access for services
CREATE POLICY "Public services read access" ON services
    FOR SELECT USING (true);

-- Public read access for home_data
CREATE POLICY "Public home_data read access" ON home_data
    FOR SELECT USING (true);

-- Only authenticated users can read users table
CREATE POLICY "Authenticated users read access" ON users
    FOR SELECT USING (auth.role() = 'authenticated');

-- Anyone can insert contact messages (public form)
CREATE POLICY "Public contact messages insert" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Only authenticated users can read contact messages
CREATE POLICY "Authenticated contact messages read" ON contact_messages
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for products table
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for home_data table
CREATE TRIGGER update_home_data_updated_at
    BEFORE UPDATE ON home_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
