import { redirect } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' });

export default async function SuccessPage({ searchParams }: { searchParams: { session_id: string } }) {
  const sessionId = searchParams.session_id;
  if (!sessionId) redirect('/');

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') redirect('/?error=paiement-echec');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Paiement Réussi !</h1>
      <p>Merci pour votre achat. Montant: {(session.amount_total! / 100).toFixed(2)} €</p>
    </div>
  );
}