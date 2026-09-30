import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';

/** MOCK sign-in. Replace the button with a real form + authService when a backend exists. */
export default function LoginPage() {
  const { user, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  if (user) return <Navigate to={from} replace />;

  return (
    <Container className="py-10">
      <div className="mx-auto max-w-md rounded-lg border border-line bg-white p-6 shadow-card">
        <Badge variant="warning">Demo sign-in</Badge>
        <h1 className="mt-3 text-2xl">Sign in to CareNest</h1>
        <p className="mt-2 text-sm text-muted">
          Authentication is not connected yet. Continue as a demo user to explore appointments, orders and your dashboard.
        </p>
        <Button
          fullWidth
          className="mt-6"
          onClick={() => {
            loginAsDemoUser();
            navigate(from, { replace: true });
          }}
        >
          Continue as demo user
        </Button>
      </div>
    </Container>
  );
}
