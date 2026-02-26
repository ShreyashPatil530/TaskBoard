import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { z } from 'zod';

const router = express.Router();

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

router.post('/register', async (req, res) => {
    try {
        const validated = registerSchema.safeParse(req.body);
        if (!validated.success) return res.status(400).json({ error: 'Invalid input' });

        const { email, password } = validated.data;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'User registered' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user: any = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 86400000,
        });

        res.json({ token, message: 'LoggedIn' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', { sameSite: 'lax' }).json({ message: 'Logged out' });
});

export default router;
