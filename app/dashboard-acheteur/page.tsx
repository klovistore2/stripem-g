// app/dashboard-acheteur/page.tsx
import type { Metadata, Viewport } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPurchases } from '@/lib/purchases';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Dashboard Acheteur - Underr Marketplace',
  description: 'Votre historique d’achats sur underr.com via Stripe Connect.',
  keywords: 'dashboard acheteur, marketplace underr, historique achats Stripe France',
};

export default async function DashboardAcheteur() {
  const purchases = await getPurchases();

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vos Achats</h1>
      {purchases.length === 0 && <p>Aucun achat pour l’instant.</p>}
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <Card key={purchase.id} className="w-full">
            <CardHeader>
              <CardTitle>{purchase.offer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Prix : {purchase.offer.price}€</p>
              <p>Vendeur ID : {purchase.offer.sellerId}</p>
              <p>Date : {new Date(purchase.date).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}