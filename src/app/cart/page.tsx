'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../components/CartContext';
import { dollars } from '../lib/money';
import { useState } from 'react';


export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart, subtotalCents, totalItems } = useCart();
  const [loading, setLoading] = useState(false);

async function handleCheckout() {
  try {
    setLoading(true);

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // ✅ tell Next.js this is JSON
      },
      body: JSON.stringify({ items }), // send cart items to API
    });

    if (!res.ok) throw new Error('Checkout failed');

    const { url } = await res.json();
    if (!url) throw new Error('No session URL returned');

    window.location.href = url; // ✅ redirect to Stripe Checkout
  } catch (err) {
    alert((err as Error).message || 'Checkout failed');
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="min-h-screen bg-[#02120F] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bg-green-900 rounded-lg p-6">
            <p className="mb-4">Your cart is empty.</p>
            <Link href="/" className="underline">Continue shopping</Link>
          </div>
        ) : (
          <>
            <div className="bg-green-900 rounded-lg p-4 divide-y divide-white/10">
              {items.map((item) => (
                <div key={`${item.id}-${item.type}`} className="py-4 flex gap-4 items-center">
                  <div className="w-24 h-24 relative shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover rounded" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <span className="text-sm bg-white/10 px-2 py-0.5 rounded uppercase tracking-wide">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-1">{dollars(item.priceCents)}</p>

                    <div className="mt-3 flex items-center gap-2">
                      <label className="text-sm text-white/80">Qty</label>
                      <input
                        type="number"
                        min={1}
                        className="w-20 rounded text-black px-2 py-1"
                        value={item.qty}
                        onChange={(e) => updateQty(item.id, item.type, Number(e.target.value))}
                      />
                      <button
                        onClick={() => removeFromCart(item.id, item.type)}
                        className="ml-2 text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{dollars(item.priceCents * item.qty)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <button onClick={clearCart} className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
                Clear Cart
              </button>

              <div className="bg-white text-[#02120F] rounded-lg px-4 py-3 w-full md:w-auto">
                <div className="flex justify-between gap-8">
                  <span>Items</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span>Subtotal</span>
                  <span className="font-semibold">{dollars(subtotalCents)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link href="/" className="px-4 py-2 rounded bg-white/10 border border-white/20 hover:bg-white/20">
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                disabled={loading || totalItems === 0}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Preparing…' : 'Checkout'}
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
 