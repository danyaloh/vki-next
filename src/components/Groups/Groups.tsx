'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';
import AddGroup, { type AddGroupForm } from './AddGroup';

const Groups = (): React.ReactElement => {
  const {
    groups,
    isLoading,
    isError,
    error,
    addGroupMutate,
    isAdding,
  } = useGroups();

  const handleAddGroup = (form: AddGroupForm): void => {
    if (!isAdding) {
      addGroupMutate({
        name: form.name,
        contacts: form.contacts,
      });
    }
  };

  if (isLoading) {
    return <div>Загрузка групп…</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки: {(error as Error)?.message}</div>;
  }

  return (
    <div className={styles.Groups}>
      <AddGroup onSubmit={handleAddGroup} isSubmitting={isAdding} />
      {groups.map((group: GroupInterface) => (
        <div key={group.id} className={styles.Group}>
          <h2>{group.name}</h2>

          {group.students && group.students.length > 0 ? (
            <ul>
              {group.students.map((s) => (
                <li key={s.id}>
                  {s.lastName} {s.firstName} {s.middleName}
                </li>
              ))}
            </ul>
          ) : (
            <p>В группе пока нет студентов</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Groups;
