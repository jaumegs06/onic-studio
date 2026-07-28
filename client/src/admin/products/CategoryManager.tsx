import { useState, useEffect, FormEvent } from 'react';
import { X, Plus, Trash2, Loader } from 'lucide-react';
import { homeDataAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface CategoryManagerProps {
    onClose: (updatedCategories?: string[]) => void;
}

const DEFAULT_CATEGORIES = ['Granito', 'Mármol', 'Cuarcita', 'Caliza', 'Porcelánico', 'Cuarzo', 'Solid Surface'];

export default function CategoryManager({ onClose }: CategoryManagerProps) {
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const dbCategories = await homeDataAPI.getCategories();
                if (dbCategories && Array.isArray(dbCategories)) {
                    setCategories(dbCategories);
                } else {
                    setCategories(DEFAULT_CATEGORIES);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Error al cargar las categorías. Usando valores por defecto.');
                setCategories(DEFAULT_CATEGORIES);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = (e: FormEvent) => {
        e.preventDefault();
        const trimmed = newCategory.trim();
        if (!trimmed) return;

        if (categories.some(cat => cat.toLowerCase() === trimmed.toLowerCase())) {
            toast.error('La categoría ya existe');
            return;
        }

        setCategories([...categories, trimmed]);
        setNewCategory('');
    };

    const handleDeleteCategory = (categoryToDelete: string) => {
        setCategories(categories.filter(cat => cat !== categoryToDelete));
    };

    const handleSave = async () => {
        if (categories.length === 0) {
            toast.error('Debe haber al menos una categoría');
            return;
        }

        setSaving(true);
        try {
            await homeDataAPI.saveCategories(categories);
            toast.success('Categorías guardadas correctamente');
            onClose(categories);
        } catch (error) {
            console.error('Error saving categories:', error);
            toast.error('Error al guardar las categorías');
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold">Gestionar Categorías</h3>
                    <button
                        onClick={() => onClose()}
                        className="p-2 hover:bg-neutral-100 rounded transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Add Category Form */}
                    <form onSubmit={handleAddCategory} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Nueva categoría..."
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="flex-1 px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-black transition-colors text-sm"
                            disabled={loading || saving}
                        />
                        <button
                            type="submit"
                            disabled={loading || saving || !newCategory.trim()}
                            className="flex items-center gap-1 px-4 py-2 bg-black text-white rounded hover:bg-neutral-800 transition-colors text-sm disabled:opacity-50"
                        >
                            <Plus className="w-4 h-4" />
                            Añadir
                        </button>
                    </form>

                    {/* Categories List */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                            Categorías Existentes ({categories.length})
                        </h4>

                        {loading ? (
                            <div className="flex justify-center py-6">
                                <Loader className="w-6 h-6 animate-spin text-neutral-400" />
                            </div>
                        ) : (
                            <div className="border border-neutral-200 rounded divide-y divide-neutral-200 max-h-60 overflow-y-auto">
                                {categories.map((category) => (
                                    <div
                                        key={category}
                                        className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-neutral-800">{category}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteCategory(category)}
                                            className="p-1 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded transition-colors"
                                            title="Eliminar categoría"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                {categories.length === 0 && (
                                    <div className="px-4 py-6 text-center text-sm text-neutral-500">
                                        No hay categorías definidas.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-neutral-200">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={loading || saving}
                            className="flex-1 flex justify-center items-center gap-2 bg-black text-white py-2.5 rounded hover:bg-neutral-800 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                            {saving && <Loader className="w-4 h-4 animate-spin" />}
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="px-4 py-2.5 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors text-sm font-medium"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
