import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { EmergencyNotice } from '@/components/feedback/EmergencyNotice';

interface ComingSoonPageProps {
  title: string;
  description: string;
  /** Roadmap step in which this page gets built. */
  step: number;
  emergency?: boolean;
}

/** Placeholder used by every route until its roadmap step is built. */
export default function ComingSoonPage({ title, description, step, emergency }: ComingSoonPageProps) {
  return (
    <Container className="py-10">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl sm:text-3xl">{title}</h1>
        <Badge variant="brand">Planned in Step {step}</Badge>
      </div>
      <p className="mt-2 max-w-2xl text-muted">{description}</p>
      {emergency && <EmergencyNotice className="mt-6 max-w-2xl" />}
    </Container>
  );
}
