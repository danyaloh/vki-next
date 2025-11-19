'use client';

import Link from 'next/link';

import useStudents from '@/hooks/useStudents';
import useGroups from '@/hooks/useGroups';

import type StudentInterface from '@/types/StudentInterface';
import type { AddStudentPayload } from '@/api/studentsApi';

import AddStudent from './AddStudent';
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

  const {
    groups = [],
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useGroups();

  const handleDelete = (id: number): void => {
    if (!isDeleting) {
      deleteStudentMutate(id);
    }
  };

  const handleAddStudent = (payload: AddStudentPayload): void => {
    if (!isAdding) {
      addStudentMutate(payload);
    }
  };

  return (
    <div className={styles.StudentsPage}>
      <div className={styles.StudentsLayout}>
        <section className={styles.StudentsListSection}>
          {isLoading ? (
            <div>Загрузка студентов…</div>
          ) : isError ? (
            <div>Ошибка загрузки: {(error as Error)?.message}</div>
          ) : students.length === 0 ? (
            <div>Студентов пока нет</div>
          ) : (
            <ul className={styles.StudentsList}>
              {students.map((student: StudentInterface) => (
                <li key={student.id} className={styles.StudentCard}>
                  <Link
                    href={`/students/${student.id}`}
                    className={styles.StudentInfo}
                  >
                    <div className={styles.StudentName}>
                      {student.id} – {student.lastName} {student.firstName}{' '}
                      {student.middleName}
                    </div>
                    {student.group && (
                      <div className={styles.StudentGroup}>
                        Группа: {student.group.name}
                      </div>
                    )}
                  </Link>

                  <button
                    type="button"
                    className={styles.DeleteButton}
                    onClick={() => handleDelete(student.id)}
                    disabled={isDeleting}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <aside className={styles.AddStudentPanel}>
          <h2 className={styles.AddStudentTitle}>Новый студент</h2>

          {isGroupsError ? (
            <div className={styles.AddStudentError}>
              Ошибка загрузки групп
            </div>
          ) : (
            <AddStudent
              onSubmit={handleAddStudent}
              isSubmitting={isAdding}
              groups={groups}
              isGroupsLoading={isGroupsLoading}
            />
          )}
        </aside>
      </div>
    </div>
  );
};

export default Students;
