import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Nav from '@/components/Nav';
import Intro from '@/components/Intro';
import Motion from '@/components/Motion';
import { SITE } from '@/config/site';
import { HOME_TITLE, HOME_DESCRIPTION, TITLE_SUFFIX, OG_IMAGE, businessJsonLd } from '@/lib/seo';

// Newsreader is self-hosted (app/fonts, the latin subset from Google Fonts) because next/font/google
// can only keep the optical-size axis together with the whole 200-800 weight range, a 128 KB file. The
// site sets the serif in weight 400 only, so this is the same design at 57 KB. Upright only: the italic
// is used for a single word in the homepage hero and is loaded there (app/page.tsx).
const serif = localFont({ src: './fonts/newsreader-latin-400.woff2', weight: '400', style: 'normal', variable: '--font-serif', display: 'swap', adjustFontFallback: 'Times New Roman' });
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
