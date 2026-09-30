import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { EmergencyNotice } from '@/components/feedback/EmergencyNotice';
import { footerGroups } from '@/data/navigation';

const social = [
  { label: 'Facebook', icon: Facebook },
  { label: 'X (Twitter)', icon: Twitter },
  { label: 'Instagram', icon: Instagram },
  { label: 'LinkedIn', icon: Linkedin },
  { label: 'YouTube', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-10 lg:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted">
              Medicines, doctors, hospitals, home care and healthcare services in one place.
            </p>
            <ul className="mt-4 flex gap-1" aria-label="Social media">
              {social.map(({ label, icon: Icon }) => (
                <li key={label}>
                  {/* TODO: replace "#" with real profile URLs */}
                  <a href="#" aria-label={label} className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-ink">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm">{group.title}</h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted hover:text-brand-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 space-y-4 border-t border-line pt-6">
          <EmergencyNotice />
          <p className="text-xs text-muted">
            Information on this site is for general purposes and is not medical advice, diagnosis or treatment. Consult a qualified
            healthcare professional about your health. This is a demo product: all listings, prices and availability are sample data.
          </p>
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} CareNest. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
