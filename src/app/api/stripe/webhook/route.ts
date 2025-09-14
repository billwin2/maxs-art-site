// src/app/api/stripe/webhook/route.ts
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { markOriginalsSold, saveOrder } from '../../../lib/inventory';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature') ?? '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Parse the cart snapshot we stored in metadata when creating the session
    let cart: any[] = [];
    try {
      cart = session.metadata?.cart_json ? JSON.parse(session.metadata.cart_json) : [];
    } catch {}

    // Mark originals as sold
    const originals = cart.filter((i) => i.type === 'original').map((i) => i.id);
    if (originals.length) markOriginalsSold(originals);

    // Save a lightweight order record (expand later)
    saveOrder(session.id, {
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

// Optional GET for quick smoke-test
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/stripe/webhook' });
}
