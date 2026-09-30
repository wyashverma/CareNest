export type Availability = 'available' | 'limited' | 'unavailable';

export type AsyncStatus = 'loading' | 'success' | 'error';

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
