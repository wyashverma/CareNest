import type { CartItem } from '@/types/cart';
import type { Medicine } from '@/types/medicine';

export const MAX_QUANTITY = 10;

export function medicineToCartItem(m: Medicine, quantity = 1): Omit<CartItem, 'savedForLater'> {
  return {
    productId: m.id,
    kind: 'medicine',
    name: m.name,
    unitPrice: m.price,
    quantity,
    requiresPrescription: m.requiresPrescription,
  };
}
