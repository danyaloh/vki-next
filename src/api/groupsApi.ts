import type GroupInterface from '@/types/GroupInterface';

const base = process.env.NEXT_PUBLIC_API ?? '/api/';

export const getGroupsApi = async (): Promise<GroupInterface[]> => {
  try {
    const response = await fetch(`${base}groups`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }

    const groups = (await response.json()) as GroupInterface[];
    return groups;
  } catch (err) {
    console.log('>>> getGroupsApi', err);
    return [] as GroupInterface[];
  }
};
