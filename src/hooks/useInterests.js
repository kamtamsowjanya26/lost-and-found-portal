// src/hooks/useInterests.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

// This hook is used to send "I'm interested" for an item
export function useInterestMutation(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId) => {
      const res = await api.post('/interests', {
        itemId,
        userId,
        status: 'interested',
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['my-interests', userId] });
    },
  });
}

// This hook fetches all interests of the current user
export function useMyInterests(userId) {
  return useQuery({
    queryKey: ['my-interests', userId],
    queryFn: async () => {
      // GET /interests?userId=u1&_expand=item
      const res = await api.get(`/interests?userId=${userId}&_expand=item`);
      return res.data;
    },
    enabled: !!userId,
  });
}
