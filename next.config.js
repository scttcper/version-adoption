module.exports = {
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
    ];
  },
}