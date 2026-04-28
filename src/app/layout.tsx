import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from "@/context/language-context";

export const metadata: Metadata = {
  title: 'Buildev | Casa de Engenharia de Software de Elite',
  description: 'Construindo soluções web, mobile e em nuvem modernas e de alto desempenho. Transforme suas ideias em realidade com a Buildev.',
  keywords: ['software house', 'desenvolvimento personalizado', 'design web', 'aplicativos móveis', 'soluções em nuvem', 'IA', 'desenvolvimento de software', 'programação'],
  openGraph: {
    title: 'Buildev | Casa de Engenharia de Software de Elite',
    description: 'Produtos digitais sob medida projetados para o crescimento.',
    url: 'https://buildev.com.br',
    siteName: 'Buildev',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
