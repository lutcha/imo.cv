export const siteConfig = {
  name: 'imo.cv',
  description:
    'O maior agregador nacional. Pesquisa, compara e encontra o teu imóvel em Cabo Verde.',
  defaultLocale: 'pt' as const,
  locales: ['pt', 'en', 'fr', 'crioulo'] as const,
  apiBaseUrl:
    typeof window !== 'undefined'
      ? ''
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
};
