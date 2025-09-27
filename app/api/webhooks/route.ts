// src/app/api/stripe/webhook/route.ts
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { savePurchase } from '@/lib/purchases';
import { getOfferById } from '@/lib/offer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const sig = (await headers()).get('stripe-signature');
  if (!sig) {
    console.error('Webhook Error: stripe-signature header missing');
    return new Response('Webhook Error: stripe-signature header missing', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    console.log('Événement reçu :', event.type);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook Error:', errorMessage, 'Body:', rawBody.toString('utf8'));
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const offerId = session.metadata?.offer_id;
    console.log('Paiement complété ! Session ID:', session.id, 'Offer ID:', offerId);

    if (!offerId) {
      console.error('Webhook Error: offer_id missing in session metadata');
      return new Response('Webhook Error: offer_id missing', { status: 400 });
    }

    const offer = await getOfferById(offerId);
    if (!offer) {
      console.error('Webhook Error: Offer not found for offerId:', offerId);
      return new Response('Webhook Error: Offer not found', { status: 400 });
    }

    try {
      const purchase = await savePurchase(offer);
      console.log('Purchase saved:', purchase.id);
    } catch (err: unknown) {
      console.error('Webhook Error: Failed to save purchase:', err);
      return new Response('Webhook Error: Failed to save purchase', { status: 500 });
    }
  }

  return new Response('OK', { status: 200 });
}