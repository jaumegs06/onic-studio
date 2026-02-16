import { useState, FormEvent, useRef } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { productsAPI, uploadAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Product {
    id?: number;
    name: string;
    category: string;
    color: string;
    finish: string[];
    image: string;
    best_seller?: boolean;
    description?: string;
}

interface ProductFormProps {
    product: Product | null;
    onClose: (updatedProduct?: Product) => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
    const [formData, setFormData] = useState<Product>({
        name: product?.name || '',
        category: product?.category || 'Granito',
        color: product?.color || 'Blanco',
        finish: product?.finish || [], // Initialize as array
        image: product?.image || '',
        best_seller: product?.best_seller || false,
        description: product?.description || '',
    });
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categories = ['Granito', 'Mármol', 'Cuarcita', 'Caliza', 'Porcelánico', 'Cuarzo'];
    const colors = ['Blanco', 'Negro', 'Beige', 'Rojo', 'Rosa', 'Verde', 'Azul', 'Marrón', 'Gris', 'Varios'];
    const finishes = ['Pulido', 'Apomazado', 'Vintage/Leather', 'Bruto', 'Flameado', 'Granallado', 'Mate'];

    const toggleFinish = (finish: string) => {
        const current = formData.finish || [];
        if (current.includes(finish)) {
            setFormData({ ...formData, finish: current.filter(f => f !== finish) });
        } else {
            setFormData({ ...formData, finish: [...current, finish] });
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const result = await uploadAPI.single(file);
            setFormData({ ...formData, image: result.path });
            toast.success('Imagen subida correctamente');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const toastId = product ? 'update-product' : 'create-product';
        const action = product ? 'Actualizando' : 'Creando';
        toast.loading(`${action} material...`, { id: toastId });

        try {
            let result;
            if (product) {
                result = await productsAPI.update(product.id!, formData);
                toast.success('Material actualizado correctamente', { id: toastId });
            } else {
                result = await productsAPI.create(formData);
                toast.success('Material creado correctamente', { id: toastId });
            }
            onClose(result); // Pass updated product back to parent
        } catch (error) {
            const errorMessage = (error as any).message || (error as any).error_description || (error as any).details || 'Error desconocido';
            toast.error(`Error al guardar el material: ${errorMessage}`, { id: toastId });
            setLoading(false); // Keep form open on error
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
                className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
                    <h3 className="text-2xl font-bold">
                        {product ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    <button
                        onClick={() => onClose()}
                        className="p-2 hover:bg-neutral-100 rounded transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-black transition-colors"
                            required
                        />
                    </div>

                    {/* Category & Color */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Categoría *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-black transition-colors"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Color *
                            </label>
                            <select
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-black transition-colors"
                            >
                                {colors.map((color) => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Finishes (Multi-select) */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Acabados *
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {finishes.map((finish) => {
                                const isSelected = (formData.finish || []).includes(finish);
                                return (
                                    <button
                                        key={finish}
                                        type="button"
                                        onClick={() => toggleFinish(finish)}
                                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${isSelected
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                                            }`}
                                    >
                                        {finish}
                                    </button>
                                );
                            })}
                        </div>
                        {(!formData.finish || formData.finish.length === 0) && (
                            <p className="text-xs text-red-500 mt-1">Selecciona al menos un acabado</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-black transition-colors h-32 resize-none"
                            placeholder="Descripción detallada del material..."
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Imagen *
                        </label>
                        <div className="flex gap-4 items-start">
                            {formData.image && (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded border border-neutral-300"
                                />
                            )}
                            <div className="flex-1 space-y-3">
                                {/* File upload button */}
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors disabled:opacity-50"
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader className="w-4 h-4 animate-spin" />
                                                Subiendo...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4" />
                                                Subir Imagen
                                            </>
                                        )}
                                    </button>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        JPG, PNG o WEBP. Máximo 5MB.
                                    </p>
                                </div>


                            </div>
                        </div>
                    </div>

                    {/* Best Seller */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="bestSeller"
                            checked={formData.best_seller}
                            onChange={(e) => setFormData({ ...formData, best_seller: e.target.checked })}
                            className="w-4 h-4 rounded border-neutral-300"
                        />
                        <label htmlFor="bestSeller" className="text-sm font-medium text-neutral-700">
                            Marcar como Best Seller
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading || !formData.image}
                            className="flex-1 bg-black text-white py-3 rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear Producto'}
                        </button>
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="px-6 py-3 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
