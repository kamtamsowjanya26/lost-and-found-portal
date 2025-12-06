// src/hooks/useClaimItem.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

// Hook to mark an item as claimed
export function useClaimItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId) => {
      // PATCH /items/:id with claimed: true
      const res = await api.patch(`/items/${itemId}`, {
        claimed: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      // Refresh items list and this specific item
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['items', data.id] });
    },
  });
}
