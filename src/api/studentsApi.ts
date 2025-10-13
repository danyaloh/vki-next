import type StudentInterface from '@/types/StudentInterface';

export interface AddStudentPayload {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
}

/** Получение списка студентов */
export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  } catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

/** Добавление студента */
export const addStudentApi = async (payload: AddStudentPayload): Promise<{ id: number } & AddStudentPayload> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const txt = await response.text();
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText} ${txt}`);
    }
    return await response.json() as { id: number } & AddStudentPayload;
  } catch (err) {
    console.log('>>> addStudentApi', err);
    throw err;
  }
};

/** Удаление студента по id */
export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return studentId;
  } catch (err) {
    console.log('>>> deleteStudentApi', err);
    return -1;
  }
};
