/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  async rewrites() {
    return [
      {
        source: '/graphql/:path*',
        destination: `https://graphql-gateway.axieinfinity.com/graphql/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
