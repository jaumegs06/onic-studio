import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { readJSON, writeJSON } from '../utils/db.js';
import { generateToken, authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

interface User {
    id: number;
    username: string;
    passwordHash: string;
    role: string;
}

interface UsersData {
    users: User[];
}

// Login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        // Read users from database
        const data = await readJSON<UsersData>('users.json');
        const user = data.users?.find(u => u.username === username);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken({
            userId: user.id,
            username: user.username,
            role: user.role
        });

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
router.get('/me', authenticateToken, (req: AuthRequest, res: Response) => {
    res.json({ user: req.user });
});

export default router;
