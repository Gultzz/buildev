import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Buildei Forge | Elite Software Development House',
  description: 'Building modern, high-performance web, mobile, and cloud solutions. Transform your ideas into reality with Buildei Forge.',
  keywords: ['software house', 'custom development', 'web design', 'mobile apps', 'cloud solutions', 'AI development'],
  openGraph: {
    title: 'Buildei Forge | Elite Software Development House',
    description: 'Bespoke digital products engineered for growth.',
    url: 'https://buildeiforge.com',
    siteName: 'Buildei Forge',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}