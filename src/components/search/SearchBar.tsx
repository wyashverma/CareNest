import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

/**
 * Compact search used in the navbar.
 * TODO (Step 3): replace the redirect with the categorised global search (searchService + suggestions listbox).
 */
export function SearchBar({ className, autoFocus, placeholder = 'Search medicines, doctors, hospitals, services...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/medicines?q=${encodeURIComponent(q)}`);
  };

  return (
    <form role="search" onSubmit={onSubmit} className={cn('relative', className)}>
      <label htmlFor="global-search" className="sr-only">
        Search medicines, doctors, hospitals and services
      </label>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        id="global-search"
        type="search"
        value={query}
        autoFocus={autoFocus}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-md border border-line bg-surface pl-10 pr-3 text-sm placeholder:text-muted focus:border-brand-600 focus:bg-white"
      />
    </form>
  );
}
