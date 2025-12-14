import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { productsAPI } from '@/lib/api';
import ProductForm from './ProductForm';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
    id: number;
    name: string;
    category: string;
    color: string;
    finish: string;
    image: string;
    bestSeller?: boolean;
}

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showForm, setShowForm] = useState(false);

    const loadProducts = async () => {
        try {
            const data = await productsAPI.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

        try {
            await productsAPI.delete(id);
            await loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error al eliminar el producto');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
        loadProducts();
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center py-12">Cargando productos...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Productos</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Añadir Producto
                </button>
            </div>

            {/* Search */}
            <div className="mb-6 relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                Imagen
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                Categoría
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                Color
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                Acabado
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                Best Seller
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-neutral-700 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                                <td className="px-6 py-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">{product.name}</td>
                                <td className="px-6 py-4 text-neutral-600">{product.category}</td>
                                <td className="px-6 py-4 text-neutral-600">{product.color}</td>
                                <td className="px-6 py-4 text-neutral-600">{product.finish}</td>
                                <td className="px-6 py-4">
                                    {product.bestSeller && (
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            ★
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors mr-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        No se encontraron productos
                    </div>
                )}
            </div>

            {/* Product Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <ProductForm
                        product={editingProduct}
                        onClose={handleFormClose}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
