import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const sans = Manrope({ variable: '--font-sans', subsets: ['latin', 'latin-ext'] });
const mono = IBM_Plex_Mono({ variable: '--font-mono', weight: ['400', '500', '600'], subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rio130.github.io/ilan-pusulasi/'),
  title: 'İlan Pusulası — CV ve İş İlanı Eşleştirici',
  description: 'CV yetkinliklerini iş ilanının beklentileriyle karşılaştır ve gelişim alanlarını gör.',
  openGraph: { title: 'İlan Pusulası', description: 'Bir ilana ne kadar hazırsın?', images: ['/ilan-pusulasi/og.png'] },
  twitter: { card: 'summary_large_image', title: 'İlan Pusulası', description: 'Bir ilana ne kadar hazırsın?', images: ['/ilan-pusulasi/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
