import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Products API
export const productsAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },
    getById: async (id: number) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },
    create: async (product: any) => {
        // Prepare data (remove undefined)
        const cleanData = Object.fromEntries(
            Object.entries(product).filter(([_, v]) => v != null)
        );

        const { data, error } = await supabase
            .from('products')
            .insert([cleanData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },
    update: async (id: number, product: any) => {
        const { data, error } = await supabase
            .from('products')
            .update(product)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },
    delete: async (id: number) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    },
};

// Projects API
export const projectsAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },
    getById: async (id: number) => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },
    create: async (project: any) => {
        const { data, error } = await supabase
            .from('projects')
            .insert([project])
            .select()
            .single();

        if (error) throw error;
        return data;
    },
    update: async (id: number, project: any) => {
        const { data, error } = await supabase
            .from('projects')
            .update(project)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },
    delete: async (id: number) => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    },
};

// Contact API
export const contactAPI = {
    submit: async (formData: any) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    },
    // Used by ContactMessages.tsx
    getMessages: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/contact/messages', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },
    // Keeping for potential backwards compatibility, though getMessages is preferred
    getAll: async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/contact/messages', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        return data.data || [];
    }
};

// Upload API
export const uploadAPI = {
    single: async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return { path: publicUrl };
    },
    multiple: async (files: File[]) => {
        const uploadPromises = Array.from(files).map(async (file) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            return publicUrl;
        });

        return Promise.all(uploadPromises);
    }
};

// Auth API is handled directly by supabase.auth
export const authAPI = {
    // Keep for backward compatibility if needed, but Login.tsx uses supabase directly
    getUser: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },
    logout: async () => {
        await supabase.auth.signOut();
    }
};

// Home Data API
export const homeDataAPI = {
    getSliderImages: async () => {
        const { data, error } = await supabase
            .from('home_data')
            .select('value')
            .eq('key', 'slider_images')
            .single();
            
        if (error && error.code !== 'PGRST116') throw error;
        return data?.value || null;
    },
    saveSliderImages: async (images: string[]) => {
        const { data, error } = await supabase
            .from('home_data')
            .upsert(
                { key: 'slider_images', value: images, updated_at: new Date().toISOString() },
                { onConflict: 'key' }
            )
            .select()
            .single();
            
        if (error) throw error;
        return data;
    }
};
