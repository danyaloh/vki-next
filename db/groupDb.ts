import { Group } from './entity/Group.entity';
import { initializeDataSource } from './AppDataSource';
import type GroupInterface from '@/types/GroupInterface';
import type StudentInterface from '@/types/StudentInterface';

const mapGroupToInterface = (g: Group): GroupInterface => {
  const students: StudentInterface[] =
    g.students?.map((s) => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      middleName: s.middleName,
      isDeleted: false,
      groupId: s.groupId,
    })) ?? [];

  return {
    id: g.id,
    name: g.name,
    contacts: g.contacts ?? '',
    students,
  };
};

export const getGroupsDb = async (): Promise<GroupInterface[]> => {
  const ds = await initializeDataSource();
  const groupRepo = ds.getRepository(Group);

  const groups = await groupRepo.find({
    order: { id: 'ASC' },
    relations: ['students'],
  });

  return groups.map(mapGroupToInterface);
};

export const addGroupsDb = async (fields: {
  name: string;
  contacts?: string;
}): Promise<GroupInterface> => {
  const ds = await initializeDataSource();
  const groupRepo = ds.getRepository(Group);

  const entity = groupRepo.create({
    name: fields.name,
    contacts: fields.contacts,
  });

  const saved = await groupRepo.save(entity);

  return {
    id: saved.id,
    name: saved.name,
    contacts: saved.contacts ?? '',
    students: [],
  };
};
