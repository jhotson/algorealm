import { apiClient } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: 'developer' | 'customer';
}

export const login = async (credentials: LoginCredentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (userData: RegisterData) => {
  const { data } = await apiClient.post('/auth/register', userData);
  localStorage.setItem('token', data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};