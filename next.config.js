module.exports = {
  async headers() {
    return [
      {
        source: '/*',
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