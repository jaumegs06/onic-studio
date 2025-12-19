import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Database } from '../types/database.types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    console.error('Please add your Service Role Key to the .env file');
    process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);
const DATA_DIR = path.join(__dirname, '..', 'data');

async function readJSONFile<T>(filename: string): Promise<T> {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
}

async function migrateUsers() {
    console.log('\n👤 Migrating users...');

    const data = await readJSONFile<{ users: any[] }>('users.json');

    for (const user of data.users) {
        const { error } = await supabase
            .from('users')
            .insert({
                id: user.id,
                username: user.username,
                password_hash: user.passwordHash,
                role: user.role
            });

        if (error && !error.message.includes('duplicate')) {
            console.error(`  ❌ Error migrating user ${user.username}:`, error.message);
        } else {
            console.log(`  ✅ Migrated user: ${user.username}`);
        }
    }
}

async function migrateProducts() {
    console.log('\n📦 Migrating products...');

    const data = await readJSONFile<{ products: any[] }>('products.json');

    // Batch insert products in chunks of 100
    const chunkSize = 100;
    for (let i = 0; i < data.products.length; i += chunkSize) {
        const chunk = data.products.slice(i, i + chunkSize);

        const products = chunk.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            color: p.color,
            finish: p.finish,
            image: p.image,
            best_seller: p.bestSeller || false
        }));

        const { error } = await supabase
            .from('products')
            .insert(products);

        if (error && !error.message.includes('duplicate')) {
            console.error(`  ❌ Error migrating products batch ${i / chunkSize + 1}:`, error.message);
        } else {
            console.log(`  ✅ Migrated ${chunk.length} products (batch ${i / chunkSize + 1})`);
        }
    }

    console.log(`  ✅ Total products migrated: ${data.products.length}`);
}

async function migrateContactMessages() {
    console.log('\n📧 Migrating contact messages...');

    const data = await readJSONFile<{ messages: any[] }>('contact-messages.json');

    for (const msg of data.messages) {
        const { error } = await supabase
            .from('contact_messages')
            .insert({
                id: msg.id,
                name: msg.name,
                email: msg.email,
                phone: msg.phone || null,
                project_type: msg.projectType,
                message: msg.message,
                timestamp: msg.timestamp,
                email_sent: msg.emailSent || false
            });

        if (error && !error.message.includes('duplicate')) {
            console.error(`  ❌ Error migrating message ${msg.id}:`, error.message);
        } else {
            console.log(`  ✅ Migrated message from: ${msg.name}`);
        }
    }
}

async function migrateProjects() {
    console.log('\n🏗️  Migrating projects...');

    try {
        const data = await readJSONFile<{ projects: any[] }>('projects.json');

        for (const project of data.projects) {
            const { error } = await supabase
                .from('projects')
                .insert({
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    image: project.thumbnail,
                    category: project.category
                });

            if (error && !error.message.includes('duplicate')) {
                console.error(`  ❌ Error migrating project ${project.title}:`, error.message);
            } else {
                console.log(`  ✅ Migrated project: ${project.title}`);
            }
        }
    } catch (err) {
        console.log('  ⚠️  Projects file not found or empty, skipping...');
    }
}

async function migrateServices() {
    console.log('\n🛠️  Migrating services...');

    try {
        const data = await readJSONFile<{ services: any[] }>('services.json');

        for (const service of data.services) {
            const { error } = await supabase
                .from('services')
                .insert({
                    id: service.id,
                    title: service.title,
                    description: service.description,
                    icon: service.subtitle || 'default'
                });

            if (error && !error.message.includes('duplicate')) {
                console.error(`  ❌ Error migrating service ${service.title}:`, error.message);
            } else {
                console.log(`  ✅ Migrated service: ${service.title}`);
            }
        }
    } catch (err) {
        console.log('  ⚠️  Services file not found or empty, skipping...');
    }
}

async function migrateHomeData() {
    console.log('\n🏠 Migrating home data...');

    try {
        const data = await readJSONFile<any>('home.json');

        for (const [key, value] of Object.entries(data)) {
            const { error } = await supabase
                .from('home_data')
                .insert({
                    key,
                    value: value as any
                });

            if (error && !error.message.includes('duplicate')) {
                console.error(`  ❌ Error migrating home data ${key}:`, error.message);
            } else {
                console.log(`  ✅ Migrated home data: ${key}`);
            }
        }
    } catch (err) {
        console.log('  ⚠️  Home data file not found or empty, skipping...');
    }
}

async function verifyMigration() {
    console.log('\n🔍 Verifying migration...\n');

    const tables = [
        'users',
        'products',
        'contact_messages',
        'projects',
        'services',
        'home_data'
    ];

    for (const table of tables) {
        const { count, error } = await supabase
            .from(table as any)
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.log(`  ❌ ${table}: Error - ${error.message}`);
        } else {
            console.log(`  ✅ ${table}: ${count} records`);
        }
    }
}

async function migrate() {
    console.log('🚀 Starting data migration from JSON to Supabase...');
    console.log('================================================\n');

    try {
        await migrateUsers();
        await migrateProducts();
        await migrateContactMessages();
        await migrateProjects();
        await migrateServices();
        await migrateHomeData();

        await verifyMigration();

        console.log('\n================================================');
        console.log('✅ Migration completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('  1. Update server routes to use Supabase');
        console.log('  2. Test all API endpoints');
        console.log('  3. Verify frontend works correctly\n');

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
