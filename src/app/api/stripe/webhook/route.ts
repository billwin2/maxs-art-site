import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { markOriginalsSold, saveOrder } from '../../../lib/inventory';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Read secrets at request-time, not module-load time
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret); // no apiVersion pin
  const body = await req.text();
  const sig = headers().get('stripe-signature') ?? '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Try to read cart items (if you set them in metadata)
    let cart: any[] = [];
    try {
      const raw = session.metadata?.cart_json;
      if (raw) cart = JSON.parse(raw);
    } catch {}

    // Mark originals sold
    const originals = cart.filter((i) => i.type === 'original').map((i) => i.id);
    if (originals.length) markOriginalsSold(originals);

    // Save lightweight order
    saveOrder(session.id!, {
      email: session.customer_details?.email ?? null,
      amount_total: session.amount_total ?? null,
      currency: session.currency ?? 'usd',
      items: cart,
      created: session.created,
      payment_intent: session.payment_intent,
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// Optional GET for smoke test
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/stripe/webhook' });
}
