import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { PageSkeleton } from '@/components/feedback/PageSkeleton';
import { dashboardSections } from '@/data/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

/** Sidebar on desktop, horizontal scrolling tabs on mobile. */
export function DashboardLayout() {
  const { user } = useAuth();

  return (
    <Container className="py-6 lg:py-8">
      <h1 className="text-2xl">Hello, {user?.name ?? 'there'}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="Dashboard" className="lg:rounded-lg lg:border lg:border-line lg:bg-white lg:p-2">
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:block lg:overflow-visible lg:px-0 lg:pb-0">
            {dashboardSections.map(({ slug, label, icon: Icon }) => (
              <li key={slug} className="shrink-0">
                <NavLink
                  to={slug ? `/dashboard/${slug}` : '/dashboard'}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 items-center gap-2 whitespace-nowrap rounded-md px-3 text-sm font-medium',
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-surface hover:text-ink',
                    )
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
