import FinalCta from '@/components/FinalCta';
import PageFade from '@/components/PageFade';
import Footer from '@/components/Footer';

// Remounts on every navigation so the page fade and reveal animations replay per route. The fade
// (pageIn in globals.css) runs on client-side navigations only: on the first load the page sits behind
// the intro cover, so a fade there is invisible, and starting the page at opacity 0 kept the browser
// from counting the hero as painted until the fade had run (it was the Largest Contentful Paint).
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div data-page="1">
      <PageFade />
      <main id="main">
        {children}
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
