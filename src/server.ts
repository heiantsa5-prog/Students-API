import express from 'express';
import studentController from './controller/studentController';

const app = express();
app.use(express.json());
app.use('/', studentController);

const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});