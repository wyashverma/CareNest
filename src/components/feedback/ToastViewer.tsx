import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import type { ToastVariant } from '@/context/ToastContext';
import { cn } from '@/utils/cn';

const styles: Record<ToastVariant, { box: string; Icon: typeof Info }> = {
  info: { box: 'border-line bg-white text-ink', Icon: Info },
  success: { box: 'border-success/30 bg-success-soft text-success', Icon: CheckCircle2 },
  error: { box: 'border-danger/30 bg-danger-soft text-danger', Icon: XCircle },
};

export function ToastViewer() {
  const { toasts, dismissToast } = useToast();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 lg:bottom-6 lg:items-end lg:px-6">
      {toasts.map((t) => {
        const { box, Icon } = styles[t.variant];
        return (
          <div key={t.id} className={cn('pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-3 text-sm shadow-overlay', box)}>
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="flex-1">{t.message}</p>
            <button type="button" onClick={() => dismissToast(t.id)} aria-label="Dismiss notification" className="rounded p-0.5 hover:bg-black/5">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
