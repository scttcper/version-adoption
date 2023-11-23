import '../styles/index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="px-4 md:px-1">{children}</body>
    </html>
  );
}
