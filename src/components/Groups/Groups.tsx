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
    <div className={styles.GroupsPage}>
      <div className={styles.GroupsLayout}>
        <section className={styles.GroupsList}>
          {groups.map((group: GroupInterface) => (
            <div key={group.id} className={styles.GroupCard}>
              <h2 className={styles.GroupTitle}>{group.name}</h2>

              {group.students && group.students.length > 0 ? (
                <ul className={styles.GroupStudents}>
                  {group.students.map((s) => (
                    <li key={s.id}>
                      {s.lastName} {s.firstName} {s.middleName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.GroupEmpty}>В группе пока нет студентов</p>
              )}
            </div>
          ))}
        </section>
        <aside className={styles.AddGroupPanel}>
          <h2 className={styles.AddGroupTitle}>Новая группа</h2>
          <AddGroup onSubmit={handleAddGroup} isSubmitting={isAdding} />
        </aside>
      </div>
    </div>
  );
};

export default Groups;
