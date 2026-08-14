import { findAllStudents, findStudentById, createNewStudent, modifyStudent, modifyStudentPartielly, deleteStudent } from '../repository/studentRepository.ts';
import { Student } from '../model/studentModel';

export async function getAllStudents(): Promise<Student[]> {
  return await findAllStudents();
}

export async function getStudentById(id: number): Promise<Student | null> {
  return await findStudentById(id);
}

export async function createStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
  return await createNewStudent(studentData);
}

export async function updateStudent(id: number, studentData: Omit<Student, 'id'>): Promise<Student | null> {
  return await modifyStudent(id, studentData);
}

export async function modifyPartiellyStudent(id: number, studentData: Omit<Student, 'id'>): Promise<Student | null> {
  return await modifyStudentPartielly(id, studentData);
}

export async function removeStudent(id: number): Promise<boolean> {
  return await deleteStudent(id);
}