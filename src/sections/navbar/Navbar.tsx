import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CalendarDays, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { SearchBar } from '@/components/search/SearchBar';
import { LocationSelector } from '@/components/location/LocationSelector';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileMenu } from './ProfileMenu';
import { primaryNav } from '@/data/navigation';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/utils/cn';

const iconButton = 'relative inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-surface';

export function Navbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { count } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <Container>
        <div className="flex h-16 items-center gap-2 lg:gap-4">
          <button type="button" onClick={onOpenMenu} aria-label="Open menu" className={cn(iconButton, 'lg:hidden -ml-2')}>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <Link to="/" aria-label="CareNest home" className="shrink-0">
            <Logo />
          </Link>

          <div className="mx-2 hidden max-w-xl flex-1 md:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-0.5">
            <div className="hidden md:block">
              <LocationSelector align="right" />
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              className={cn(iconButton, 'md:hidden')}
            >
              {searchOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Search className="h-5 w-5" aria-hidden="true" />}
            </button>

            <NotificationDropdown />

            <Link to="/appointments" aria-label="My appointments" className={cn(iconButton, 'hidden lg:inline-flex')}>
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </Link>

            <Link to="/cart" aria-label={count ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart'} className={iconButton}>
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white" aria-hidden="true">
                  {count}
                </span>
              )}
            </Link>

            <ProfileMenu />
          </div>
        </div>

        {/* Mobile: expandable search + location strip */}
        <div className="pb-3 md:hidden">
          {searchOpen && <SearchBar autoFocus className="mb-2" />}
          <LocationSelector align="left" />
        </div>
      </Container>

      {/* Desktop: primary navigation */}
      <nav aria-label="Primary" className="hidden border-t border-line lg:block">
        <Container>
          <ul className="flex items-center gap-1">
            {primaryNav.map(({ label, to, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex h-11 items-center border-b-2 px-3 text-sm font-medium transition-colors',
                      isActive ? 'border-brand-600 text-brand-700' : 'border-transparent text-muted hover:text-ink',
                    )
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
