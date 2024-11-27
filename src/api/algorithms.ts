import { apiClient } from './client';
import { Algorithm } from '../types';

export const getAlgorithms = async () => {
  const { data } = await apiClient.get<Algorithm[]>('/algorithms');
  return data;
};

export const uploadAlgorithm = async (algorithmData: Partial<Algorithm>) => {
  const { data } = await apiClient.post<Algorithm>('/algorithms', algorithmData);
  return data;
};

export const purchaseAlgorithm = async ({
  algorithmId,
  type,
}: {
  algorithmId: string;
  type: 'sale' | 'lease' | 'subscription';
}) => {
  const { data } = await apiClient.post('/purchase', { algorithmId, type });
  return data;
};