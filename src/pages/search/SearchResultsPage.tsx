import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Search, SearchX } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { categoryIcons } from '@/components/search/categoryIcons';
import { useAsync } from '@/hooks/useAsync';
import { searchAll } from '@/services/searchService';
import type { SearchGroup } from '@/types/search';

const NONE: SearchGroup[] = [];

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = (params.get('q') ?? '').trim();
  const valid = q.length >= 2;

  const { status, data, refetch } = useAsync<SearchGroup[]>(
    () => (valid ? searchAll(q, { limitPerCategory: 20 }) : Promise.resolve(NONE)),
    [q],
  );

  return (
    <Container className="py-8">
      <h1 className="text-2xl">{valid ? <>Results for &ldquo;{q}&rdquo;</> : 'Search'}</h1>
      <GlobalSearch key={q} initialQuery={q} className="mt-4 max-w-xl" />

      <div className="mt-8">
        {!valid && (
          <EmptyState icon={Search} title="Search CareNest" description="Enter at least 2 characters to find medicines, doctors, hospitals, lab tests, vaccines, equipment and home care." />
        )}

        {valid && status === 'loading' && (
          <div className="space-y-3" aria-busy="true" aria-label="Loading results">
            {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-16" />)}
          </div>
        )}

        {valid && status === 'error' && <ErrorState title="Could not load results" message="Check your connection and try again." onRetry={refetch} />}

        {valid && status === 'success' && data?.length === 0 && (
          <EmptyState
            icon={SearchX}
            title={`No results for \u201C${q}\u201D`}
            description="Check the spelling or try a broader term, such as a medicine name, specialisation or service."
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <LinkButton to="/medicines" variant="outline" size="sm">Browse medicines</LinkButton>
                <LinkButton to="/doctors" variant="outline" size="sm">Find a doctor</LinkButton>
                <LinkButton to="/hospital-beds" variant="outline" size="sm">Hospital beds</LinkButton>
              </div>
            }
          />
        )}

        {valid && status === 'success' && data && data.length > 0 && (
          <div className="space-y-8">
            {data.map((group) => {
              const Icon = categoryIcons[group.category];
              return (
                <section key={group.category} aria-labelledby={`grp-${group.category}`}>
                  <h2 id={`grp-${group.category}`} className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                    {group.label}
                    <span className="text-sm font-normal text-muted">({group.total})</span>
                  </h2>
                  <ul className="mt-3 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <Link to={item.to} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface">
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium">{item.title}</span>
                            <span className="block truncate text-xs text-muted">{item.subtitle}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}
