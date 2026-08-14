import { Pool } from 'pg';

const database = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'students_api',
  user: 'hei',
  password: 'root',
});

export default database;