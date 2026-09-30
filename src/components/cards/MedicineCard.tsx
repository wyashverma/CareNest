import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingCart } from 'lucide-react';
import type { Medicine } from '@/types/medicine';
import { Badge } from '@/components/ui/Badge';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { Button } from '@/components/ui/Button';
import { PriceTag } from '@/components/ui/PriceTag';
import { Skeleton } from '@/components/ui/Skeleton';
import { MedicineImage } from './MedicineImage';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

export const MedicineCard = memo(function MedicineCard({ medicine: m, onAddToCart }: MedicineCardProps) {
  const unavailable = m.availability === 'unavailable';
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-white p-3 transition-shadow hover:shadow-card">
      <Link to={`/medicines/${m.id}`} tabIndex={-1} aria-hidden="true" className="block aspect-square overflow-hidden rounded-md">
        <MedicineImage form={m.form} category={m.category} />
      </Link>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <AvailabilityBadge status={m.availability} />
        {m.requiresPrescription && (
          <Badge variant="brand"><FileText className="h-3.5 w-3.5" aria-hidden="true" />Prescription required</Badge>
        )}
      </div>

      <h3 className="mt-2 text-sm font-semibold leading-snug">
        <Link to={`/medicines/${m.id}`} className="hover:text-brand-700 hover:underline">{m.name}</Link>
      </h3>
      <p className="mt-0.5 text-xs text-muted">{m.manufacturer}</p>
      <p className="text-xs text-muted">{m.packSize}</p>

      <div className="mt-3 flex-1">
        <PriceTag price={m.price} mrp={m.mrp} discountPct={m.discountPct} />
      </div>

      <Button className="mt-3" fullWidth variant={unavailable ? 'outline' : 'primary'} disabled={unavailable} onClick={() => onAddToCart(m)} aria-label={unavailable ? `${m.name} is currently unavailable` : `Add ${m.name} to cart`}>
        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
        {unavailable ? 'Unavailable' : 'Add to Cart'}
      </Button>
    </article>
  );
});

export function MedicineCardSkeleton() {
  return (
    <div className="rounded-lg border border-line bg-white p-3" aria-hidden="true">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="mt-3 h-5 w-24" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-1 h-3 w-2/3" />
      <Skeleton className="mt-4 h-6 w-20" />
      <Skeleton className="mt-3 h-11 w-full" />
    </div>
  );
}
