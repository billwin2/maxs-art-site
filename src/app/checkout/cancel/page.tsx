import Link from 'next/link';

export default function CancelPage() {
  return (
    <main className="max-w-xl mx-auto py-16 text-center">
      <h1 className="text-2xl font-semibold mb-3">Checkout canceled</h1>
      <p className="mb-8">No charge was made. You can review your cart and try again.</p>
      <Link href="/cart" className="text-emerald-700 underline">Return to cart</Link>
    </main>
  );
}
