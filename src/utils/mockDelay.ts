/** MOCK ONLY: simulates network latency so loading states are visible. Remove when services call a real API. */
export function mockDelay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
