import { NavLink } from 'react-router-dom';
import { Drawer } from '@/components/ui/Drawer';
import { LinkButton, Button } from '@/components/ui/Button';
import { EmergencyNotice } from '@/components/feedback/EmergencyNotice';
import { mobileExtraNav, primaryNav, type NavItem } from '@/data/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

function MenuLinks({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
  return (
    <ul className="px-2 py-2">
      {items.map(({ label, to, icon: Icon, end }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium',
                isActive ? 'bg-brand-50 text-brand-700' : 'text-ink hover:bg-surface',
              )
            }
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  return (
    <Drawer open={open} onClose={onClose} title="Menu">
      <nav aria-label="Mobile">
        <MenuLinks items={primaryNav} onNavigate={onClose} />
        <hr className="mx-4 border-line" />
        <MenuLinks items={mobileExtraNav} onNavigate={onClose} />
      </nav>
      <div className="space-y-4 p-4">
        {user ? (
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              logout();
              onClose();
            }}
          >
            Sign out
          </Button>
        ) : (
          <LinkButton to="/login" fullWidth onClick={onClose}>
            Sign in
          </LinkButton>
        )}
        <EmergencyNotice />
      </div>
    </Drawer>
  );
}
