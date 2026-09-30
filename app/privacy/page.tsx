import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { PRIVACY } from '@/lib/legal';

export const metadata: Metadata = { title: PRIVACY.title, description: PRIVACY.seo };

export default function Privacy() {
  return <LegalPage doc={PRIVACY} other={{ text: 'Using this website is also covered by our terms of use.', label: 'Terms of use', href: '/terms' }} />;
}
