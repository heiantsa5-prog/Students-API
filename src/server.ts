import express from 'express';
import { generateToken, authenticate } from './middleware/auth';
import cors from 'cors';

const app = express();

app.use(cors ({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());

app.post('/login', (req, res) => {
  const { id, username } = req.body;

  if (id === '1' && username === 'user1') {
    const token = generateToken({ id: 1, username, role: 'user' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalided identification' });
});


app.get('/profil', authenticate, (req, res) => {
  res.json({ message: 'Accessible profil', user: (req as any).user });
});

app.listen(3000, () => console.log(`http://localhost:3000`));