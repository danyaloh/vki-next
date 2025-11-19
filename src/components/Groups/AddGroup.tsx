'use client';

import { useForm } from 'react-hook-form';

export type AddGroupForm = {
  name: string;
  contacts?: string;
};

interface AddGroupProps {
  onSubmit: (values: AddGroupForm) => void;
  isSubmitting: boolean;
}

const AddGroup = ({
  onSubmit,
  isSubmitting,
}: AddGroupProps): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddGroupForm>({
    defaultValues: {
      name: '',
      contacts: '',
    },
  });

  const handleFormSubmit = (values: AddGroupForm): void => {
    onSubmit(values);
    reset();
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-md mb-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label className="font-medium">Название группы</label>
        <input
          className="border rounded px-3 py-2"
          placeholder="Группа 1"
          {...register('name', { required: 'Введите название группы' })}
        />
        {errors.name && (
          <span className="text-red-600 text-sm">
            {errors.name.message}
          </span>
        )}
      </div>

      <button
        className="border rounded px-4 py-2 font-medium"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Добавляем…' : 'Добавить группу'}
      </button>
    </form>
  );
};

export default AddGroup;
