//app/offre/page.tsx
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllOffers } from '@/lib/offer';
import { Offer } from '@/types/offer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Offres - Underr Marketplace',
  description: 'Découvrez les services disponibles sur underr.com via Stripe Connect.',
  keywords: 'offres marketplace, services underr, Stripe Connect, vente services France',
};

export default async function OffersPage() {
  const offers = await getAllOffers(); // Prisma, persistant

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Offres Disponibles</h1>
      {offers.length === 0 && <p>Aucune offre pour l’instant.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Mobile-first : 1 col mobile, 2 col desktop */}
        {offers.map((offer: Offer) => (
          <Card key={offer.id} className="w-full">
            <CardHeader>
              <CardTitle>{offer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Prix : {offer.price}€</p>
              <p>Vendeur ID : {offer.sellerId}</p>
              <Link href={`/offre/${offer.id}?seller_id=${offer.sellerId}`}>
                <Button className="mt-4 w-full">Voir Offre</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}