// src/hooks/useItems.js
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

// Fetch list of all items
export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await api.get('/items'); // GET http://localhost:4000/items
      return res.data;
    },
  });
}

// Fetch a single item by id
export function useItem(id) {
  return useQuery({
    queryKey: ['items', id],
    queryFn: async () => {
      const res = await api.get(`/items/${id}`); // GET /items/:id
      return res.data;
    },
    enabled: !!id,
  });
}
