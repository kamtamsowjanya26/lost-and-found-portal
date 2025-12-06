// src/hooks/useCreateItem.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values) => {
      const newItem = {
        title: values.title,
        description: values.description,
        category: values.category,
        status: values.status,
        location: values.location,
        reportedAt: new Date().toISOString(),
        claimed: false,
        tags: values.tags
          ? values.tags.split(',').map((t) => t.trim())
          : [],
        imageUrl: values.imageUrl || '',
      };

      const res = await api.post('/items', newItem);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}
