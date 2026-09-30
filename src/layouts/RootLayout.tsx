import { Suspense, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DemoDataBanner } from '@/components/feedback/DemoDataBanner';
import { OfflineBanner } from '@/components/feedback/OfflineBanner';
import { PageSkeleton } from '@/components/feedback/PageSkeleton';
import { ToastViewer } from '@/components/feedback/ToastViewer';
import { Navbar } from '@/sections/navbar/Navbar';
import { MobileMenu } from '@/sections/navbar/MobileMenu';
import { BottomNav } from '@/sections/navbar/BottomNav';
import { Footer } from '@/sections/footer/Footer';
import { ScrollToTop } from './ScrollToTop';

export function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-overlay"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <DemoDataBanner />
      <OfflineBanner />
      <Navbar onOpenMenu={openMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      <main id="main" className="flex-1 pb-16 lg:pb-0">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <BottomNav onOpenMenu={openMenu} />
      <ToastViewer />
    </div>
  );
}
