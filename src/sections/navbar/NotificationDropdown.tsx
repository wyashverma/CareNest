import { Link } from 'react-router-dom';
import { Bell, CalendarClock, Package, Truck, CheckCheck, FileText, Syringe, type LucideIcon } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { useAsync } from '@/hooks/useAsync';
import { listNotifications } from '@/services/notificationService';
import type { NotificationType } from '@/types/notification';
import { formatRelativeTime } from '@/utils/format';
import { cn } from '@/utils/cn';

const icons: Record<NotificationType, LucideIcon> = {
  appointment: CalendarClock,
  order: Package,
  delivery: Truck,
  booking: CheckCheck,
  prescription: FileText,
  vaccine: Syringe,
};

export function NotificationDropdown() {
  const { status, data, refetch } = useAsync(listNotifications);
  const unread = data?.filter((n) => !n.read).length ?? 0;

  return (
    <Dropdown
      label={unread ? `Notifications, ${unread} unread` : 'Notifications'}
      triggerClassName="relative h-11 w-11 justify-center"
      panelClassName="w-[22rem]"
      trigger={
        <>
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white" aria-hidden="true">
              {unread}
            </span>
          )}
        </>
      }
    >
      {(close) => (
        <div>
          <div className="border-b border-line px-4 py-3">
            <h2 className="text-base">Notifications</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {status === 'loading' && (
              <div className="space-y-3 p-4" aria-busy="true">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            )}
            {status === 'error' && <div className="p-4"><ErrorState title="Could not load notifications" message="Try again in a moment." onRetry={refetch} /></div>}
            {status === 'success' && data?.length === 0 && <div className="p-4"><EmptyState icon={Bell} title="No notifications" description="Reminders and updates will appear here." /></div>}
            {status === 'success' && data && data.length > 0 && (
              <ul>
                {data.map((n) => {
                  const Icon = icons[n.type];
                  return (
                    <li key={n.id} className={cn('flex gap-3 border-b border-line px-4 py-3 last:border-b-0', !n.read && 'bg-brand-50/60')}>
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{n.title}{!n.read && <span className="sr-only"> (unread)</span>}</p>
                        <p className="text-sm text-muted">{n.body}</p>
                        <p className="mt-0.5 text-xs text-muted">{formatRelativeTime(n.createdAt)}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="border-t border-line p-2">
            <Link to="/notifications" onClick={close} className="block rounded-md px-3 py-2 text-center text-sm font-medium text-brand-700 hover:bg-brand-50">
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </Dropdown>
  );
}
