import { NavLink } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { bottomNav } from '@/data/navigation';
import { cn } from '@/utils/cn';

const item = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium';

/** Mobile-only bottom navigation. "Services" opens the full menu drawer. */
export function BottomNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [home, medicines, doctors, account] = bottomNav;
  const links = [home, medicines, doctors];

  return (
    <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="flex">
        {links.map(({ label, to, icon: Icon, end }) => (
          <li key={to} className="flex flex-1">
            <NavLink to={to} end={end} className={({ isActive }) => cn(item, isActive ? 'text-brand-700' : 'text-muted')}>
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
        <li className="flex flex-1">
          <button type="button" onClick={onOpenMenu} className={cn(item, 'w-full text-muted')}>
            <LayoutGrid className="h-5 w-5" aria-hidden="true" />
            Services
          </button>
        </li>
        <li className="flex flex-1">
          <NavLink to={account.to} className={({ isActive }) => cn(item, isActive ? 'text-brand-700' : 'text-muted')}>
            <account.icon className="h-5 w-5" aria-hidden="true" />
            {account.label}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
