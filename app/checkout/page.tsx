// app/checkout/page.tsx
import { createCheckoutSession } from '@/actions/payment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOfferById } from '@/lib/offer';
import { Offer } from '@/types/offer';
import type { Metadata } from 'next';

type Props = { searchParams: Promise<{ offer_id?: string; seller_id?: string; error?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const offerId = params.offer_id || '';
  const offer = await getOfferById(offerId);
  return {
    title: offer ? `Payer ${offer.title} - Underr Marketplace` : 'Checkout - Underr Marketplace',
    description: offer ? `Procédez au paiement sécurisé de "${offer.title}" pour ${offer.price}€ via Stripe Connect.` : 'Page de paiement pour services sur Underr Marketplace.',
    keywords: 'paiement Stripe, checkout marketplace, achat service France, underr',
  };
}

export default async function CheckoutPage({ searchParams }: Props) {
  const params = await searchParams;
  const offerId = params.offer_id || '';
  const sellerId = params.seller_id || '';
  const error = params.error;
  const offer: Offer | undefined = await getOfferById(offerId);

  if (!offer || offer.sellerId !== sellerId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Erreur Checkout</h1>
        <p className="text-red-500">Offre ou vendeur introuvable. Veuillez réessayer ou contacter le support.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-md mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Payer {offer.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-semibold">Prix : {offer.price}€ (10% commission, {Math.floor(offer.price * 0.9)}€ au vendeur)</p>
          {error && (
            <p className="text-red-500 text-sm">
              {error === 'echec-stripe' ? 'Échec lors de la création de la session Stripe. Vérifiez votre connexion ou réessayez.' :
               error === 'session-invalide' ? 'Session de paiement invalide. Réessayez.' :
               error === 'offre-introuvable' ? 'Offre non trouvée.' : error}
            </p>
          )}
          <form action={createCheckoutSession}>
            <input type="hidden" name="offer_id" value={offerId} />
            <input type="hidden" name="seller_id" value={sellerId} />
            <Button type="submit" className="w-full">Payer via Stripe</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}