import axios from 'axios';
import { supabase } from './supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 errors (redirect to login)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: async (username: string, password: string) => {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    },
    me: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

// Products API
export const productsAPI = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    create: async (data: any) => {
        const response = await api.post('/products', data);
        return response.data;
    },
    update: async (id: number, data: any) => {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};

// Upload API
export const uploadAPI = {
    single: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.post('/upload/single', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
    multiple: async (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => formData.append('images', file));
        const response = await api.post('/upload/multiple', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
};

// Contact API
export const contactAPI = {
    submit: async (data: {
        name: string;
        email: string;
        phone?: string;
        projectType: string;
        message: string;
    }) => {
        const response = await api.post('/contact', data);
        return response.data;
    },
    getMessages: async () => {
        const response = await api.get('/contact/messages');
        return response.data;
    },
};

// Projects API
export const projectsAPI = {
    getAll: async () => {
        // Try Supabase first, fall back to API if not available
        console.log('[Debug] Supabase client available:', !!supabase);
        if (supabase) {
            console.log('[Debug] Using Supabase');
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('[Debug] Supabase error:', error);
                throw error;
            }
            console.log('[Debug] Supabase returned', data?.length || 0, 'projects');
            return data || [];
        } else {
            // Fallback to backend API
            const response = await api.get('/projects');
            return response.data;
        }
    },
    getById: async (id: number) => {
        // Try Supabase first, fall back to API if not available
        if (supabase) {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } else {
            // Fallback to backend API
            const response = await api.get(`/projects/${id}`);
            return response.data;
        }
    },
    create: async (data: any) => {
        const response = await api.post('/projects', data);
        return response.data;
    },
    update: async (id: number, data: any) => {
        const response = await api.put(`/projects/${id}`, data);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete(`/projects/${id}`);
        return response.data;
    },
};

export default api;
