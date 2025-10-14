import type StudentInterface from '@/types/StudentInterface';

export interface AddStudentPayload {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
}

const base = process.env.NEXT_PUBLIC_API ?? '/api/';


export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  const res = await fetch(`${base}students`);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const rows = (await res.json()) as any[];


  return rows.map((r) => ({
    ...r,
    isDeleted: typeof r.isDeleted === 'number' ? !!r.isDeleted : !!r.isDeleted,
  })) as StudentInterface[];
};


export const addStudentApi = async (
  payload: AddStudentPayload
): Promise<{ id: number } & AddStudentPayload> => {
  const res = await fetch(`${base}students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
  }
  return (await res.json()) as { id: number } & AddStudentPayload;
};


export const deleteStudentApi = async (studentId: number): Promise<number> => {
  const res = await fetch(`${base}students/${studentId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return studentId;
};
