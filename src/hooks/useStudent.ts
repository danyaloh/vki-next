import { useMemo } from 'react';
import useStudents from './useStudents';
import type StudentInterface from '@/types/StudentInterface';

const useStudent = (id: number) => {
  const { students, isLoading, isError, error } = useStudents();

  const student = useMemo<StudentInterface | undefined>(
    () => students.find((s) => s.id === id),
    [students, id],
  );

  return {
    student,
    isLoading,
    isError,
    error,
  };
};

export default useStudent;
