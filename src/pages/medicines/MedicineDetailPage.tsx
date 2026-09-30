import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchX, ShoppingCart, Truck, Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { Button, LinkButton } from '@/components/ui/Button';
import { PriceTag } from '@/components/ui/PriceTag';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tabs } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { MedicalDisclaimer } from '@/components/feedback/MedicalDisclaimer';
import { MedicineCard } from '@/components/cards/MedicineCard';
import { MedicineImage } from '@/components/cards/MedicineImage';
import { PrescriptionUpload } from '@/sections/medicines/PrescriptionUpload';
import { useAsync } from '@/hooks/useAsync';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';
import { getMedicine, getRelatedMedicines } from '@/services/medicineService';
import type { Medicine } from '@/types/medicine';
import { MAX_QUANTITY, medicineToCartItem } from '@/utils/medicine';

function DetailSkeleton() {
  return (
    <div className="mt-6 grid gap-8 md:grid-cols-2" aria-busy="true" aria-label="Loading product">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  );
}

export default function MedicineDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = useAsync(() => getMedicine(id), [id]);
  const related = useAsync(() => getRelatedMedicines(id), [id]);

  useEffect(() => setQuantity(1), [id]);

  const crumbs = (m?: Medicine) => [
    { label: 'Home', to: '/' },
    { label: 'Medicines', to: '/medicines' },
    ...(m ? [{ label: m.category, to: `/medicines?category=${encodeURIComponent(m.category)}` }, { label: m.name }] : []),
  ];

  if (product.status === 'loading') {
    return (
      <Container className="py-6 lg:py-8">
        <Breadcrumbs items={crumbs()} />
        <DetailSkeleton />
      </Container>
    );
  }

  if (product.status === 'error') {
    return (
      <Container className="py-6 lg:py-8">
        <Breadcrumbs items={crumbs()} />
        <div className="mt-6"><ErrorState title="Could not load this product" onRetry={product.refetch} /></div>
      </Container>
    );
  }

  const m = product.data;
  if (!m) {
    return (
      <Container className="py-6 lg:py-8">
        <Breadcrumbs items={crumbs()} />
        <div className="mt-6">
          <EmptyState icon={SearchX} title="Medicine not found" description="This product may have been removed or the link is incorrect." action={<LinkButton to="/medicines">Browse medicines</LinkButton>} />
        </div>
      </Container>
    );
  }

  const unavailable = m.availability === 'unavailable';

  const addToCart = () => {
    addItem(medicineToCartItem(m, quantity));
    showToast(`${quantity} × ${m.name} added to cart`, 'success');
  };

  const buyNow = () => {
    addItem(medicineToCartItem(m, quantity));
    navigate('/cart');
  };

  const handleRelatedAdd = (r: Medicine) => {
    addItem(medicineToCartItem(r));
    showToast(`${r.name} added to cart`, 'success');
  };

  return (
    <Container className="py-6 lg:py-8">
      <Breadcrumbs items={crumbs(m)} />

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="aspect-square w-full overflow-hidden rounded-lg border border-line bg-white md:sticky md:top-32 md:self-start">
          <MedicineImage form={m.form} category={m.category} />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <AvailabilityBadge status={m.availability} />
            {m.requiresPrescription && <Badge variant="brand">Prescription required</Badge>}
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl">{m.name}</h1>
          <p className="mt-1 text-sm text-muted">By {m.manufacturer}</p>

          <div className="mt-5"><PriceTag size="lg" price={m.price} mrp={m.mrp} discountPct={m.discountPct} /></div>
          <p className="mt-1 text-xs text-muted">Sample price for this demo. {m.packSize}.</p>

          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Truck className="h-4 w-4" aria-hidden="true" />
            {unavailable ? 'Delivery is not available while this item is unavailable.' : 'Estimated delivery in 1 to 3 days (sample estimate)'}
          </p>

          {unavailable ? (
            <p role="status" className="mt-5 rounded-md bg-surface p-3 text-sm text-muted">This item is currently unavailable. Browse similar products below.</p>
          ) : (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} max={MAX_QUANTITY} />
              <Button onClick={addToCart} size="lg"><ShoppingCart className="h-4 w-4" aria-hidden="true" />Add to Cart</Button>
              <Button onClick={buyNow} size="lg" variant="outline"><Zap className="h-4 w-4" aria-hidden="true" />Buy now</Button>
            </div>
          )}

          {m.requiresPrescription && <div className="mt-6"><PrescriptionUpload /></div>}

          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
            <dt className="text-muted">Manufacturer</dt><dd>{m.manufacturer}</dd>
            <dt className="text-muted">Brand</dt><dd>{m.brand}</dd>
            <dt className="text-muted">Generic name</dt><dd>{m.genericName}</dd>
            <dt className="text-muted">Category</dt><dd>{m.category}</dd>
            <dt className="text-muted">Pack size</dt><dd>{m.packSize}</dd>
          </dl>
        </div>
      </div>

      <section aria-label="Product information" className="mt-10 rounded-lg border border-line bg-white p-4 sm:p-6">
        <Tabs
          label="Product information"
          tabs={[
            {
              id: 'composition',
              label: 'Composition',
              content: (
                <div>
                  <ul className="list-inside list-disc space-y-1 text-sm">{m.composition.map((c) => <li key={c}>{c}</li>)}</ul>
                  <p className="mt-3 text-sm text-muted">Generic name: {m.genericName}</p>
                </div>
              ),
            },
            {
              id: 'uses',
              label: 'Uses & directions',
              content: (
                <div className="space-y-3 text-sm">
                  <p><span className="font-semibold">General information: </span>{m.uses}</p>
                  <p><span className="font-semibold">Directions: </span>Follow the directions on the label or the instructions given by your doctor or pharmacist.</p>
                </div>
              ),
            },
            {
              id: 'safety',
              label: 'Storage & safety',
              content: (
                <div className="space-y-3 text-sm">
                  <p><span className="font-semibold">Storage: </span>{m.storage}</p>
                  <p><span className="font-semibold">Safety: </span>Read the label and leaflet for warnings, possible side effects and interactions. If you feel unwell after using a product, stop and speak to a healthcare professional.</p>
                </div>
              ),
            },
          ]}
        />
      </section>

      <MedicalDisclaimer className="mt-6" />

      {related.status === 'success' && related.data && related.data.length > 0 && (
        <section aria-labelledby="related-title" className="mt-12">
          <h2 id="related-title" className="text-xl">More in {m.category}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.data.map((r) => <li key={r.id}><MedicineCard medicine={r} onAddToCart={handleRelatedAdd} /></li>)}
          </ul>
        </section>
      )}
    </Container>
  );
}
