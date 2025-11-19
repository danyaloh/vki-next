'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type GroupInterface from '@/types/GroupInterface';
import { getGroupsApi, addGroupApi, type AddGroupPayload } from '@/api/groupsApi';

const QUERY_KEY = ['groups'];

const useGroups = () => {
  const queryClient = useQueryClient();

  const {
    data: groups = [],
    isLoading,
    isError,
    error,
  } = useQuery<GroupInterface[]>({
    queryKey: QUERY_KEY,
    queryFn: getGroupsApi,
  });

  const { mutate: addGroupMutate, isPending: isAdding } = useMutation({
    mutationFn: addGroupApi,

    onMutate: async (payload: AddGroupPayload) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<GroupInterface[]>(QUERY_KEY);

      const optimistic: GroupInterface = {
        id: -Date.now(),
        name: payload.name,
        contacts: payload.contacts,
        students: [],
      };

      queryClient.setQueryData<GroupInterface[]>(
        QUERY_KEY,
        (old = []) => [...old, optimistic],
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(QUERY_KEY, ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    groups,
    isLoading,
    isError,
    error,
    addGroupMutate,
    isAdding,
  };
};

export default useGroups;
