import type GroupInterface from '@/types/GroupInterface';

export type AddGroupPayload = {
  name: string;
  contacts?: string;
};

export const getGroupsApi = async (): Promise<GroupInterface[]> => {
  const response = await fetch('/api/groups', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
  }

  const groups = (await response.json()) as GroupInterface[];
  return groups;
};

export const addGroupApi = async (
  payload: AddGroupPayload,
): Promise<GroupInterface> => {
  const response = await fetch('/api/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
  }

  const group = (await response.json()) as GroupInterface;
  return group;
};
