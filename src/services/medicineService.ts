import { medicines } from '@/data/medicines';
import type { Paged } from '@/types/common';
import type { Medicine, MedicineFacets, MedicineQuery } from '@/types/medicine';
import { mockDelay } from '@/utils/mockDelay';
import { USE_MOCK } from './http/config';
import { apiGet } from './http/apiClient';

function parseBucket(bucket?: string): { min: number; max: number } | null {
  if (!bucket) return null;
  const [min, max] = bucket.split('-');
  return { min: Number(min) || 0, max: max ? Number(max) : Infinity };
}

/** MOCK adapter: filtering, sorting and pagination done in memory. A real API does this server-side. */
function listLocal(query: MedicineQuery): Paged<Medicine> {
  const words = query.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const bucket = parseBucket(query.price);

  const scored = medicines
    .map((m, order) => {
      const haystack = [m.name, m.genericName, m.brand, m.manufacturer, m.category, ...m.composition].join(' ').toLowerCase();
      if (!words.every((w) => haystack.includes(w))) return null;
      if (query.category && m.category !== query.category) return null;
      if (query.brands.length && !query.brands.includes(m.brand)) return null;
      if (bucket && !(m.price >= bucket.min && m.price < bucket.max)) return null;
      if (query.rx === 'required' && !m.requiresPrescription) return null;
      if (query.rx === 'not-required' && m.requiresPrescription) return null;
      if (query.inStock && m.availability === 'unavailable') return null;
      const name = m.name.toLowerCase();
      const relevance = words.length ? (name.startsWith(words[0]) ? 2 : name.includes(words[0]) ? 1 : 0) : 0;
      return { m, order, relevance };
    })
    .filter((x): x is { m: Medicine; order: number; relevance: number } => x !== null);

  scored.sort((a, b) => {
    switch (query.sort) {
      case 'price-asc': return a.m.price - b.m.price;
      case 'price-desc': return b.m.price - a.m.price;
      case 'discount': return b.m.discountPct - a.m.discountPct;
      case 'name': return a.m.name.localeCompare(b.m.name);
      default: return b.relevance - a.relevance || a.order - b.order;
    }
  });

  const total = scored.length;
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
  const page = Math.min(Math.max(1, query.page), totalPages);
  const start = (page - 1) * query.pageSize;
  return { items: scored.slice(start, start + query.pageSize).map((x) => x.m), total, page, pageSize: query.pageSize, totalPages };
}

function toParams(query: MedicineQuery): string {
  const p = new URLSearchParams();
  if (query.q) p.set('q', query.q);
  if (query.category) p.set('category', query.category);
  query.brands.forEach((b) => p.append('brand', b));
  if (query.price) p.set('price', query.price);
  if (query.rx !== 'all') p.set('rx', query.rx);
  if (query.inStock) p.set('inStock', 'true');
  p.set('sort', query.sort);
  p.set('page', String(query.page));
  p.set('pageSize', String(query.pageSize));
  return p.toString();
}

export async function listMedicines(query: MedicineQuery): Promise<Paged<Medicine>> {
  if (USE_MOCK) return mockDelay(listLocal(query), 450); // MOCK
  return apiGet<Paged<Medicine>>(`/medicines?${toParams(query)}`);
}

export async function getMedicineFacets(): Promise<MedicineFacets> {
  if (USE_MOCK) {
    const count = (key: 'category' | 'brand') => {
      const map = new Map<string, number>();
      medicines.forEach((m) => map.set(m[key], (map.get(m[key]) ?? 0) + 1));
      return [...map.entries()].map(([name, n]) => ({ name, count: n })).sort((a, b) => a.name.localeCompare(b.name));
    };
    return mockDelay({ categories: count('category'), brands: count('brand') }, 150); // MOCK
  }
  return apiGet<MedicineFacets>('/medicines/facets');
}

export async function getMedicine(id: string): Promise<Medicine | null> {
  if (USE_MOCK) return mockDelay(medicines.find((m) => m.id === id) ?? null, 350); // MOCK
  return apiGet<Medicine | null>(`/medicines/${encodeURIComponent(id)}`);
}

export async function getRelatedMedicines(id: string, limit = 4): Promise<Medicine[]> {
  if (USE_MOCK) {
    const current = medicines.find((m) => m.id === id);
    const related = medicines.filter((m) => m.id !== id && m.category === current?.category).slice(0, limit);
    return mockDelay(related, 300); // MOCK
  }
  return apiGet<Medicine[]>(`/medicines/${encodeURIComponent(id)}/related?limit=${limit}`);
}
