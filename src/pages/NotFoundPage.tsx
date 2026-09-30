import { SearchX } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/feedback/EmptyState';
import { LinkButton } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <Container className="py-10">
      <EmptyState
        icon={SearchX}
        title="Page not found"
        description="The page you are looking for does not exist or has moved."
        action={<LinkButton to="/">Go to home</LinkButton>}
      />
    </Container>
  );
}
