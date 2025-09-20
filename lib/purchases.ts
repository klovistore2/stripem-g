// lib/purchases.ts (optimisé : Prisma gère id/date auto, compact, cohérent avec offer.ts)
'use server';

import { PrismaClient } from '@prisma/client';
import { Offer } from '@/types/offer';

const prisma = new PrismaClient();

export interface Purchase {
  id: string;
  offer: Offer;
  date: string; // ISO pour frontend
}

export async function savePurchase(offer: Offer) {
  const purchase = await prisma.purchase.create({
    data: {
      offerId: offer.id,
      sellerId: offer.sellerId,
    },
  });
  return {
    ...purchase,
    date: purchase.date.toISOString(),
    offer,
  } as Purchase;
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