import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAlgorithms, uploadAlgorithm, purchaseAlgorithm } from '../api/algorithms';
import { Algorithm } from '../types';

export function useAlgorithms() {
  const queryClient = useQueryClient();

  const algorithmsQuery = useQuery({
    queryKey: ['algorithms'],
    queryFn: getAlgorithms,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadAlgorithm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['algorithms'] });
    },
  });

  const purchaseMutation = useMutation({
    mutationFn: purchaseAlgorithm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-purchases'] });
    },
  });

  return {
    algorithms: algorithmsQuery.data || [],
    isLoading: algorithmsQuery.isLoading,
    error: algorithmsQuery.error,
    upload: uploadMutation.mutate,
    purchase: purchaseMutation.mutate,
    isUploading: uploadMutation.isPending,
    isPurchasing: purchaseMutation.isPending,
  };
}