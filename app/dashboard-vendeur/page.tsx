import type { Metadata, Viewport } from 'next';
import { createOffer } from '@/actions/offer'; // Root actions/
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Dashboard Vendeur - Underr',
  description: 'Créez votre offre de service sur underr.com.',
  keywords: 'dashboard vendeur, marketplace underr, Stripe',
};

export default async function DashboardVendeur({ searchParams }: { searchParams: Promise<{ account_id?: string }> }) {
  const params = await searchParams;
  const sellerId = params.account_id;
  if (!sellerId) return <div>Erreur : ID vendeur manquant</div>;

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard Vendeur</h1>
      <p>ID : {sellerId}</p>
      <form action={createOffer} className="space-y-4 mt-4">
        <input type="hidden" name="sellerAccountId" value={sellerId} /> {/* Pass sellerId */}
        <Input name="title" placeholder="Titre (ex: Coaching)" className="w-full" required />
        <Input name="price" type="number" placeholder="Prix (100)" defaultValue="100" className="w-full" required />
        <Button type="submit" className="w-full">Créer Offre</Button>
      </form>
    </div>
  );
}