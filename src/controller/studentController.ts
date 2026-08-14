import { Router, Request, Response } from 'express';
import { getAllStudents, getStudentById, createStudent } from '../service/studentService';

const router = Router();

router.get('/students', async (_req: Request, res: Response) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/students/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const user = await getStudentById(id);

    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/students', async (req: Request, res: Response) => {
  try {
    const newStudent = await createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error'});
  }
});


export default router;