/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'archives.bulbagarden.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'play.pokemonshowdown.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sprites.pokeapi.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.favware.tech',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig;
