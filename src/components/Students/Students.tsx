'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import AddStudent, { AddStudentForm } from './AddStudent';
import { addStudentApi } from '@/api/studentsApi';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();
  const queryClient = useQueryClient();


  const createStudentMutation = useMutation({
    mutationFn: addStudentApi,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      deleteStudentMutate(studentId);
    }
  };

  const onAddHandler = (v: AddStudentForm): void => {
    createStudentMutation.mutate({
      firstName: v.firstName,
      lastName: v.lastName,
      middleName: v.middleName,
      groupId: v.groupId,
    });
  };

  return (
    <div>
      <AddStudent onSubmit={onAddHandler} isSubmitting={createStudentMutation.isPending} />

      {createStudentMutation.isError && (
        <div className="text-red-600 mb-4">
          {(createStudentMutation.error as Error)?.message ?? 'Ошибка добавления'}
        </div>
      )}
      {createStudentMutation.isSuccess && (
        <div className="text-green-700 mb-4">Студент успешно добавлен</div>
      )}

      <div className={styles.Students}>
        {students.map((student: StudentInterface) => (
          <Student key={student.id} student={student} onDelete={onDeleteHandler} />
        ))}
      </div>
    </div>
  );
};

export default Students;
