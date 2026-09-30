import type { AppNotification } from '@/types/notification';

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();

/** MOCK DATA: sample notifications for the demo UI. */
export const notifications: AppNotification[] = [
  { id: 'n1', type: 'appointment', title: 'Appointment reminder', body: 'Sample: your consultation is scheduled for tomorrow at 10:30 AM.', createdAt: hoursAgo(1), read: false },
  { id: 'n2', type: 'delivery', title: 'Medicine delivery update', body: 'Sample: your order is out for delivery today.', createdAt: hoursAgo(3), read: false },
  { id: 'n3', type: 'order', title: 'Order shipped', body: 'Sample: order #CN-10482 has been shipped.', createdAt: hoursAgo(20), read: true },
  { id: 'n4', type: 'prescription', title: 'Prescription uploaded', body: 'Sample: your prescription file was uploaded successfully.', createdAt: hoursAgo(30), read: true },
  { id: 'n5', type: 'vaccine', title: 'Vaccine appointment reminder', body: 'Sample: vaccination slot on Friday, 11:00 AM.', createdAt: hoursAgo(50), read: true },
];
