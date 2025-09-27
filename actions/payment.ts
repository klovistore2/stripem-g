//actions/payment.ts
'use server';

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { getOfferById } from '@/lib/offer';
import { Offer } from '@/types/offer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });

export async function createCheckoutSession(formData: FormData) {
  const offerId = formData.get('offer_id') as string;
  const sellerId = formData.get('seller_id') as string;
  const dbOffer = await getOfferById(offerId);

  if (!dbOffer || dbOffer.sellerId !== sellerId) {
    redirect(`/checkout?offer_id=${offerId}&seller_id=${sellerId}&error=offre-introuvable`);
  }

  const offer: Offer = dbOffer;

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: offer.title },
            unit_amount: offer.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&offer_id=${offerId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?offer_id=${offerId}&seller_id=${sellerId}`,
      payment_intent_data: {
        application_fee_amount: Math.floor(offer.price * 100 * 0.1),
        transfer_data: { destination: sellerId },
      },
      metadata: { offer_id: offerId }, // Pour webhook
    });
  } catch (error) {
    console.error('Erreur lors de la création de la session Stripe:', error);
    redirect(`/checkout?offer_id=${offerId}&seller_id=${sellerId}&error=echec-stripe`);
  }

  if (!session?.url) {
    redirect(`/checkout?offer_id=${offerId}&seller_id=${sellerId}&error=session-invalide`);
  }

  redirect(session.url);
}