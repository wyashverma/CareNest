import { Container } from '@/components/ui/Container';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { quickServices } from '@/data/services';

export function QuickServices() {
  return (
    <section aria-labelledby="services-title" className="py-10 lg:py-14">
      <Container>
        <h2 id="services-title" className="text-2xl">What do you need today?</h2>
        <p className="mt-1 text-muted">Choose a service to get started.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickServices.map((service) => (
            <li key={service.title}>
              <ServiceCard {...service} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
