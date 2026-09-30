import { useContext } from 'react';
import { LocationContext } from '@/context/LocationContext';

export function useUserLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useUserLocation must be used inside <LocationProvider>');
  return ctx;
}
