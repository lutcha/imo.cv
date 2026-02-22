import { apiClient } from './client';
import type { User } from '@/types/user';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login/', payload);
  return data;
}

export async function refreshToken(refresh: string): Promise<{ access: string }> {
  const { data } = await apiClient.post<{ access: string }>('/auth/refresh/', {
    refresh,
  });
  return data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout/').catch(() => {});
}
