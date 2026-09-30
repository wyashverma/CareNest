import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function OfflineBanner() {
  const online = useOnlineStatus();
  if (online) return null;
  return (
    <div role="alert" className="bg-warning-soft text-warning">
      <p className="mx-auto flex max-w-[1200px] items-center justify-center gap-2 px-4 py-2 text-sm font-medium">
        <WifiOff className="h-4 w-4" aria-hidden="true" />
        You are offline. Some information may be out of date until your connection returns.
      </p>
    </div>
  );
}
