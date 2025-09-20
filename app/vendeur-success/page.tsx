import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Onboarding Vendeur Réussi - Underr',
  description: 'Compte vendeur créé. Complétez KYC sur Stripe.',
  viewport: { width: 'device-width', initialScale: 1 },
};

export default async function Success({ searchParams }: { searchParams: Promise<{ account_id?: string }> }) {
  const params = await searchParams; // Await searchParams
  const accountId = params.account_id || 'Erreur';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Onboarding Réussi !</h1>
      <p>ID Compte : {accountId}</p>
      <p>Complétez KYC sur votre dashboard Stripe (test mode).</p>
      <Link
        href={`/dashboard-vendeur?account_id=${accountId}`}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Aller au Dashboard Vendeur
      </Link>
    </div>
  );
}