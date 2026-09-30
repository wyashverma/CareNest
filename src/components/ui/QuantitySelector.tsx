import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function QuantitySelector({ value, onChange, min = 1, max = 10, label = 'Quantity' }: QuantitySelectorProps) {
  const btn = 'inline-flex h-11 w-11 items-center justify-center hover:bg-surface disabled:opacity-40';
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-md border border-line bg-white">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <output aria-live="polite" className="w-10 text-center text-sm font-semibold">{value}</output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
