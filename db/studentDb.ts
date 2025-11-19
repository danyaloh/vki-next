import { Student } from './entity/Student.entity';
import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';
import { initializeDataSource } from './AppDataSource';

const mapStudentToInterface = (s: Student): StudentInterface => ({
  id: s.id,
  firstName: s.firstName,
  lastName: s.lastName,
  middleName: s.middleName,
  isDeleted: false,
  groupId: s.groupId,
  group: s.group
    ? {
        id: s.group.id,
        name: s.group.name,
        contacts: s.group.contacts,
      }
    : undefined,

});

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const ds = await initializeDataSource();
  const repo = ds.getRepository(Student);

  const students = await repo.find({
    order: { id: 'DESC' },
    relations: ['group'],
  });

  return students.map(mapStudentToInterface);
};

export const getStudentByIdDb = async (
  id: number,
): Promise<Student | null> => {
  const ds = await initializeDataSource();
  const repo = ds.getRepository(Student);

  const student = await repo.findOne({
    order: { id: 'DESC' },
    relations: ['group'],
  });

  return student;
};

export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const ds = await initializeDataSource();
  const repo = ds.getRepository(Student);

  await repo.delete(studentId);
  return studentId;
};

type CreateStudentPayload = {
  firstName: string;
  lastName: string;
  middleName: string;
  contacts?: string;
  groupId: number;
};

export const addStudentDb = async (
  studentFields: CreateStudentPayload,
): Promise<StudentInterface> => {
  const ds = await initializeDataSource();
  const repo = ds.getRepository(Student);

  const student = repo.create(studentFields);
  const saved = await repo.save(student);

  const withGroup = await repo.findOne({
    where: { id: saved.id },
    relations: ['group'],
  });

  if (!withGroup) {
    return mapStudentToInterface(saved);
  }

  return mapStudentToInterface(withGroup);
};

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
