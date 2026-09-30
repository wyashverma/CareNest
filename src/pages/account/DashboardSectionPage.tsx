import { useParams } from 'react-router-dom';
import { EmptyState } from '@/components/feedback/EmptyState';
import { dashboardSections } from '@/data/navigation';
import NotFoundPage from '@/pages/NotFoundPage';

/** One page for every dashboard section until each is built in Step 10. */
export default function DashboardSectionPage() {
  const { section = '' } = useParams();
  const current = dashboardSections.find((s) => s.slug === section);
  if (!current) return <NotFoundPage />;

  return (
    <section aria-labelledby="dash-title" className="rounded-lg border border-line bg-white p-6">
      <h2 id="dash-title" className="text-xl">{current.label}</h2>
      <p className="mt-1 text-sm text-muted">{current.description}</p>
      <div className="mt-6">
        <EmptyState icon={current.icon} title={`${current.label} is coming soon`} description="This section is planned in Step 10 of the build." />
      </div>
    </section>
  );
}
