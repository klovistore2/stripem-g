//actions/offer.ts
'use server';

import { redirect } from 'next/navigation';
import { saveOffer } from '@/lib/offer';
import { Offer } from '@/types/offer';

export async function createOffer(formData: FormData) {
  const title = formData.get('title') as string;
  const price = Number(formData.get('price'));
  const sellerAccountId = formData.get('sellerAccountId') as string;
  if (!title || price <= 0 || !sellerAccountId) throw new Error('Offre invalide');

  const offerId = `offer_${Date.now()}`;
  const offer: Offer = { id: offerId, title, price, sellerId: sellerAccountId };
  saveOffer(offer);

  redirect(`/offre/${offerId}?seller_id=${sellerAccountId}`);
}