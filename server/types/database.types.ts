export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: number
                    username: string
                    password_hash: string
                    role: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    username: string
                    password_hash: string
                    role?: string
                    created_at?: string
                }
                Update: {
                    id?: number
                    username?: string
                    password_hash?: string
                    role?: string
                    created_at?: string
                }
            }
            products: {
                Row: {
                    id: number
                    name: string
                    category: string
                    color: string
                    finish: string
                    image: string
                    best_seller: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    category: string
                    color: string
                    finish: string
                    image: string
                    best_seller?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    category?: string
                    color?: string
                    finish?: string
                    image?: string
                    best_seller?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            contact_messages: {
                Row: {
                    id: string
                    name: string
                    email: string
                    phone: string | null
                    project_type: string
                    message: string
                    timestamp: string
                    email_sent: boolean
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    phone?: string | null
                    project_type: string
                    message: string
                    timestamp?: string
                    email_sent?: boolean
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    phone?: string | null
                    project_type?: string
                    message?: string
                    timestamp?: string
                    email_sent?: boolean
                }
            }
            projects: {
                Row: {
                    id: number
                    title: string
                    description: string
                    image: string
                    category: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    title: string
                    description: string
                    image: string
                    category: string
                    created_at?: string
                }
                Update: {
                    id?: number
                    title?: string
                    description?: string
                    image?: string
                    category?: string
                    created_at?: string
                }
            }
            services: {
                Row: {
                    id: number
                    title: string
                    description: string
                    icon: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    title: string
                    description: string
                    icon: string
                    created_at?: string
                }
                Update: {
                    id?: number
                    title?: string
                    description?: string
                    icon?: string
                    created_at?: string
                }
            }
            home_data: {
                Row: {
                    id: number
                    key: string
                    value: Json
                    updated_at: string
                }
                Insert: {
                    id?: number
                    key: string
                    value: Json
                    updated_at?: string
                }
                Update: {
                    id?: number
                    key?: string
                    value?: Json
                    updated_at?: string
                }
            }
        }
    }
}
