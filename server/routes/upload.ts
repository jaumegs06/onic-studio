import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload.js';
import { authenticateToken } from '../middleware/auth.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Upload single image
router.post('/single', authenticateToken, upload.single('image'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the path relative to /public
    const imagePath = `/images/uploads/${req.file.filename}`;
    res.json({ path: imagePath, filename: req.file.filename });
});

// Upload multiple images
router.post('/multiple', authenticateToken, upload.array('images', 10), (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const paths = files.map(file => ({
        path: `/images/uploads/${file.filename}`,
        filename: file.filename
    }));

    res.json({ files: paths });
});

// Delete image
router.delete('/:filename', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '..', '..', 'public', 'images', 'uploads', filename);

        await fs.unlink(filePath);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

export default router;
