/** Flip VITE_USE_MOCK=false to make services use the REST API instead of mock data. */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '/api';
