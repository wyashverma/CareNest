import { Siren } from 'lucide-react';
import { cn } from '@/utils/cn';

export const EMERGENCY_TEXT =
  'If this is a medical emergency, contact your local emergency service or go to the nearest emergency department.';

export function EmergencyNotice({ className }: { className?: string }) {
  return (
    <div role="note" className={cn('flex items-start gap-3 rounded-lg border border-danger/30 bg-danger-soft p-3 text-sm text-danger', className)}>
      <Siren className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="font-medium">{EMERGENCY_TEXT}</p>
    </div>
  );
}
