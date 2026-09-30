import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAsync } from '@/hooks/useAsync';
import { useDebounce } from '@/hooks/useDebounce';
import { searchAll } from '@/services/searchService';
import type { SearchGroup } from '@/types/search';
import { categoryIcons } from './categoryIcons';
import { cn } from '@/utils/cn';

interface GlobalSearchProps {
  variant?: 'navbar' | 'hero';
  autoFocus?: boolean;
  className?: string;
  /** Show a submit button inside the form (used in the hero). */
  showButton?: boolean;
  initialQuery?: string;
  placeholder?: string;
}

const MIN_CHARS = 2;
const NO_GROUPS: SearchGroup[] = [];

/**
 * Global search with categorised suggestions (ARIA combobox + listbox).
 * Keyboard: Arrow keys move, Enter opens the highlighted result (or the full results page), Escape closes.
 */
export function GlobalSearch({
  variant = 'navbar',
  autoFocus,
  className,
  showButton,
  initialQuery = '',
  placeholder = 'Search medicines, doctors, hospitals, services...',
}: GlobalSearchProps) {
  const id = useId();
  const listId = `${id}-list`;
  const navigate = useNavigate();
  const rootRef = useRef<HTMLFormElement>(null);

  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const trimmed = query.trim();
  const debounced = useDebounce(trimmed, 200);
  const enabled = debounced.length >= MIN_CHARS;

  const { status, data, refetch } = useAsync<SearchGroup[]>(
    () => (enabled ? searchAll(debounced, { limitPerCategory: 3 }) : Promise.resolve(NO_GROUPS)),
    [debounced],
  );

  const settled = debounced === trimmed && status !== 'loading';
  const groups = settled && status === 'success' && data ? data : NO_GROUPS;
  const options = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const optionCount = options.length + (options.length ? 1 : 0); // + "see all"
  const showPanel = open && trimmed.length >= MIN_CHARS;

  useEffect(() => setActive(-1), [groups]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [open]);

  const goToResults = () => {
    if (trimmed.length === 0) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const goToItem = (to: string) => {
    setOpen(false);
    setQuery('');
    navigate(to);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    goToResults();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!optionCount) return;
      e.preventDefault();
      setOpen(true);
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((a) => (a + step + optionCount) % optionCount);
      return;
    }
    if (e.key === 'Enter' && showPanel && active >= 0) {
      e.preventDefault();
      if (active < options.length) goToItem(options[active].to);
      else goToResults();
    }
  };

  const activeId = active >= 0 ? `${id}-opt-${active}` : undefined;
  const hasResults = settled && groups.length > 0;
  let optionIndex = -1;

  return (
    <form ref={rootRef} role="search" onSubmit={onSubmit} className={cn('relative flex items-center gap-2', className)}>
      <label htmlFor={`${id}-input`} className="sr-only">
        Search medicines, doctors, hospitals and services
      </label>
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          id={`${id}-input`}
          type="text"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={hasResults ? listId : undefined}
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          autoComplete="off"
          autoFocus={autoFocus}
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={cn(
            'w-full rounded-md pl-10 pr-3 text-sm placeholder:text-muted',
            variant === 'hero'
              ? 'h-12 border border-transparent bg-transparent sm:text-base'
              : 'h-11 border border-line bg-surface focus:border-brand-600 focus:bg-white',
          )}
        />
      </div>
      {showButton && (
        <Button type="submit" size="lg" className="shrink-0">
          Search
        </Button>
      )}

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-lg border border-line bg-white py-2 text-left shadow-overlay">
          {!settled && (
            <p role="status" className="px-4 py-3 text-sm text-muted">
              Searching...
            </p>
          )}
          {settled && status === 'error' && (
            <div role="alert" className="px-4 py-3 text-sm">
              <p className="text-danger">Search is unavailable right now.</p>
              <button type="button" onClick={refetch} className="mt-1 font-medium text-brand-700 hover:underline">
                Try again
              </button>
            </div>
          )}
          {settled && status === 'success' && groups.length === 0 && (
            <p role="status" className="px-4 py-3 text-sm text-muted">
              No matches for &ldquo;{trimmed}&rdquo;. Check the spelling or try a broader term.
            </p>
          )}
          {hasResults && (
            <div id={listId} role="listbox" aria-label="Search suggestions">
              {groups.map((group) => (
                <div key={group.category} role="group" aria-labelledby={`${id}-g-${group.category}`}>
                  <p id={`${id}-g-${group.category}`} className="px-4 pb-1 pt-3 text-xs font-semibold text-muted">
                    {group.label}
                  </p>
                  {group.items.map((item) => {
                    optionIndex += 1;
                    const index = optionIndex;
                    const Icon = categoryIcons[item.category];
                    return (
                      <div
                        key={`${item.category}-${item.id}`}
                        id={`${id}-opt-${index}`}
                        role="option"
                        aria-selected={index === active}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => goToItem(item.to)}
                        className={cn('flex cursor-pointer items-center gap-3 px-4 py-2', index === active && 'bg-brand-50')}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">{item.title}</span>
                          <span className="block truncate text-xs text-muted">{item.subtitle}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div
                id={`${id}-opt-${options.length}`}
                role="option"
                aria-selected={active === options.length}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(options.length)}
                onClick={goToResults}
                className={cn('mt-1 cursor-pointer border-t border-line px-4 py-3 text-sm font-medium text-brand-700', active === options.length && 'bg-brand-50')}
              >
                See all results for &ldquo;{trimmed}&rdquo;
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
