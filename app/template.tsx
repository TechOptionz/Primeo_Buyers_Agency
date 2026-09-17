import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

// Remounts on every navigation so the page fade and reveal animations replay per route.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div data-page="1">
      {children}
      <FinalCta />
      <Footer />
    </div>
  );
}
