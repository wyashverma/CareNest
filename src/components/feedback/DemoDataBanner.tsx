import { Info } from 'lucide-react';

/** Persistent reminder that nothing on the site is live data. Remove once connected to a real backend. */
export function DemoDataBanner() {
  return (
    <div className="bg-brand-800 text-white">
      <p className="mx-auto flex max-w-[1200px] items-center justify-center gap-2 px-4 py-1.5 text-center text-xs sm:text-sm">
        <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
        Demo mode: listings, prices and availability are sample data, not real-time information.
      </p>
    </div>
  );
}
