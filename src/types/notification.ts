export type NotificationType = 'appointment' | 'order' | 'delivery' | 'booking' | 'prescription' | 'vaccine';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string; // ISO date
  read: boolean;
}
