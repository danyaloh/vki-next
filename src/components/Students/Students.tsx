'use client';

import useStudents from '@/hooks/useStudents';
import AddStudent from './AddStudent';
import StudentRow from './Student/Student';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const {
    students,
    isLoading,
    isError,
    error,
    deleteStudentMutate,
    isDeleting,
    addStudentMutate,
    isAdding,
  } = useStudents();

  if (isLoading) {
    return <div>Загрузка студентов…</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки: {(error as Error)?.message}</div>;
  }

  const handleDelete = (id: number): void => {
    if (!isDeleting) {
      deleteStudentMutate(id);
    }
  };

  const handleAdd = (form: {
    firstName: string;
    lastName: string;
    middleName: string;
    groupId: number;
  }): void => {
    if (!isAdding) {
      addStudentMutate(form);
    }
  };

  return (
    <div className={styles.Students}>
      <AddStudent onSubmit={handleAdd} isSubmitting={isAdding} />

      <div className={styles.list}>
        {students.map((s) => (
          <StudentRow
            key={s.id}
            student={s}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Students;
