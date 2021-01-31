import '../styles/index.css';

import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NPM downloads by version</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <footer>
        Created by{' '}
        <a href="https://twitter.com/scttcper" target="_blank" rel="noopener">
          @scttcper
        </a>{' '}
        -{' '}
        <a href="https://github.com/scttcper/version-adoption" target="_blank" rel="noopener">
          source
        </a>
      </footer>
    </>
  );
}
