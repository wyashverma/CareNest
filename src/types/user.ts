export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppLocation {
  label: string;
  city?: string;
  pincode?: string;
  source: 'city' | 'pincode' | 'current';
}
