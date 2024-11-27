import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, logout, LoginCredentials, RegisterData } from '../api/auth';

export function useAuth() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
    },
  });

  const handleLogout = () => {
    logout();
    queryClient.setQueryData(['user'], null);
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: handleLogout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
  };
}