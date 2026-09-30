import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { MedicineQuery, MedicineSort, PrescriptionFilter } from '@/types/medicine';

export const PAGE_SIZE = 12;
const SORTS: MedicineSort[] = ['relevance', 'price-asc', 'price-desc', 'discount', 'name'];
const RX: PrescriptionFilter[] = ['all', 'required', 'not-required'];

function parse(params: URLSearchParams): MedicineQuery {
  const sort = params.get('sort') as MedicineSort;
  const rx = params.get('rx') as PrescriptionFilter;
  const page = Number(params.get('page'));
  return {
    q: params.get('q') ?? '',
    category: params.get('category') ?? undefined,
    brands: params.getAll('brand'),
    price: params.get('price') ?? undefined,
    rx: RX.includes(rx) ? rx : 'all',
    inStock: params.get('stock') === '1',
    sort: SORTS.includes(sort) ? sort : 'relevance',
    page: Number.isInteger(page) && page > 0 ? page : 1,
    pageSize: PAGE_SIZE,
  };
}

function serialize(q: MedicineQuery): URLSearchParams {
  const p = new URLSearchParams();
  if (q.q) p.set('q', q.q);
  if (q.category) p.set('category', q.category);
  q.brands.forEach((b) => p.append('brand', b));
  if (q.price) p.set('price', q.price);
  if (q.rx !== 'all') p.set('rx', q.rx);
  if (q.inStock) p.set('stock', '1');
  if (q.sort !== 'relevance') p.set('sort', q.sort);
  if (q.page > 1) p.set('page', String(q.page));
  return p;
}

/** Keeps listing filters in the URL so results are shareable and the back button works. */
export function useMedicineFilters() {
  const [params, setParams] = useSearchParams();
  const query = useMemo(() => parse(params), [params]);

  const update = useCallback(
    (patch: Partial<MedicineQuery>, opts?: { replace?: boolean }) => {
      const next = { ...parse(params), ...patch, page: patch.page ?? 1 };
      setParams(serialize(next), { replace: opts?.replace });
    },
    [params, setParams],
  );

  const clearFilters = useCallback(
    () => update({ category: undefined, brands: [], price: undefined, rx: 'all', inStock: false }),
    [update],
  );

  return { query, update, clearFilters };
}
