import axios from 'axios';

const API_BASE_URL =
  typeof window !== 'undefined'
    ? '/api/backend'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: typeof window !== 'undefined' ? '' : API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.baseURL = '/api/backend';
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.dispatchEvent(new CustomEvent('imocv:logout'));
        window.location.href = '/agente/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
