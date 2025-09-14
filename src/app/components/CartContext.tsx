'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Product } from './cart-types';

type CartState = {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  updateQty: (id: string, type: Product['type'], qty: number) => void;
  removeFromCart: (id: string, type: Product['type']) => void;
  clearCart: () => void;
  subtotalCents: number;
  totalItems: number;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(items));
      }
    } catch {}
  }, [items]);

  const addToCart = (product: Product, qty: number = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id && i.type === product.type);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (id: string, type: Product['type'], qty: number) => {
    setItems(prev => {
      if (qty <= 0) return prev.filter(i => !(i.id === id && i.type === type));
      return prev.map(i => (i.id === id && i.type === type ? { ...i, qty } : i));
    });
  };

  const removeFromCart = (id: string, type: Product['type']) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.type === type)));
  };

  const clearCart = () => setItems([]);

  const subtotalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.priceCents * i.qty, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((n, i) => n + i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQty, removeFromCart, clearCart, subtotalCents, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
