// types/offer.ts
export interface Offer {
  id: string;
  title: string;
  price: number;
  sellerId: string;
  createdAt?: Date; // Optionnel, pour match Prisma sans obliger partout
}