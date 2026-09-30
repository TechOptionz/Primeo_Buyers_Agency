import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { TERMS } from '@/lib/legal';

export const metadata: Metadata = { title: TERMS.title, description: TERMS.seo };

export default function Terms() {
  return <LegalPage doc={TERMS} other={{ text: 'How we handle your personal information is set out in our privacy policy.', label: 'Privacy policy', href: '/privacy' }} />;
}
