import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { TERMS } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({ title: 'Terms of Use', description: TERMS.seo, path: '/terms' });

export default function Terms() {
  return <LegalPage doc={TERMS} other={{ text: 'How we handle your personal information is set out in our privacy policy.', label: 'Privacy policy', href: '/privacy' }} />;
}
