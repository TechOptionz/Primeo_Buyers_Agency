import type { Metadata, Viewport } from 'next';
import { Newsreader, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Nav from '@/components/Nav';
import Intro from '@/components/Intro';
import Motion from '@/components/Motion';
import { SITE } from '@/config/site';
import { HOME_TITLE, HOME_DESCRIPTION, TITLE_SUFFIX, OG_IMAGE, businessJsonLd } from '@/lib/seo';

// Upright only: the italic is used for a single word in the homepage hero and is loaded there
// (app/page.tsx), so the other pages do not preload a second 130 KB serif file.
const serif = Newsreader({ subsets: ['latin'], style: ['normal'], axes: ['opsz'], variable: '--font-serif', display: 'swap' });
const sans = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

// Site-wide defaults. Each page sets its own title, description and canonical URL with pageMeta()
// (lib/seo.ts); the canonical is deliberately not set here, so the 404 page does not inherit one.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: HOME_TITLE, template: `%s${TITLE_SUFFIX}` },
  description: HOME_DESCRIPTION,
  applicationName: SITE.name,
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_AU', title: HOME_TITLE, description: HOME_DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: HOME_TITLE, description: HOME_DESCRIPTION, images: [OG_IMAGE.url] },
};

export const viewport: Viewport = { themeColor: '#0B1D3A' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <a href="#main" className="skip-link">Skip to content</a>
          <Intro />
          <Nav />
          <Motion />
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: businessJsonLd() }} />
      </body>
    </html>
  );
}
