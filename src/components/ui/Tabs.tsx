import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/** Accessible tabs: arrow keys, Home/End, roving tabindex. */
export function Tabs({ tabs, label }: { tabs: TabItem[]; label: string }) {
  const base = useId();
  const [selected, setSelected] = useState(tabs[0]?.id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const move = (index: number) => {
    const tab = tabs[(index + tabs.length) % tabs.length];
    setSelected(tab.id);
    refs.current[tab.id]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); move(index + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); move(index - 1); }
    else if (e.key === 'Home') { e.preventDefault(); move(0); }
    else if (e.key === 'End') { e.preventDefault(); move(tabs.length - 1); }
  };

  const active = tabs.find((t) => t.id === selected) ?? tabs[0];

  return (
    <div>
      <div role="tablist" aria-label={label} className="-mx-4 flex gap-1 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab, i) => {
          const isActive = tab.id === active.id;
          return (
            <button
              key={tab.id}
              ref={(el) => { refs.current[tab.id] = el; }}
              type="button"
              role="tab"
              id={`${base}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setSelected(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                isActive ? 'border-brand-600 text-brand-700' : 'border-transparent text-muted hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${base}-panel-${active.id}`} aria-labelledby={`${base}-tab-${active.id}`} tabIndex={0} className="pt-5">
        {active.content}
      </div>
    </div>
  );
}
