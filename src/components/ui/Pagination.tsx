import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function pageList(page: number, total: number): Array<number | 'gap-start' | 'gap-end'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  const out: Array<number | 'gap-start' | 'gap-end'> = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(i === 1 ? 'gap-start' : 'gap-end');
    out.push(p);
  });
  return out;
}

const btn = 'inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium';

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page" className={cn(btn, 'border-line bg-white hover:bg-surface disabled:opacity-40')}>
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      {pageList(page, totalPages).map((p) =>
        typeof p === 'string' ? (
          <span key={p} className="px-1 text-muted" aria-hidden="true">&hellip;</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={cn(btn, p === page ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white hover:bg-surface')}
          >
            {p}
          </button>
        ),
      )}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next page" className={cn(btn, 'border-line bg-white hover:bg-surface disabled:opacity-40')}>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
