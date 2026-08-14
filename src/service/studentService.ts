import { findAllStudents } from '../repository/studentRepository';
import { Student } from '../model/studentModel';

export async function getAllStudents(): Promise<Student[]> {
  return await findAllStudents();
}

