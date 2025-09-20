// app/offre/[offerId]/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { getOffer } from '@/lib/offer';
import { Offer } from '@/types/offer';

type Props = { params: { offerId: string }; searchParams: Promise<{ seller_id?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const paramsResolved = await searchParams;
  const sellerId = paramsResolved.seller_id || '';
  const offer = await getOffer(sellerId) || { title: 'Service Test', id: params.offerId, price: 100, sellerId };
  return {
    title: `${offer.title} - Underr Marketplace`,
    description: `Achetez "${offer.title}" pour 100€ sur underr.com via Stripe Connect.`,
    keywords: `service ${offer.title}, marketplace underr, Stripe paiement`,
  };
}

export default async function OfferPage({ params, searchParams }: Props) {
  const paramsResolved = await searchParams;
  const sellerId = paramsResolved.seller_id || '';
  const offer: Offer = await getOffer(sellerId) || {
    id: params.offerId,
    title: 'Service Test',
    price: 100,
    sellerId: 'Erreur',
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Offre de Service</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{offer.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Prix : {offer.price}€</p>
          <p>Vendeur ID : {offer.sellerId}</p>
          <Link href={`/checkout?offer_id=${offer.id}&seller_id=${offer.sellerId}`}>
            <Button className="mt-4 w-full">Acheter pour {offer.price}€</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}