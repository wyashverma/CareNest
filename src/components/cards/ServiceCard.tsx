import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { QuickService } from '@/data/services';

export function ServiceCard({ title, description, cta, to, icon: Icon }: QuickService) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-card motion-reduce:hover:translate-y-0"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
        {cta}
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
      </span>
    </Link>
  );
}
