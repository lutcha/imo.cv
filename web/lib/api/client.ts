import axios from 'axios';

// Browser: proxy through Next.js rewrite at /api/backend → Django /api
// Server (SSR): call backend directly with the tenant Host header
const SSR_API_BASE =
  typeof window === 'undefined'
    ? `${process.env.NEXT_INTERNAL_API_URL || 'http://backend:8000'}/api`
    : '/api/backend';

const API_BASE_URL =
  typeof window !== 'undefined' ? '/api/backend' : SSR_API_BASE;

/**
 * Server-side GET using native fetch.
 *
 * Axios uses the legacy `url.parse()` in its Node.js http adapter which
 * triggers DEP0169 on Node 22+.  On the server we bypass axios entirely and
 * hit the Django API directly with the WHATWG URL + fetch APIs.
 */
export async function ssrGet<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const base = SSR_API_BASE.replace(/\/$/, '');
  const urlObj = new URL(base + (path.startsWith('/') ? path : `/${path}`));
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) urlObj.searchParams.set(k, String(v));
    }
  }
  const tenantHost = process.env.TENANT_HOST;
  const res = await fetch(urlObj.toString(), {
    headers: {
      Accept: 'application/json',
      ...(tenantHost ? { Host: tenantHost } : {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${path}`);
  return res.json() as Promise<T>;
}

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
