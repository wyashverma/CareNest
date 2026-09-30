import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { LocationSelector } from '@/components/location/LocationSelector';
import { popularSearches } from '@/data/searchIndex';
import { HeroIllustration } from './HeroIllustration';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line bg-brand-50">
      <Container className="grid items-center gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div>
          <h1 id="hero-title" className="max-w-xl text-3xl font-bold sm:text-4xl">
            Healthcare, All in One Place
          </h1>
          <p className="mt-3 max-w-lg text-base text-muted sm:text-lg">
            Medicines, doctors, hospitals, home care and healthcare services &mdash; all from one trusted platform.
          </p>

          <div className="mt-6 flex flex-col gap-2 rounded-lg bg-white p-2 shadow-card sm:flex-row sm:items-center">
            <div className="border-b border-line pb-2 sm:border-0 sm:pb-0">
              <LocationSelector variant="field" align="left" />
            </div>
            <span className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
            <GlobalSearch variant="hero" showButton className="flex-1" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted">Popular searches:</span>
            {popularSearches.map((term) => (
              <Link
                key={term}
                to={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-md border border-line bg-white px-2.5 py-1 text-sm hover:border-brand-600 hover:text-brand-700"
              >
                {term}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton to="/doctors" size="lg">Find a doctor</LinkButton>
            <LinkButton to="/medicines" size="lg" variant="outline">Order medicines</LinkButton>
            <LinkButton to="/hospital-beds" size="lg" variant="outline">Check hospital beds</LinkButton>
          </div>
        </div>

        <HeroIllustration className="hidden h-auto w-full max-w-lg justify-self-end lg:block" />
      </Container>
    </section>
  );
}
