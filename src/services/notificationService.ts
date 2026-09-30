import { notifications } from '@/data/notifications';
import type { AppNotification } from '@/types/notification';
import { mockDelay } from '@/utils/mockDelay';
import { USE_MOCK } from './http/config';
import { apiGet } from './http/apiClient';

export async function listNotifications(): Promise<AppNotification[]> {
  if (USE_MOCK) return mockDelay(notifications); // MOCK
  return apiGet<AppNotification[]>('/notifications');
}
