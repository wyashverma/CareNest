export type CartItemKind = 'medicine' | 'equipment' | 'lab-test';

export interface CartItem {
  productId: string;
  kind: CartItemKind;
  name: string;
  unitPrice: number;
  quantity: number;
  requiresPrescription: boolean;
  savedForLater: boolean;
}
