'use client';

import { useParams } from 'next/navigation';
import useStudent from '@/hooks/useStudent';
import BackLink from '@/components/layout/BackLink/BackLink';

const Student = (): React.ReactElement => {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  const { student, isLoading, isError, error } = useStudent(id);

  if (Number.isNaN(id)) {
    return (
      <div>
        <BackLink href="/students">{'<< список студентов'}</BackLink>
        <div>Некорректный идентификатор студента</div>
      </div>
    );
  }

  if (isLoading) {
    return <div>Загрузка студента…</div>;
  }

  if (isError) {
    return (
      <div>
        <BackLink href="/students">{'<< список студентов'}</BackLink>
        <div>Ошибка загрузки: {(error as Error)?.message}</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div>
        <BackLink href="/students">{'<< список студентов'}</BackLink>
        <div>Студент не найден</div>
      </div>
    );
  }

  return (
    <div>
      <BackLink href="/students">{'<< список студентов'}</BackLink>

      <h2>
        {student.lastName} {student.firstName} {student.middleName}
      </h2>

      {student.group && (
        <p>
          Группа: <strong>{student.group.name}</strong>
        </p>
      )}
    </div>
  );
};

export default Student;
