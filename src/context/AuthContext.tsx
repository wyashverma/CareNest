import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import type { User } from '@/types/user';
import { readJSON, removeKey, writeJSON } from '@/utils/storage';

export interface AuthContextValue {
  user: User | null;
  /** MOCK: signs in a demo user. Replace with a real authService call. */
  loginAsDemoUser: () => void;
  logout: () => void;
}

const STORAGE_KEY = 'carenest.demoUser';
const DEMO_USER: User = { id: 'demo-1', name: 'Demo User', email: 'demo@carenest.example' };

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readJSON<User | null>(STORAGE_KEY, null));

  const loginAsDemoUser = useCallback(() => {
    writeJSON(STORAGE_KEY, DEMO_USER);
    setUser(DEMO_USER);
  }, []);

  const logout = useCallback(() => {
    removeKey(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loginAsDemoUser, logout }), [user, loginAsDemoUser, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
