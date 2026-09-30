import { cn } from '@/utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0B6E8A" />
        <path d="M14 8h4v6h6v4h-6v6h-4v-6H8v-4h6z" fill="#fff" />
      </svg>
      <span className="text-xl font-bold tracking-tight text-ink">CareNest</span>
    </span>
  );
}
