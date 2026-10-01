import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { PRIVACY } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({ title: 'Privacy Policy', description: PRIVACY.seo, path: '/privacy' });

export default function Privacy() {
  return <LegalPage doc={PRIVACY} other={{ text: 'Using this website is also covered by our terms of use.', label: 'Terms of use', href: '/terms' }} />;
}
