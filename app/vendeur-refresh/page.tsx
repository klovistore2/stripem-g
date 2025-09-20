import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refresh Onboarding - Underr',
  description: 'Rafraîchissez votre onboarding vendeur.',
};

export default function Refresh() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Erreur Onboarding</h1>
      <p>Retournez à Stripe pour compléter.</p>
      <a href="/vendeur" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Réessayer</a>
    </div>
  );
}