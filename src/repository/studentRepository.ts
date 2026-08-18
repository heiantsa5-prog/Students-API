import database  from '../db';
import { Student } from '../model/studentModel';

export const findAllStudents = async () : Promise<Student[]> => {
    const result = await database.query('SELECT * FROM student');

    return result.rows.map((row) => ({
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        age: row.age
    }));
}


export const findStudentById = async (id: number): Promise<Student | null> => {
    const result = await database.query('SELECT * FROM student WHERE id = $1', [id]);

    const row = result.rows[0];
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        age: row.age
    };
}

export const createNewStudent = async (studentData: Omit<Student, 'id'>): Promise<Student> => {
    const sql = `INSERT INTO student (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING id`;
    const values = [
        studentData.firstName,
        studentData.lastName,
        studentData.age
    ];

    const result = await database.query(sql, values);

    return {
        id: result.rows[0].id,
        ...studentData
    };
}

export const modifyStudent = async (id: number, studentData: Omit<Student, 'id'>): Promise<Student | null> => {
    const sql = `
    UPDATE student 
    SET first_name = $1, last_name = $2, age = $3 
    WHERE id = $4 
    RETURNING id, first_name AS "firstName", last_name AS "lastName", age`;
    const values = [
        studentData.firstName,
        studentData.lastName,
        studentData.age,
        id
    ];

    const result = await database.query(sql, values);

    return result.rows[0];
}

export const modifyStudentPartielly = async (id: number, studentData : Partial<Omit<Student, 'id'>>): Promise<Student | null> => {
    const student = await database.query(`SELECT * FROM student WHERE id = $1`, [id]);
    const row = student.rows[0];

    const newFirstName = studentData.firstName ?? row.first_name;
    const newLastName = studentData.lastName ?? row.last_ame;
    const newAge = studentData.age ?? row.age;

    const sql = `
    UPDATE student 
    SET first_name = $1, last_name = $2, age = $3 
    WHERE id = $4 
    RETURNING id, first_name AS "firstName", last_name AS "lastName", age`;

    const values = [newFirstName, newLastName, newAge, id];
    const result = await database.query(sql, values);

    return result.rows[0];
}

export const deleteStudent = async (id: number): Promise<boolean> => {
    const result = await database.query(`DELETE FROM student WHERE id = $1`, [id]);
    return (result.rowCount ?? 0) > 0;
}