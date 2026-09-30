import { formatCurrency } from '@/utils/format';
import { Badge } from './Badge';
import { cn } from '@/utils/cn';

interface PriceTagProps {
  price: number;
  mrp: number;
  discountPct: number;
  size?: 'md' | 'lg';
}

export function PriceTag({ price, mrp, discountPct, size = 'md' }: PriceTagProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={cn('font-bold text-ink', size === 'lg' ? 'text-2xl' : 'text-lg')}>{formatCurrency(price)}</span>
      {discountPct > 0 && (
        <>
          <span className="text-sm text-muted line-through">
            <span className="sr-only">MRP </span>
            {formatCurrency(mrp)}
          </span>
          <Badge variant="success">{discountPct}% off</Badge>
        </>
      )}
    </div>
  );
}
