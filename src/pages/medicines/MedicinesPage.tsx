import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search, SearchX, SlidersHorizontal } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { Pagination } from '@/components/ui/Pagination';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { FilterSidebar, type FilterGroup } from '@/components/filters/FilterSidebar';
import { FilterChips, type FilterChip } from '@/components/filters/FilterChips';
import { MedicineCard, MedicineCardSkeleton } from '@/components/cards/MedicineCard';
import { useAsync } from '@/hooks/useAsync';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import { useMedicineFilters } from '@/hooks/useMedicineFilters';
import { getMedicineFacets, listMedicines } from '@/services/medicineService';
import type { Medicine, MedicineSort, PrescriptionFilter } from '@/types/medicine';
import { medicineToCartItem } from '@/utils/medicine';
import { cn } from '@/utils/cn';

const PRICE_OPTIONS = [
  { value: '', label: 'Any price' },
  { value: '0-100', label: 'Under ₹100' },
  { value: '100-250', label: '₹100 to ₹250' },
  { value: '250-500', label: '₹250 to ₹500' },
  { value: '500-', label: 'Above ₹500' },
];

const RX_OPTIONS = [
  { value: '', label: 'All medicines' },
  { value: 'required', label: 'Prescription required' },
  { value: 'not-required', label: 'No prescription needed' },
];

const SORT_OPTIONS: { value: MedicineSort; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'discount', label: 'Discount' },
  { value: 'name', label: 'Name: A to Z' },
];

export default function MedicinesPage() {
  const { query, update, clearFilters } = useMedicineFilters();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const closeFilters = useCallback(() => setFiltersOpen(false), []);

  // Search box: local text, debounced into the URL. Syncs back when the URL changes from elsewhere (e.g. global search).
  const [text, setText] = useState(query.q);
  const debouncedText = useDebounce(text, 300);
  const lastPushed = useRef(query.q);
  useEffect(() => {
    if (debouncedText !== lastPushed.current) {
      lastPushed.current = debouncedText;
      update({ q: debouncedText }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);
  useEffect(() => {
    if (query.q !== lastPushed.current) {
      lastPushed.current = query.q;
      setText(query.q);
    }
  }, [query.q]);

  const facets = useAsync(getMedicineFacets, []);
  const queryKey = JSON.stringify(query);
  const list = useAsync(() => listMedicines(query), [queryKey]);

  const handleAdd = useCallback(
    (m: Medicine) => {
      addItem(medicineToCartItem(m));
      showToast(`${m.name} added to cart`, 'success');
    },
    [addItem, showToast],
  );

  const groups: FilterGroup[] = useMemo(
    () => [
      { id: 'brand', label: 'Brand', type: 'checkbox', options: (facets.data?.brands ?? []).map((b) => ({ value: b.name, label: b.name, count: b.count })) },
      { id: 'price', label: 'Price', type: 'radio', options: PRICE_OPTIONS },
      { id: 'rx', label: 'Prescription', type: 'radio', options: RX_OPTIONS },
      { id: 'stock', label: 'Availability', type: 'checkbox', options: [{ value: '1', label: 'In stock only' }] },
    ],
    [facets.data],
  );

  const values = {
    brand: query.brands,
    price: query.price ? [query.price] : [],
    rx: query.rx === 'all' ? [] : [query.rx],
    stock: query.inStock ? ['1'] : [],
  };

  const onFilterChange = (groupId: string, vals: string[]) => {
    if (groupId === 'brand') update({ brands: vals });
    else if (groupId === 'price') update({ price: vals[0] });
    else if (groupId === 'rx') update({ rx: (vals[0] as PrescriptionFilter | undefined) ?? 'all' });
    else if (groupId === 'stock') update({ inStock: vals.length > 0 });
  };

  const hasActive = Boolean(query.category || query.brands.length || query.price || query.rx !== 'all' || query.inStock);

  const chips: FilterChip[] = [
    ...(query.category ? [{ key: 'category', label: query.category, onRemove: () => update({ category: undefined }) }] : []),
    ...query.brands.map((b) => ({ key: `brand-${b}`, label: b, onRemove: () => update({ brands: query.brands.filter((x) => x !== b) }) })),
    ...(query.price ? [{ key: 'price', label: PRICE_OPTIONS.find((p) => p.value === query.price)?.label ?? query.price, onRemove: () => update({ price: undefined }) }] : []),
    ...(query.rx !== 'all' ? [{ key: 'rx', label: RX_OPTIONS.find((r) => r.value === query.rx)?.label ?? query.rx, onRemove: () => update({ rx: 'all' }) }] : []),
    ...(query.inStock ? [{ key: 'stock', label: 'In stock only', onRemove: () => update({ inStock: false }) }] : []),
  ];

  const changePage = (page: number) => {
    update({ page });
    window.scrollTo(0, 0);
  };

  const data = list.status === 'success' ? list.data : undefined;
  const from = data && data.total ? (data.page - 1) * data.pageSize + 1 : 0;
  const to = data ? Math.min(data.page * data.pageSize, data.total) : 0;

  return (
    <Container className="py-6 lg:py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Medicines' }]} />
      <h1 className="mt-3 text-2xl sm:text-3xl">Medicines &amp; healthcare products</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Prescription medicines need a valid prescription. Product information on this site is general and is not medical advice.
      </p>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
        <div role="search" className="relative flex-1 md:max-w-md">
          <label htmlFor="medicine-search" className="sr-only">Search medicines</label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="medicine-search"
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search by medicine, brand or composition"
            className="h-11 w-full rounded-md border border-line bg-white pl-10 pr-3 text-sm placeholder:text-muted"
          />
        </div>
        <div className="flex items-center justify-between gap-3 md:ml-auto">
          <Button variant="outline" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters{chips.length > 0 && ` (${chips.length})`}
          </Button>
          <Select label="Sort by" value={query.sort} options={SORT_OPTIONS} onChange={(v) => update({ sort: v as MedicineSort })} />
        </div>
      </div>

      <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 pb-1" aria-label="Categories">
          {[{ name: 'All', count: 0 }, ...(facets.data?.categories ?? [])].map((c) => {
            const active = c.name === 'All' ? !query.category : query.category === c.name;
            return (
              <li key={c.name} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ category: c.name === 'All' ? undefined : c.name })}
                  className={cn(
                    'h-10 whitespace-nowrap rounded-md border px-3 text-sm font-medium transition-colors',
                    active ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white hover:border-brand-600',
                  )}
                >
                  {c.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-32 rounded-lg border border-line bg-white p-4">
            <FilterSidebar idPrefix="d" groups={groups} values={values} onChange={onFilterChange} onClear={clearFilters} hasActive={hasActive} />
          </div>
        </aside>

        <section aria-label="Search results" className="min-w-0">
          <FilterChips chips={chips} onClearAll={clearFilters} />
          <p aria-live="polite" className="mb-4 mt-2 text-sm text-muted">
            {data ? (data.total ? `Showing ${from} to ${to} of ${data.total} results` : '0 results') : list.status === 'loading' ? 'Loading results...' : ''}
          </p>

          {list.status === 'loading' && (
            <div aria-busy="true" className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => <MedicineCardSkeleton key={i} />)}
            </div>
          )}

          {list.status === 'error' && (
            <ErrorState title="Could not load medicines" message="Check your connection and try again." onRetry={list.refetch} />
          )}

          {data && data.items.length === 0 && (
            <EmptyState
              icon={SearchX}
              title="No medicines found"
              description="Try a different name, or remove some filters to see more results."
              action={<Button variant="outline" onClick={() => { clearFilters(); update({ q: '', category: undefined, brands: [], price: undefined, rx: 'all', inStock: false }); }}>Reset search and filters</Button>}
            />
          )}

          {data && data.items.length > 0 && (
            <>
              <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
                {data.items.map((m) => (
                  <li key={m.id}><MedicineCard medicine={m} onAddToCart={handleAdd} /></li>
                ))}
              </ul>
              <div className="mt-8">
                <Pagination page={data.page} totalPages={data.totalPages} onChange={changePage} />
              </div>
            </>
          )}
        </section>
      </div>

      <Drawer open={filtersOpen} onClose={closeFilters} title="Filters" closeLabel="Close filters">
        <div className="p-4">
          <FilterSidebar idPrefix="m" groups={groups} values={values} onChange={onFilterChange} onClear={clearFilters} hasActive={hasActive} />
          <Button fullWidth className="mt-6" onClick={closeFilters}>
            {data ? `Show ${data.total} result${data.total === 1 ? '' : 's'}` : 'Show results'}
          </Button>
        </div>
      </Drawer>
    </Container>
  );
}
