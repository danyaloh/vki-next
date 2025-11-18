import { Student } from './entity/Student.entity';
import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';
import { initializeDataSource } from './AppDataSource';

/**
 * Получение всех студентов
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const dataSource = await initializeDataSource();
  const studentRepository = dataSource.getRepository(Student);

  const students = await studentRepository.find({
    order: { id: 'DESC' },
    relations: ['group'],
  });

  // Приводим сущность к интерфейсу, который используется в UI
  return students.map((s) => ({
    id: s.id,
    firstName: s.firstName,
    lastName: s.lastName,
    middleName: s.middleName,
    isDeleted: false,
  }));
};

/**
 * Получение одного студента по id
 */
export const getStudentByIdDb = async (
  id: number,
): Promise<Student | null> => {
  const dataSource = await initializeDataSource();
  const studentRepository = dataSource.getRepository(Student);

  return await studentRepository.findOne({
    where: { id },
    relations: ['group'],
  });
};

/**
 * Удаление студента
 * @param studentId ИД удаляемого студента
 */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const dataSource = await initializeDataSource();
  const studentRepository = dataSource.getRepository(Student);

  await studentRepository.delete(studentId);
  return studentId;
};

type CreateStudentPayload = {
  firstName: string;
  lastName: string;
  middleName: string;
  contacts?: string;
  groupId: number;
};

/**
 * Добавление студента
 */
export const addStudentDb = async (
  studentFields: CreateStudentPayload,
): Promise<StudentInterface> => {
  const dataSource = await initializeDataSource();
  const studentRepository = dataSource.getRepository(Student);

  const student = studentRepository.create(studentFields);
  const saved = await studentRepository.save(student);

  // Возвращаем в формате StudentInterface
  return {
    id: saved.id,
    firstName: saved.firstName,
    lastName: saved.lastName,
    middleName: saved.middleName,
    isDeleted: false,
  };
};

/**
 * Добавление набора тестовых студентов
 */
export const addRandomStudentsDb = async (
  amount = 10,
): Promise<StudentInterface[]> => {
  const students: StudentInterface[] = [];

  for (let i = 0; i < amount; i += 1) {
    const fio = getRandomFio();

    const newStudent = await addStudentDb({
      ...fio,
      contacts: 'contact',
      groupId: 1,
    });

    students.push(newStudent);
  }

  return students;
};