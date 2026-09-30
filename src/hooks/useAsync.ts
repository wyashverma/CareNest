import { useCallback, useEffect, useState, type DependencyList } from 'react';
import type { AsyncStatus } from '@/types/common';

interface AsyncState<T> {
  status: AsyncStatus;
  data?: T;
  error?: Error;
}

/**
 * Standard data-loading hook used by every page.
 * Keeps loading / success / error handling identical across the app.
 */
export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList = []) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, status: 'loading' }));
    fn()
      .then((data) => !cancelled && setState({ status: 'success', data }))
      .catch((e: unknown) => !cancelled && setState({ status: 'error', error: e instanceof Error ? e : new Error(String(e)) }));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, refetch };
}
