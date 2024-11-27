import { useQuery } from '@tanstack/react-query';
import { User } from '../types';

export function useUser() {
  return useQuery<User | null>({
    queryKey: ['user'],
    initialData: null,
  });
}