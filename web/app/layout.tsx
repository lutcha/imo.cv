import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { HydrationProvider } from '@/lib/providers/HydrationProvider';
import { ThemeInit } from '@/components/common/ThemeInit';
import { LocaleProvider } from '@/lib/i18n/LocaleContext';
import { NavigationProgress } from '@/components/common/NavigationProgress';
import { OfflineToast } from '@/components/common/OfflineToast';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'imo.cv – Mercado Imobiliário de Cabo Verde',
  description:
    'O maior agregador nacional. Pesquisa, compara e encontra o teu imóvel em Cabo Verde.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-CV" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <a
          href="#main"
          className="absolute left-[-9999px] z-[100] rounded bg-primary-blue-600 px-4 py-2 text-white focus:left-4 focus:top-4 focus:inline-block focus:outline-none focus:ring-2 focus:ring-white"
        >
          Saltar para o conteúdo
        </a>
        <QueryProvider>
          <AuthProvider>
            <LocaleProvider>
              {/* Triggers Zustand-persist rehydration from localStorage on the
                  client. Must wrap everything so auth state is available before
                  any protected layout renders. */}
              <HydrationProvider>
                <ThemeInit />
                <NavigationProgress />
                <OfflineToast />
                {children}
              </HydrationProvider>
            </LocaleProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
