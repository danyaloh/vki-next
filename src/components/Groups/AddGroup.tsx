'use client';

import { useForm } from 'react-hook-form';
import styles from './AddGroup.module.scss';

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
      className={styles.Form}
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <div className={styles.Field}>
        <label className={styles.Label}>Название группы</label>
        <input
          className={styles.Input}
          placeholder="Например: 2207d2"
          {...register('name', { required: 'Введите название группы' })}
        />
        {errors.name && (
          <span className={styles.Error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.Field}>
        <label className={styles.Label}>Контакты (необязательно)</label>
        <input
          className={styles.Input}
          placeholder="Куратор, контакты…"
          {...register('contacts')}
        />
      </div>

      <button
        className={styles.SubmitButton}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Добавляем…' : 'Добавить группу'}
      </button>
    </form>
  );
};

export default AddGroup;
