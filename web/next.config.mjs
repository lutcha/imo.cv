/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Prevents Next.js from redirecting `/api/backend/foo/` → `/api/backend/foo`
  // which breaks Django's trailing-slash convention and causes 308→301→404 chains.
  skipTrailingSlashRedirect: true,
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
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Enable polling so HMR works inside Docker on Windows (inotify not available)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
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
