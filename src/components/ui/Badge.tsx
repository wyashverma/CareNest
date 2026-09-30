import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

const variants: Record<BadgeVariant, string> = {
  neutral: 'bg-surface text-muted border border-line',
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = 'neutral', className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium', variants[variant], className)}
      {...rest}
    />
  );
}
