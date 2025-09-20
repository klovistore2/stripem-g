// lib/offer.ts
'use server';

import { PrismaClient } from '@prisma/client';
import { Offer } from '@/types/offer';

const prisma = new PrismaClient();

export async function saveOffer(offer: Omit<Offer, 'id' | 'createdAt'>): Promise<Offer> {
  const saved = await prisma.offer.create({
    data: {
      title: offer.title,
      price: offer.price,
      sellerId: offer.sellerId,
    },
  });
  return {
    id: saved.id,
    title: saved.title,
    price: saved.price,
    sellerId: saved.sellerId,
    createdAt: saved.createdAt,
  };
}

export async function getOfferById(id: string): Promise<Offer | undefined> {
  const prismaOffer = await prisma.offer.findUnique({ where: { id } });
  if (!prismaOffer) return undefined;
  return {
    id: prismaOffer.id,
    title: prismaOffer.title,
    price: prismaOffer.price,
    sellerId: prismaOffer.sellerId,
    createdAt: prismaOffer.createdAt,
  };
}

export async function getOffer(sellerId: string): Promise<Offer | undefined> {
  const prismaOffer = await prisma.offer.findFirst({ where: { sellerId } });
  if (!prismaOffer) return undefined;
  return {
    id: prismaOffer.id,
    title: prismaOffer.title,
    price: prismaOffer.price,
    sellerId: prismaOffer.sellerId,
    createdAt: prismaOffer.createdAt,
  };
}

export async function getAllOffers(): Promise<Offer[]> {
  const prismaOffers = await prisma.offer.findMany();
  return prismaOffers.map((prismaOffer) => ({
    id: prismaOffer.id,
    title: prismaOffer.title,
    price: prismaOffer.price,
    sellerId: prismaOffer.sellerId,
    createdAt: prismaOffer.createdAt,
  }));
}