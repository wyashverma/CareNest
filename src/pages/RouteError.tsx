import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LinkButton } from '@/components/ui/Button';

export default function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : undefined;
  return (
    <Container className="py-10">
      <ErrorState message={message ?? 'An unexpected error occurred while showing this page.'} onRetry={() => window.location.reload()} />
      <div className="mt-4 text-center">
        <LinkButton to="/" variant="ghost">Back to home</LinkButton>
      </div>
    </Container>
  );
}
