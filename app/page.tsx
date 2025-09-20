//app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Simple Marketplace - Vente Services',
  description: 'Plateforme simple pour vendre et acheter des services avec Stripe Connect. Test mode, sans argent réel.',
  keywords: 'marketplace service, Stripe Connect, vente en ligne France',
  viewport: 'width=device-width, initial-scale=1', // Mobile-first
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur Underr Marketplace</h1>
      <p className="text-center max-w-md mb-6">Vendez ou achetez des services. Tout géré par Stripe.</p>
      <div className="flex flex-col gap-4 w-full max-w-md"> {/* Mobile-first : stack vertical */}
        <Link href="/vendeur">
          <Button className="w-full">Devenir Vendeur</Button>
        </Link>
        <Link href="/offre">
          <Button className="w-full">Voir les Offres</Button>
        </Link>
        <Link href="/dashboard-acheteur">
          <Button className="w-full">Mes Achats</Button>
        </Link>
      </div>
    </div>
  );
}