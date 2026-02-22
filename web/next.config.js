/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Otimizações de imagem para 4G
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.amazonaws.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'imocv-spaces.nyc3.cdn.digitaloceanspaces.com',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizeFonts: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
    turbo: {
      resolveAlias: {
        '@': './',
        '@components': './components',
        '@lib': './lib',
      },
    },
  },
  async redirects() {
    return [
      { source: '/pesquisa', destination: '/search', permanent: false },
      { source: '/pesquisa/:path*', destination: '/search/:path*', permanent: false },
      { source: '/imovel/:id', destination: '/property/:id', permanent: false },
    ];
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return [
      { source: '/api/backend/:path*', destination: `${apiUrl}/api/:path*` },
      { source: '/graphql', destination: `${apiUrl}/graphql` },
    ];
  },
};

export default nextConfig;
