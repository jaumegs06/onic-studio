import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import productsRouter from './products.js';

// Create test app
const app = express();
app.use(express.json());
app.use('/api/products', productsRouter);

describe('GET /api/products', () => {
    it('should return 200 and an array of products', async () => {
        const response = await request(app).get('/api/products');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return products with required fields', async () => {
        const response = await request(app).get('/api/products');

        if (response.body.length > 0) {
            const product = response.body[0];
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('category');
        }
    });
});

describe('GET /api/products/:id', () => {
    it('should return a single product when ID exists', async () => {
        // First get all products to find a valid ID
        const allProducts = await request(app).get('/api/products');

        if (allProducts.body.length > 0) {
            const firstProductId = allProducts.body[0].id;
            const response = await request(app).get(`/api/products/${firstProductId}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', firstProductId);
        }
    });

    it('should return 404 when product ID does not exist', async () => {
        const response = await request(app).get('/api/products/999999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});
