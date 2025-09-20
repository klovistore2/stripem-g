// app/success/page.tsx
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Paiement Réussi - Underr',
  description: 'Paiement effectué avec succès sur underr.com.',
  keywords: 'paiement réussi, marketplace underr, Stripe',
};

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams;
  const sessionId = params.session_id || 'Test';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Paiement Réussi !</h1>
      <p>Session ID : {sessionId}</p>
      <p>Vérifiez Dashboard Stripe (test mode).</p>
    </div>
  );
}