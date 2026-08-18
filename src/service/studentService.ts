import { findAllStudents, findStudentById, createNewStudent, modifyStudent, modifyStudentPartielly, deleteStudent } from '../repository/studentRepository.ts';
import { Student } from '../model/studentModel';

export const getAllStudents = async (): Promise<Student[]> =>  {
  return await findAllStudents();
}

export const getStudentById = async (id: number): Promise<Student | null> => {
  return await findStudentById(id);
}

export const createStudent = async (studentData: Omit<Student, 'id'>): Promise<Student> => {
  return await createNewStudent(studentData);
}

export const updateStudent = async (id: number, studentData: Omit<Student, 'id'>): Promise<Student | null> => {
  return await modifyStudent(id, studentData);
}

export const modifyPartiellyStudent = async (id: number, studentData: Omit<Student, 'id'>): Promise<Student | null> => {
  return await modifyStudentPartielly(id, studentData);
}

export const removeStudent = async (id: number): Promise<boolean> => {
  return await deleteStudent(id);
}