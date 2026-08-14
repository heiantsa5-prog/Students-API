import { findAllStudents, findStudentById} from '../repository/studentRepository.ts';
import { Student } from '../model/studentModel';

export async function getAllStudents(): Promise<Student[]> {
  return await findAllStudents();
}

export async function getStudentById(id: number): Promise<Student | null> {
  return await findStudentById(id);
}