import axios from 'axios';

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

export default api;
