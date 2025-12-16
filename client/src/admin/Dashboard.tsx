import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Package, LogOut, Menu, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
    children: ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
    const [location, setLocation] = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setLocation('/admin/login');
    };

    const navItems = [
        { icon: Package, label: 'Productos', path: '/admin/dashboard' },
        { icon: Mail, label: 'Mensajes', path: '/admin/messages' },
    ];

    const isActive = (path: string) => location === path;

    return (
        <div className="min-h-screen bg-stone-100">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-neutral-100 rounded transition-colors"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                        ONICE
                    </h1>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:text-black hover:bg-neutral-100 rounded transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                </button>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <AnimatePresence mode="wait">
                    {sidebarOpen && (
                        <motion.aside
                            initial={{ x: -280, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -280, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-73px)] p-6"
                        >
                            <nav className="space-y-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link key={item.path} href={item.path}>
                                            <a
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                                    ? 'bg-black text-white'
                                                    : 'text-neutral-700 hover:bg-neutral-100'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="font-medium">{item.label}</span>
                                            </a>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
