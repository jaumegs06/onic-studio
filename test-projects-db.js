import { config } from 'dotenv';
config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProjects() {
    console.log('🔍 Checking projects in database...\n');

    const { data, error, count } = await supabase
        .from('projects')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('❌ Error fetching projects:', error);
        return;
    }

    console.log(`✅ Total projects in database: ${count}`);

    if (data && data.length > 0) {
        console.log('\n📋 Projects found:');
        data.forEach((project, i) => {
            console.log(`\n${i + 1}. ${project.title}`);
            console.log(`   - ID: ${project.id}`);
            console.log(`   - Category: ${project.category}`);
            console.log(`   - Location: ${project.location || 'N/A'}`);
            console.log(`   - Year: ${project.year || 'N/A'}`);
            console.log(`   - Images: ${project.images?.length || 0}`);
        });
    } else {
        console.log('\n⚠️ No projects found in the database!');
    }
}

checkProjects();
