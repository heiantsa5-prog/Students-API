import { Router, Request, Response } from 'express';
import { getAllStudents } from '../service/studentService';

const router = Router();

router.get('/students', async (_req: Request, res: Response) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router
