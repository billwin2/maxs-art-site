'use client';

import { useEffect } from 'react';
import { useCart } from '../../components/CartContext';

export default function ClearCartOnMount() {
  const { clearCart } = useCart();
  useEffect(() => { clearCart(); }, [clearCart]);
  return null;
}
