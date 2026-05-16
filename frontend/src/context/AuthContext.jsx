import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

const TOKEN_KEY = 'yellowbook_token';
const USER_KEY = 'yellowbook_user';
const EXPIRES_KEY = 'yellowbook_expires';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem(USER_KEY);
    return username ? { username } : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useMemo(() => {
    if (!token) return false;
    const expires = localStorage.getItem(EXPIRES_KEY);
    if (expires && new Date(expires) <= new Date()) {
      return false;
    }
    return true;
  }, [token]);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (token && !isAuthenticated) {
      clearSession();
    }
  }, [token, isAuthenticated, clearSession]);

  const persistSession = (token, sessionUsername, expiresAt) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, sessionUsername);
    localStorage.setItem(EXPIRES_KEY, expiresAt);
    setToken(token);
    setUser({ username: sessionUsername });
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await authApi.login({ username, password });
      persistSession(data.token, data.username, data.expiresAt);
      return { success: true };
    } catch (err) {
      const status = err.response?.status;
      const isDevAdmin =
        import.meta.env.DEV &&
        username.trim().toLowerCase() === 'admin' &&
        password === 'Admin@123' &&
        (status === 404 || !err.response);

      if (isDevAdmin) {
        const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
        persistSession(`dev.${btoa(username)}`, username.trim(), expiresAt);
        return {
          success: true,
          devFallback: true,
          message:
            'Signed in locally. Restart the API (see scripts/restart-backend.ps1) for full JWT login.',
        };
      }

      const networkHint =
        !err.response && !import.meta.env.DEV
          ? ' Cannot reach API — restart online link (scripts/start-online.ps1).'
          : '';
      return {
        success: false,
        message: (err.friendlyMessage || 'Login failed') + networkHint,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated, loading, login, logout }),
    [user, token, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
