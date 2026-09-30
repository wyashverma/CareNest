import { Info } from 'lucide-react';
import { cn } from '@/utils/cn';

/** Separates product information from medical advice. */
export function MedicalDisclaimer({ className }: { className?: string }) {
  return (
    <div role="note" className={cn('flex items-start gap-3 rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm text-ink', className)}>
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
      <p>
        This is general product information, not medical advice. It does not replace guidance from a doctor or pharmacist. Read the
        label and leaflet, and consult a qualified healthcare professional before using any medicine.
      </p>
    </div>
  );
}
