import { createContext, useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { CartItem } from '@/types/cart';
import { readJSON, writeJSON } from '@/utils/storage';

type Action =
  | { type: 'add'; item: Omit<CartItem, 'savedForLater'>; quantity?: number }
  | { type: 'remove'; productId: string }
  | { type: 'setQuantity'; productId: string; quantity: number }
  | { type: 'clear' };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'add': {
      const qty = action.quantity ?? action.item.quantity;
      const existing = state.find((i) => i.productId === action.item.productId);
      if (existing) {
        return state.map((i) => (i.productId === existing.productId ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...state, { ...action.item, quantity: qty, savedForLater: false }];
    }
    case 'remove':
      return state.filter((i) => i.productId !== action.productId);
    case 'setQuantity':
      return state.map((i) => (i.productId === action.productId ? { ...i, quantity: Math.max(1, action.quantity) } : i));
    case 'clear':
      return [];
  }
}

export interface CartContextValue {
  items: CartItem[];
  count: number;
  addItem: (item: Omit<CartItem, 'savedForLater'>) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const STORAGE_KEY = 'carenest.cart';

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [], () => readJSON<CartItem[]>(STORAGE_KEY, []));

  useEffect(() => writeJSON(STORAGE_KEY, items), [items]);

  const addItem = useCallback((item: Omit<CartItem, 'savedForLater'>) => dispatch({ type: 'add', item }), []);
  const removeItem = useCallback((productId: string) => dispatch({ type: 'remove', productId }), []);
  const setQuantity = useCallback((productId: string, quantity: number) => dispatch({ type: 'setQuantity', productId, quantity }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo<CartContextValue>(
    () => ({ items, count: items.reduce((n, i) => n + i.quantity, 0), addItem, removeItem, setQuantity, clear }),
    [items, addItem, removeItem, setQuantity, clear],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
