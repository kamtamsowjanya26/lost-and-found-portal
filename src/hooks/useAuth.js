// src/hooks/useAuth.js
import { useSelector } from 'react-redux';

export function useAuth() {
  // read user from Redux store
  return useSelector((state) => state.auth.user);
}
