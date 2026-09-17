import type { Metadata } from 'next';
import { Newsreader, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Intro from '@/components/Intro';
import Motion from '@/components/Motion';

const serif = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'], variable: '--font-serif', display: 'swap' });
const sans = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'PRIMEO Property Group · Brisbane & Queensland', template: '%s · PRIMEO' },
  description: 'Buying, selling, leasing and commercial advisory for people who expect clear advice and better outcomes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <Intro />
          <Nav />
          <Motion />
          {children}
        </div>
      </body>
    </html>
  );
}
