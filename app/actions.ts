'use server';
import { SITE } from '@/config/site';
import { buildEnquiryEmail, isEmail } from '@/lib/enquiry-email';

export type EnquiryResult = { ok: true } | { ok: false; error: string };

const SEND_FAILED = `Sorry, that didn’t send. Please try again, or call us on ${SITE.phone}.`;

const field = (data: FormData, name: string, max: number) => {
  const v = data.get(name);
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
};

/**
 * Emails a website enquiry (ContactForm and CtaForm in components/Forms.tsx) to the PRIMEO inbox
 * through Resend; lib/enquiry-email.ts lays the email out. Configured by env vars, see "Enquiry
 * emails" in the README:
 *   RESEND_API_KEY  required
 *   ENQUIRY_TO      inbox that receives enquiries (comma-separated for several); defaults to SITE.email (config/site.ts)
 *   ENQUIRY_FROM    sender, must be on a domain verified in Resend, e.g. "PRIMEO Website <website@primeo.com.au>"
 */
export async function sendEnquiry(data: FormData): Promise<EnquiryResult> {
  // Honeypot: the field is hidden from people, so only bots fill it. Report success so they don't retry.
  if (field(data, 'confirm_topic', 200)) return { ok: true };

  const name = field(data, 'name', 120).replace(/[\r\n]+/g, ' ');
  const email = field(data, 'email', 200);
  const phone = field(data, 'phone', 60);
  const contact = field(data, 'contact', 200); // CtaForm's single "Phone or email" field
  const interest = field(data, 'interest', 120);
  const message = field(data, 'message', 5000);
  const page = field(data, 'page', 200);

  if (!name) return { ok: false, error: 'Please add your name.' };
  if (!email && !phone && !contact) return { ok: false, error: 'Please add a phone number or email so we can reach you.' };
  if (email && !isEmail(email)) return { ok: false, error: 'That email address doesn’t look right.' };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[enquiry] RESEND_API_KEY is not set; enquiry not sent.');
    return { ok: false, error: SEND_FAILED };
  }
  const to = (process.env.ENQUIRY_TO || SITE.email).split(',').map((s) => s.trim()).filter(Boolean);
  // onboarding@resend.dev is Resend's test sender: it only delivers to the Resend account owner's own address.
  const from = process.env.ENQUIRY_FROM || 'PRIMEO Website <onboarding@resend.dev>';
  const { replyTo, ...mail } = buildEnquiryEmail({ name, email, phone, contact, interest, message, page });

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, reply_to: replyTo, ...mail }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error(`[enquiry] Resend responded ${res.status}: ${await res.text()}`);
      return { ok: false, error: SEND_FAILED };
    }
    return { ok: true };
  } catch (err) {
    console.error('[enquiry] Could not reach Resend:', err);
    return { ok: false, error: SEND_FAILED };
  }
}
