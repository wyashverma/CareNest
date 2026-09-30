import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import type { AppLocation } from '@/types/user';
import { readJSON, writeJSON } from '@/utils/storage';

export interface LocationContextValue {
  location: AppLocation | null;
  setLocation: (location: AppLocation) => void;
}

const STORAGE_KEY = 'carenest.location';

export const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<AppLocation | null>(() => readJSON<AppLocation | null>(STORAGE_KEY, null));

  const setLocation = useCallback((next: AppLocation) => {
    writeJSON(STORAGE_KEY, next);
    setLocationState(next);
  }, []);

  const value = useMemo(() => ({ location, setLocation }), [location, setLocation]);
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
