/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'mathematalk.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['pg', 'bcryptjs'],
  },
};

module.exports = nextConfig;
