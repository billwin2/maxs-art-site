// src/app/api/checkout/route.ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Ensure Node.js runtime (Stripe does not work on Edge)
export const runtime = 'nodejs';

type CartItem = {
  id: string;
  title: string;
  image?: string;
  priceCents: number;
  quantity: number;
  type: 'original' | 'print';
  variantLabel?: string;
};

// Simple GET to sanity-check env + runtime
export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY || '';
  const hasKey = key.startsWith('sk_');
  return NextResponse.json({
    ok: true,
    hasKey,
    keyPrefix: hasKey ? key.slice(0, 7) : null, // e.g., "sk_test"
    runtime,
  });
}

export async function POST(req: Request) {
  try {
    // 1) Validate env **inside** the handler so we can return JSON if missing
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { error: 'Missing STRIPE_SECRET_KEY. Check .env.local and restart dev server.' },
        { status: 500 }
      );
    }

    // 2) Initialize Stripe after env check
    const stripe = new Stripe(secret);

    // 3) Parse input
    const { items } = (await req.json()) as { items: CartItem[] };
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    const normalized = items.map((it) => ({
      ...it,
      quantity: it.type === 'original' ? 1 : Math.max(1, Math.min(Number(it.quantity || 1), 99)),
      priceCents: Math.max(0, Math.floor(Number(it.priceCents || 0))),
    }));

        // Make the type explicit so later pushes don’t narrow it weirdly
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = normalized.map((it) => ({
    quantity: it.quantity,
    price_data: {
        currency: 'usd',
        unit_amount: it.priceCents,
        product_data: {
        name: it.title + (it.variantLabel ? ` – ${it.variantLabel}` : ''),
        images: it.image ? [it.image] : undefined,
        metadata: {
            id: it.id,
            type: it.type,
            ...(it.variantLabel ? { variantLabel: it.variantLabel } : {}),
        },
        },
    },
    adjustable_quantity:
        it.type === 'print' ? { enabled: true, minimum: 1, maximum: 10 } : undefined,
    }));

    const shippingFlat = Number(process.env.STRIPE_SHIPPING_FLAT_CENTS ?? '0');
    if (shippingFlat > 0) {
    line_items.push({
        quantity: 1,
        price_data: {
        currency: 'usd',
        unit_amount: shippingFlat,
        product_data: { name: 'Shipping (flat rate)' }, // OK now
        },
    });
    }


    const siteUrl = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      customer_creation: 'if_required',
      phone_number_collection: { enabled: true },
      metadata: { cart_json: JSON.stringify(normalized.slice(0, 20)) },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected error creating checkout session.' },
      { status: 500 }
    );
  }
}
