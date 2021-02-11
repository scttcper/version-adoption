module.exports = {
  reactStrictMode: true,
  unstable_runtimeJS: false,
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
}