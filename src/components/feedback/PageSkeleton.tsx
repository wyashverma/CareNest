import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

/** Suspense fallback while a lazy route loads. */
export function PageSkeleton() {
  return (
    <Container className="py-8" aria-busy="true" aria-label="Loading page">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="mt-3 h-4 w-2/3" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    </Container>
  );
}
