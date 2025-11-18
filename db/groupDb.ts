import { Group } from './entity/Group.entity';
import type GroupInterface from '@/types/GroupInterface';
import { initializeDataSource } from './AppDataSource';

export const getGroupsDb = async (): Promise<GroupInterface[]> => {
  const dataSource = await initializeDataSource();
  const groupRepository = dataSource.getRepository(Group);

  const groups = await groupRepository.find({
    order: { id: 'ASC' },
  });

  return groups as GroupInterface[];
};

export const addGroupsDb = async (groupFields: Omit<GroupInterface, 'id'>): Promise<GroupInterface> => {
  const dataSource = await initializeDataSource();
  const groupRepository = dataSource.getRepository(Group);

  const group = new Group();

  const newGroup = await groupRepository.save({
    ...group,
    ...groupFields,
  });

  return newGroup;
};
