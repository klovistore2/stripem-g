'use client';

import { useRouter } from 'next/navigation';
import { createSellerAccount } from '@/actions/stripe';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function VendeurPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const { url } = await createSellerAccount();
      router.push(url);
    } catch (err: unknown) {
      console.error('Erreur client:', err instanceof Error ? err.message : err); // Utilise unknown, safe
      setError('Erreur lors de la création du compte. Réessayez.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Devenir Vendeur</h1>
      <p className="text-center mb-4">Créez un compte vendeur. Stripe gère KYC et paiements.</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form action={handleSubmit}>
        <Button type="submit" className="w-full">Inscription via Stripe</Button>
      </form>
    </div>
  );
}