//app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Underr Marketplace',
    template: '%s - Underr Marketplace',
  },
  description: 'Plateforme pour vendre et acheter des services avec Stripe Connect. Test mode, sans argent réel.',
  keywords: 'marketplace service, Stripe Connect, vente en ligne France, underr',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}