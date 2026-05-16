import api from './axiosInstance';

function normalizeApiUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim().replace(/\/$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

export function resolveApiBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv) return normalizeApiUrl(fromEnv);

  if (import.meta.env.DEV) return 'http://localhost:5261/api';

  return '/api';
}

export async function configureApi() {
  let baseURL = resolveApiBaseUrl();

  if (!import.meta.env.VITE_API_URL) {
    try {
      const res = await fetch(`/config.json?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const fromConfig = normalizeApiUrl(data.apiUrl);
        if (fromConfig) baseURL = fromConfig;
      }
    } catch {
      /* use default */
    }
  }

  api.defaults.baseURL = baseURL;
  return baseURL;
}
