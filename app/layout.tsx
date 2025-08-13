import '../styles/index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="px-4 md:px-1">
        {children}
        <footer className="mt-12 py-8 border-t text-center text-sm text-slate-600">
          <a
            href="https://github.com/scttcper/version-adoption"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-slate-800"
            aria-label="View this project on GitHub"
          >
            View on GitHub
          </a>
        </footer>
      </body>
    </html>
  );
}
