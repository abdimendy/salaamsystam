import axios from 'axios';
import { resolveApiBaseUrl } from './configureApi';

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('yellowbook_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLogin = error.config?.url?.includes('/auth/login');
      if (!isLogin) {
        localStorage.removeItem('yellowbook_token');
        localStorage.removeItem('yellowbook_user');
        localStorage.removeItem('yellowbook_expires');
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
        }
      }
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      (error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : null) ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject({ ...error, friendlyMessage: message });
  }
);

export default api;
