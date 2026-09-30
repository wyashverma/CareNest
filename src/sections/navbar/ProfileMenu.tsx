import { Link, useNavigate } from 'react-router-dom';
import { CircleUser, LogOut, LayoutGrid, Package, CalendarDays, FileText } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { LinkButton } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/orders', label: 'My orders', icon: Package },
  { to: '/appointments', label: 'My appointments', icon: CalendarDays },
  { to: '/prescriptions', label: 'Prescriptions', icon: FileText },
];

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <LinkButton to="/login" size="sm" variant="outline" className="ml-1">
        Sign in
      </LinkButton>
    );
  }

  return (
    <Dropdown
      label={`Account menu for ${user.name}`}
      triggerClassName="h-11 w-11 justify-center"
      panelClassName="w-60 py-2"
      trigger={<CircleUser className="h-6 w-6" aria-hidden="true" />}
    >
      {(close) => (
        <div>
          <div className="border-b border-line px-4 pb-2 pt-1">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
          <ul className="py-1">
            {items.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link to={to} onClick={close} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-surface">
                  <Icon className="h-4 w-4 text-muted" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-line pt-1">
            <button
              type="button"
              onClick={() => {
                logout();
                close();
                navigate('/');
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-surface"
            >
              <LogOut className="h-4 w-4 text-muted" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </Dropdown>
  );
}
