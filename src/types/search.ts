export type SearchCategory =
  | 'medicines'
  | 'doctors'
  | 'hospitals'
  | 'lab-tests'
  | 'vaccines'
  | 'equipment'
  | 'home-care';

export interface SearchItem {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  /** Where selecting the result goes. */
  to: string;
}

export interface SearchGroup {
  category: SearchCategory;
  label: string;
  items: SearchItem[];
  /** Total matches in this category (may exceed items.length when limited). */
  total: number;
}

export interface SearchOptions {
  limitPerCategory?: number;
}
