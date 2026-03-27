import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Portal do Morador — imo.cv',
  description: 'Aceda às suas quotas, reservas e avisos do condomínio.',
  // PWA-ready: referenced from manifest if added later
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'imo.cv Morador',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // prevent accidental zoom on OTP input
  themeColor: '#1d4ed8', // trust-blue-700
};

export default function ResidentLayout({ children }: { children: React.ReactNode }) {
  return (
    // Neutral background — keeps resident portal visually separate from the agent dashboard
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}
