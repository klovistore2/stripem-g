'use server';

import { PrismaClient } from '@prisma/client';
import { Offer } from '@/types/offer';

const prisma = new PrismaClient();

export interface Purchase {
  id: string;
  offer: Offer;
  date: string;
}

export async function savePurchase(offer: Offer) {
  console.log('Saving purchase for offer:', offer.id);
  try {
    const purchase = await prisma.purchase.create({
      data: {
        offerId: offer.id,
        sellerId: offer.sellerId,
      },
    });
    console.log('Purchase created:', purchase.id);
    return {
      ...purchase,
      date: purchase.date.toISOString(),
      offer,
    } as Purchase;
  } catch (error) {
    console.error('Error saving purchase:', error);
    throw error;
  }
}

export async function getPurchases(): Promise<Purchase[]> {
  const purchases = await prisma.purchase.findMany({
    include: { offer: true },
  });
  return purchases.map((p) => ({
    id: p.id,
    offer: {
      id: p.offer.id,
      title: p.offer.title,
      price: p.offer.price,
      sellerId: p.offer.sellerId,
      createdAt: p.offer.createdAt,
    } as Offer,
    date: p.date.toISOString(),
  }));
}