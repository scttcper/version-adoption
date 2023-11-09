/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=84600, public',
          },
        ],
      },
      {
        source: '/package/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=84600, public',
          },
        ],
      },
      {
        source: '/_next/data/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=84600, public',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
