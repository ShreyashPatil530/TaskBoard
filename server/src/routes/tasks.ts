import express from 'express';
import Task from '../models/Task';
import { protect } from '../middleware/auth';
import { z } from 'zod';
import CryptoJS from 'crypto-js';

const router = express.Router();

const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
});

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const { status, search, page = 1, limit = 10 } = req.query;
        const userId = (req as any).user.userId;

        const query: any = { user: userId };
        if (status) query.status = status;
        if (search) query.title = { $regex: search, $options: 'i' };

        const tasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .skip((+page - 1) * +limit)
            .limit(+limit);

        const total = await Task.countDocuments(query);

        const secureTasks = tasks.map(t => {
            const obj = t.toObject();
            return {
                ...obj,
                securePayload: CryptoJS.AES.encrypt(JSON.stringify({ title: obj.title, desc: obj.description }), process.env.ENCRYPTION_KEY!).toString()
            };
        });

        res.json({ tasks: secureTasks, pagination: { total, pages: Math.ceil(total / +limit) } });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const validated = taskSchema.safeParse(req.body);
        if (!validated.success) return res.status(400).json({ error: 'Invalid data' });

        const task = await Task.create({ ...validated.data, user: (req as any).user.userId });
        res.status(201).json(task);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id, user: (req as any).user.userId }, req.body, { new: true });
        if (!task) return res.status(404).json({ error: 'Not found' });
        res.json(task);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: (req as any).user.userId });
        if (!task) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
