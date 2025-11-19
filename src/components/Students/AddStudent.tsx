'use client';

import { useForm } from 'react-hook-form';
import useGroups from '@/hooks/useGroups';

export type AddStudentForm = {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
};

interface AddStudentProps {
  onSubmit: (values: AddStudentForm) => void;
  isSubmitting: boolean;
}

export default function AddStudent({
  onSubmit,
  isSubmitting,
}: AddStudentProps): React.ReactElement {
  const { groups } = useGroups();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddStudentForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      groupId: undefined as unknown as number,
    },
  });

  const handleFormSubmit = (values: AddStudentForm): void => {
    onSubmit(values);
    reset();
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-md"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label className="font-medium">Фамилия</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Иванов"
          {...register('lastName', { required: 'Введите фамилию' })}
        />
        {errors.lastName && (
          <span className="text-red-600 text-sm">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Имя</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Иван"
          {...register('firstName', { required: 'Введите имя' })}
        />
        {errors.firstName && (
          <span className="text-red-600 text-sm">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Отчество</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Иванович"
          {...register('middleName', { required: 'Введите отчество' })}
        />
        {errors.middleName && (
          <span className="text-red-600 text-sm">
            {errors.middleName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Группа</label>
        <select
          className="border rounded px-3 py-2"
          {...register('groupId', {
            required: 'Укажите группу',
            valueAsNumber: true,
          })}
        >
          <option value="">Выберите группу</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        {errors.groupId && (
          <span className="text-red-600 text-sm">
            {errors.groupId.message}
          </span>
        )}
      </div>

      <button
        className="border rounded px-4 py-2 font-medium"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Добавляем…' : 'Добавить студента'}
      </button>
    </form>
  );
}
