//actions/stripe.ts
'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });

export async function createSellerAccount() {
  try {
    const account = await stripe.accounts.create({
      type: 'standard',
      country: 'FR',
      email: 'vendeur@test.com',
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/vendeur-refresh`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/vendeur-success?account_id=${account.id}`,
      type: 'account_onboarding',
    });

    return { url: accountLink.url };
  } catch (error) {
    console.error('Erreur onboarding:', error);
    throw new Error('Échec création compte vendeur');
  }
}