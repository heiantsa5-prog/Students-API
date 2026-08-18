import { Router, Request, Response } from 'express';
import { getAllStudents, getStudentById, createStudent, updateStudent, modifyPartiellyStudent, removeStudent } from '../service/studentService';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/students', authenticate, async (_req: Request, res: Response) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/students/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/students', authenticate,  async (req: Request, res: Response) => {
  try {
    const newStudent = await createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error'});
  }
});

router.put('/students/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const student = await updateStudent(id, req.body);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server Error'});
  }
});

router.patch('/students/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const student = await modifyPartiellyStudent(id, req.body);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server Error'});
  }
});

router.delete('/students/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const studentDeleted = await removeStudent(id);
    if (!studentDeleted) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: 'Server Error'});
  }
});

export default router;