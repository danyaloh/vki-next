'use client';

import { useForm } from 'react-hook-form';

import type GroupInterface from '@/types/GroupInterface';
import type { AddStudentPayload } from '@/api/studentsApi';
import styles from './Students.module.scss';

type FormValues = {
  lastName: string;
  firstName: string;
  middleName: string;
  groupId: string;
};

interface AddStudentProps {
  onSubmit: (payload: AddStudentPayload) => void;
  isSubmitting: boolean;
  groups?: GroupInterface[];       
  isGroupsLoading: boolean;
}

const AddStudent = ({
  onSubmit,
  isSubmitting,
  groups,
  isGroupsLoading,
}: AddStudentProps): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      lastName: '',
      firstName: '',
      middleName: '',
      groupId: '',
    },
  });

  const handleFormSubmit = (values: FormValues): void => {
    const payload: AddStudentPayload = {
      lastName: values.lastName.trim(),
      firstName: values.firstName.trim(),
      middleName: values.middleName.trim(),
      groupId: Number(values.groupId),
    };

    onSubmit(payload);
    reset({
      lastName: '',
      firstName: '',
      middleName: '',
      groupId: '',
    });
  };

  const safeGroups: GroupInterface[] = Array.isArray(groups) ? groups : [];

  return (
    <form
      className={styles.AddStudentForm}
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <div className={styles.AddStudentField}>
        <label className={styles.AddStudentLabel}>Фамилия</label>
        <input
          className={styles.AddStudentInput}
          placeholder="Иванов"
          {...register('lastName', { required: 'Введите фамилию' })}
        />
        {errors.lastName && (
          <span className={styles.AddStudentError}>
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className={styles.AddStudentField}>
        <label className={styles.AddStudentLabel}>Имя</label>
        <input
          className={styles.AddStudentInput}
          placeholder="Иван"
          {...register('firstName', { required: 'Введите имя' })}
        />
        {errors.firstName && (
          <span className={styles.AddStudentError}>
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className={styles.AddStudentField}>
        <label className={styles.AddStudentLabel}>Отчество</label>
        <input
          className={styles.AddStudentInput}
          placeholder="Иванович"
          {...register('middleName')}
        />
      </div>

      <div className={styles.AddStudentField}>
        <label className={styles.AddStudentLabel}>Группа</label>
        <select
          className={styles.AddStudentSelect}
          {...register('groupId', { required: 'Выберите группу' })}
          disabled={isGroupsLoading || safeGroups.length === 0}
        >
          <option value="">
            {isGroupsLoading
              ? 'Загрузка групп...'
              : safeGroups.length === 0
              ? 'Группы не найдены'
              : 'Выберите группу'}
          </option>
          {safeGroups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {errors.groupId && (
          <span className={styles.AddStudentError}>
            {errors.groupId.message}
          </span>
        )}
      </div>

      <button
        className={styles.AddStudentSubmit}
        type="submit"
        disabled={isSubmitting || isGroupsLoading || safeGroups.length === 0}
      >
        {isSubmitting ? 'Добавляем…' : 'Добавить студента'}
      </button>
    </form>
  );
};

export default AddStudent;
