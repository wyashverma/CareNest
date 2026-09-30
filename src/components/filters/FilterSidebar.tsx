import { cn } from '@/utils/cn';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'radio';
  options: FilterOption[];
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  /** Selected values per group. For radio groups an empty array selects the option whose value is "". */
  values: Record<string, string[]>;
  onChange: (groupId: string, values: string[]) => void;
  onClear: () => void;
  hasActive: boolean;
  /** Prefix that keeps input ids unique when the panel is rendered twice (sidebar and drawer). */
  idPrefix?: string;
  className?: string;
}

/** Generic filter panel, reusable for medicines, doctors, equipment and more. */
export function FilterSidebar({ groups, values, onChange, onClear, hasActive, idPrefix = 'f', className }: FilterSidebarProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-base">Filters</h2>
        <button type="button" onClick={onClear} disabled={!hasActive} className="text-sm font-medium text-brand-700 hover:underline disabled:text-muted disabled:no-underline">
          Clear all
        </button>
      </div>

      {groups.map((group) => {
        const selected = values[group.id] ?? [];
        return (
          <fieldset key={group.id}>
            <legend className="mb-2 text-sm font-semibold">{group.label}</legend>
            <ul className="space-y-1">
              {group.options.map((opt) => {
                const inputId = `${idPrefix}-${group.id}-${opt.value || 'any'}`;
                const checked = group.type === 'radio' ? (selected[0] ?? '') === opt.value : selected.includes(opt.value);
                return (
                  <li key={opt.value}>
                    <label htmlFor={inputId} className="flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-1 text-sm hover:bg-surface">
                      <input
                        id={inputId}
                        type={group.type}
                        name={`${idPrefix}-${group.id}`}
                        checked={checked}
                        onChange={() => {
                          if (group.type === 'radio') onChange(group.id, opt.value ? [opt.value] : []);
                          else onChange(group.id, checked ? selected.filter((v) => v !== opt.value) : [...selected, opt.value]);
                        }}
                        className="h-4 w-4 accent-brand-600"
                      />
                      <span className="flex-1">{opt.label}</span>
                      {opt.count !== undefined && <span className="text-xs text-muted">{opt.count}</span>}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        );
      })}
    </div>
  );
}
