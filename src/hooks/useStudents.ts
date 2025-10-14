import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type StudentInterface from '@/types/StudentInterface';
import {
  getStudentsApi,
  deleteStudentApi,
  addStudentApi,
} from '@/api/studentsApi';
import type { AddStudentPayload } from '@/api/studentsApi';

const QUERY_KEY = ['students'];

const useStudents = () => {
  const queryClient = useQueryClient();


  const {
    data: students = [],
    isLoading,
    isError,
    error,
  } = useQuery<StudentInterface[]>({
    queryKey: QUERY_KEY,
    queryFn: getStudentsApi,
  });

 
  const { mutate: deleteStudentMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteStudentApi,

    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<StudentInterface[]>(QUERY_KEY);

      queryClient.setQueryData<StudentInterface[]>(
        QUERY_KEY,
        (old = []) => old.filter((s) => s.id !== studentId),
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(QUERY_KEY, ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const { mutate: addStudentMutate, isPending: isAdding } = useMutation({
    mutationFn: addStudentApi, 

    onMutate: async (payload: AddStudentPayload) => {
  await queryClient.cancelQueries({ queryKey: QUERY_KEY });
  const previous = queryClient.getQueryData<StudentInterface[]>(QUERY_KEY);

  const optimistic: StudentInterface = {
    id: -Date.now(),
    firstName: payload.firstName,
    lastName: payload.lastName,
    middleName: payload.middleName,
    isDeleted: false, 
    
  };

  queryClient.setQueryData<StudentInterface[]>(
    QUERY_KEY,
    (old = []) => [optimistic, ...old],
  );

  return { previous };
},
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(QUERY_KEY, ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    students,
    isLoading,
    isError,
    error,
    deleteStudentMutate,
    isDeleting,
    addStudentMutate,
    isAdding,
  };
};

export default useStudents;
