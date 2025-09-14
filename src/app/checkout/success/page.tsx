// Server component
import Stripe from 'stripe';
import Link from 'next/link';
import ClearCartOnMount from './ClearCartOnMount';

// Ensure Node runtime for Stripe SDK
export const runtime = 'nodejs';

type Props = {
  searchParams: { session_id?: string };
};

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = searchParams?.session_id;

  let amountTotal: number | null = null;
  let customerEmail: string | null = null;

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    amountTotal = typeof session.amount_total === 'number' ? session.amount_total : null;
    customerEmail = (session.customer_details?.email as string) || null;
  }

  return (
    <main className="max-w-xl mx-auto py-16 text-center">
      {/* Clears cart on mount in the browser */}
      <ClearCartOnMount />

      <h1 className="text-3xl font-semibold mb-4">Thank you!</h1>

      {amountTotal !== null ? (
        <p className="mb-2">
          Payment total: <strong>${(amountTotal / 100).toFixed(2)}</strong>
        </p>
      ) : null}

      {customerEmail ? (
        <p className="mb-8">A receipt has been sent to <strong>{customerEmail}</strong>.</p>
      ) : (
        <p className="mb-8">Your order was placed successfully. A receipt has been emailed to you.</p>
      )}

      <Link href="/" className="text-emerald-700 underline">Back to gallery</Link>
    </main>
  );
}
