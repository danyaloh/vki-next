'use client';

import { useForm } from 'react-hook-form';

export type AddStudentForm = {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
};

export default function AddStudent({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (v: AddStudentForm) => void;
  isSubmitting?: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddStudentForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      groupId: 1,
    },
  });

  const submit = (data: AddStudentForm) => {
    onSubmit({ ...data, groupId: Number(data.groupId) });
    reset({ firstName: '', lastName: '', middleName: '', groupId: 1 });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3 max-w-md mb-6">
      <div className="flex flex-col gap-1">
        <label className="font-medium">Фамилия</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Иванов"
          {...register('lastName', { required: 'Введите фамилию' })}
        />
        {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Имя</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Иван"
          {...register('firstName', { required: 'Введите имя' })}
        />
        {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Отчество</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Иванович"
          {...register('middleName', { required: 'Введите отчество' })}
        />
        {errors.middleName && <span className="text-red-600 text-sm">{errors.middleName.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">ID группы</label>
        <input
          className="border rounded px-3 py-2"
          type="number"
          min={1}
          {...register('groupId', {
            required: 'Укажите группу',
            valueAsNumber: true,
            min: { value: 1, message: 'Минимум 1' },
          })}
        />
        {errors.groupId && <span className="text-red-600 text-sm">{errors.groupId.message}</span>}
      </div>

      <button className="border rounded px-4 py-2 font-medium" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Добавляем…' : 'Добавить студента'}
      </button>
    </form>
  );
}
