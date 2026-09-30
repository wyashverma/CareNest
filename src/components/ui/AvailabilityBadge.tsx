import { CheckCircle2, CircleAlert, CircleSlash } from 'lucide-react';
import type { Availability } from '@/types/common';
import { Badge, type BadgeVariant } from './Badge';

const config: Record<Availability, { label: string; variant: BadgeVariant; Icon: typeof CheckCircle2 }> = {
  available: { label: 'Available', variant: 'success', Icon: CheckCircle2 },
  limited: { label: 'Limited availability', variant: 'warning', Icon: CircleAlert },
  unavailable: { label: 'Currently unavailable', variant: 'neutral', Icon: CircleSlash },
};

/** Shared by beds, vaccines, doctors and equipment. Icon + text, so colour is never the only signal. */
export function AvailabilityBadge({ status }: { status: Availability }) {
  const { label, variant, Icon } = config[status];
  return (
    <Badge variant={variant}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </Badge>
  );
}
