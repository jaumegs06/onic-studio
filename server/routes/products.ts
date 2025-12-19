import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

interface Product {
    id: number;
    name: string;
    category: string;
    color: string;
    finish: string;
    image: string;
    best_seller?: boolean;
}

// Get all products (public)
router.get('/', async (req: Request, res: Response) => {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;

        res.json(products || []);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get single product (public)
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { data: product, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', parseInt(req.params.id))
            .single();

        if (error || !product) {
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
        const { data: newProduct, error } = await supabase
            .from('products')
            .insert([{
                name: req.body.name,
                category: req.body.category,
                color: req.body.color,
                finish: req.body.finish,
                image: req.body.image,
                best_seller: req.body.bestSeller || false
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Update product (protected)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { data: updatedProduct, error } = await supabase
            .from('products')
            .update({
                name: req.body.name,
                category: req.body.category,
                color: req.body.color,
                finish: req.body.finish,
                image: req.body.image,
                best_seller: req.body.bestSeller
            })
            .eq('id', parseInt(req.params.id))
            .select()
            .single();

        if (error || !updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete product (protected)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', parseInt(req.params.id));

        if (error) throw error;

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
