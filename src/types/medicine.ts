import type { Availability } from './common';

export type MedicineForm = 'tablet' | 'capsule' | 'syrup' | 'spray' | 'cream' | 'gel' | 'sachet' | 'device' | 'kit' | 'other';

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  manufacturer: string;
  category: string;
  form: MedicineForm;
  packSize: string;
  price: number;
  mrp: number;
  discountPct: number;
  composition: string[];
  /** General product information from labelling. Not medical advice. */
  uses: string;
  storage: string;
  requiresPrescription: boolean;
  availability: Availability;
}

export type MedicineSort = 'relevance' | 'price-asc' | 'price-desc' | 'discount' | 'name';
export type PrescriptionFilter = 'all' | 'required' | 'not-required';

export interface MedicineQuery {
  q: string;
  category?: string;
  brands: string[];
  /** Price bucket such as "0-100" or "500-". */
  price?: string;
  rx: PrescriptionFilter;
  inStock: boolean;
  sort: MedicineSort;
  page: number;
  pageSize: number;
}

export interface MedicineFacets {
  categories: { name: string; count: number }[];
  brands: { name: string; count: number }[];
}
