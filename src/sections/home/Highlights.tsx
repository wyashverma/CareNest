import { BadgeIndianRupee, CalendarCheck, FileUp, Video } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmergencyNotice } from '@/components/feedback/EmergencyNotice';

const points = [
  { icon: BadgeIndianRupee, title: 'Prices upfront', body: 'See fees, discounts and totals before you book or buy.' },
  { icon: CalendarCheck, title: 'Availability at a glance', body: 'Beds, slots and stock are labelled clearly. In this demo they are sample data.' },
  { icon: Video, title: 'Care where you need it', body: 'Online, clinic or home visits for doctors, nurses and caregivers.' },
  { icon: FileUp, title: 'Prescriptions in one place', body: 'Upload once and reuse it when you order medicines that need one.' },
];

export function Highlights() {
  return (
    <section aria-labelledby="highlights-title" className="border-t border-line bg-white py-10 lg:py-14">
      <Container>
        <h2 id="highlights-title" className="text-2xl">Simple, clear healthcare</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          {points.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
              <div>
                <h3 className="text-base">{title}</h3>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
        <EmergencyNotice className="mt-10" />
      </Container>
    </section>
  );
}
