import { popularCities } from '@/data/locations';
import { mockDelay } from '@/utils/mockDelay';
import { USE_MOCK } from './http/config';
import { apiGet } from './http/apiClient';

export async function listCities(): Promise<string[]> {
  if (USE_MOCK) return mockDelay(popularCities, 0); // MOCK
  return apiGet<string[]>('/locations/cities');
}
