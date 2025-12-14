import { Router, Request, Response } from 'express';
import { readJSON, writeJSON } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

interface Product {
    id: number;
    name: string;
    category: string;
    color: string;
    finish: string;
    image: string;
    bestSeller?: boolean;
}

interface ProductsData {
    products: Product[];
}

// Get all products (public)
router.get('/', async (req: Request, res: Response) => {
    try {
        const data = await readJSON<ProductsData>('products.json');
        res.json(data.products || []);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get single product (public)
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const data = await readJSON<ProductsData>('products.json');
        const product = data.products?.find(p => p.id === parseInt(req.params.id));

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Create product (protected)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const data = await readJSON<ProductsData>('products.json');
        const products = data.products || [];

        // Generate new ID
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

        const newProduct: Product = {
            id: newId,
            ...req.body
        };

        products.push(newProduct);
        await writeJSON('products.json', { products });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Update product (protected)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const data = await readJSON<ProductsData>('products.json');
        const products = data.products || [];
        const index = products.findIndex(p => p.id === parseInt(req.params.id));

        if (index === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        products[index] = {
            ...products[index],
            ...req.body,
            id: parseInt(req.params.id) // Ensure ID doesn't change
        };

        await writeJSON('products.json', { products });
        res.json(products[index]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete product (protected)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const data = await readJSON<ProductsData>('products.json');
        const products = data.products || [];
        const filtered = products.filter(p => p.id !== parseInt(req.params.id));

        if (filtered.length === products.length) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await writeJSON('products.json', { products: filtered });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
