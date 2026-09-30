import { X } from 'lucide-react';

export interface FilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export function FilterChips({ chips, onClearAll }: { chips: FilterChip[]; onClearAll: () => void }) {
  if (!chips.length) return null;
  return (
    <ul aria-label="Active filters" className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button type="button" onClick={chip.onRemove} className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2.5 py-1 text-sm text-brand-700 hover:bg-brand-100" aria-label={`Remove filter: ${chip.label}`}>
            {chip.label}
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={onClearAll} className="px-1 text-sm font-medium text-brand-700 hover:underline">Clear all</button>
      </li>
    </ul>
  );
}
