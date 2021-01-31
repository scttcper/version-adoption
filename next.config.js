module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:slug*',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/package/:slug*',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
}