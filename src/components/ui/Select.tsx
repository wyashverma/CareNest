import { useId, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function Select({ label, options, onChange, className, ...rest }: SelectProps) {
  const id = useId();
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <label htmlFor={id} className="whitespace-nowrap text-sm text-muted">{label}</label>
      <div className="relative">
        <select
          id={id}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 appearance-none rounded-md border border-line bg-white pl-3 pr-9 text-sm font-medium"
          {...rest}
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      </div>
    </div>
  );
}
