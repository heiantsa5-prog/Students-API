import database  from '../db';
import { Student } from '../model/studentModel';

export async function findAllStudents(): Promise<Student[]> {
    const result = await database.query('SELECT * FROM student');

    return result.rows.map((row) => ({
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        age: row.age
    }));
}


export async function findStudentById(id: number): Promise<Student | null> {
    const result = await database.query('SELECT * FROM student WHERE id = $1', [id]);

    const row = result.rows[0];
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        age: row.age
    };
}

