'use client';
import { FormEvent, useState, useTransition } from 'react';
import { sendEnquiry } from '@/app/actions';
import { SITE } from '@/config/site';

// An email address, or a phone number of at least eight digits (spaces, brackets, + and - allowed).
const REACHABLE = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+|\+?[\d\s()-]*(?:\d[\s()-]*){8,})$/;
const SENT = 'Thanks, your enquiry has been sent. We’ll be in touch within one business day.';

const INTERESTS = ['Buying a property', 'Investing in property', 'Off-market properties', 'Property advisory', 'House & land packages'];

/** Sends the form to the sendEnquiry Server Action (app/actions.ts), which emails it to the PRIMEO inbox. */
function useSubmit() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    // CtaForm's single "Phone or email" field: anything else cannot be replied to
    const contact = data.get('contact');
    if (typeof contact === 'string' && !REACHABLE.test(contact.trim())) {
      setSent(false);
      setError('Please enter a phone number or an email address so we can reach you.');
      form.querySelector<HTMLInputElement>('[name="contact"]')?.focus();
      return;
    }
    data.set('page', window.location.pathname);
    startTransition(async () => {
      const res = await sendEnquiry(data).catch(() => ({ ok: false as const, error: `Sorry, that didn’t send. Please try again, or call us on ${SITE.phone}.` }));
      // Only a delivered enquiry clears the form; after a failure the visitor keeps what they typed.
      if (res.ok) form.reset();
      setSent(res.ok);
      setError(res.ok ? '' : res.error);
    });
  };
  return { sent, pending, error, onSubmit };
}

/** Spam trap read by sendEnquiry: off-screen and out of the tab order, so only bots fill it. */
function Honeypot() {
  return <input name="confirm_topic" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />;
}

export function InterestSelect({ className, placeholder = 'I’m interested in…' }: { className: string; placeholder?: string }) {
  return (
    <select className={className} name="interest" defaultValue="" aria-label="I'm interested in">
      <option value="">{placeholder}</option>
      {INTERESTS.map((i) => <option key={i}>{i}</option>)}
    </select>
  );
}

export function ContactForm() {
  const { sent, pending, error, onSubmit } = useSubmit();
  return (
    <form data-reveal="1" data-form-card="1" onSubmit={onSubmit} aria-busy={pending} style={{ display: 'grid', gap: 20, padding: 40, background: '#F7F3EC', border: '1px solid #E6E0D4', borderRadius: 8 }}>
      <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <label className="field">
          <span className="field-label">Full name</span>
          <input className="input" name="name" autoComplete="name" placeholder="Your full name" required />
        </label>
        <label className="field">
          <span className="field-label">Phone <i>Optional</i></span>
          <input className="input" name="phone" autoComplete="tel" placeholder="04xx xxx xxx" type="tel" inputMode="tel" />
        </label>
      </div>
      <label className="field">
        <span className="field-label">Email</span>
        <input className="input" name="email" autoComplete="email" placeholder="you@example.com" type="email" inputMode="email" required />
      </label>
      <label className="field">
        <span className="field-label">I&apos;m interested in <i>Optional</i></span>
        <InterestSelect className="input" placeholder="Select an option" />
      </label>
      <label className="field">
        <span className="field-label">Your brief <i>Optional</i></span>
        <textarea className="input" name="message" placeholder="Budget, suburbs, timeframe, anything that helps us prepare" rows={4} />
      </label>
      <Honeypot />
      <button type="submit" className="btn btn-navy" disabled={pending} style={{ height: 54, marginTop: 4 }}>{pending ? 'Sending…' : sent ? 'Thanks — we’ll be in touch' : 'Book a strategy call'}</button>
      {/* always in the page so screen readers announce the message when it appears */}
      <p role="status" style={{ fontSize: 14, fontWeight: 600, color: '#1F6B45', lineHeight: 1.5 }} hidden={!sent}>{sent ? SENT : ''}</p>
      {error && <p role="alert" style={{ fontSize: 13, color: '#A33A2A', lineHeight: 1.5 }}>{error}</p>}
      <p style={{ fontSize: 12, color: '#796A47', lineHeight: 1.5 }}>We reply within one business day. Your details stay private.</p>
    </form>
  );
}

export function CtaForm({ label = 'Book a strategy call' }: { label?: string }) {
  const { sent, pending, error, onSubmit } = useSubmit();
  return (
    <form data-reveal="3" onSubmit={onSubmit} aria-busy={pending} aria-label="Request a call back" style={{ display: 'grid', gap: 12 }}>
      <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input className="input-dark" name="name" autoComplete="name" placeholder="Full name" aria-label="Full name" required />
        <input className="input-dark" name="contact" placeholder="Phone or email" aria-label="Phone or email" required />
      </div>
      <InterestSelect className="input-dark" />
      <Honeypot />
      <button type="submit" className="btn btn-gold" disabled={pending} style={{ height: 56 }}>{pending ? 'Sending…' : sent ? 'Thanks — we’ll be in touch' : label}</button>
      <p role="status" style={{ fontSize: 14, fontWeight: 600, color: '#C6A15B', lineHeight: 1.5 }} hidden={!sent}>{sent ? SENT : ''}</p>
      {error && <p role="alert" style={{ fontSize: 13, color: '#F2B8A6', lineHeight: 1.5 }}>{error}</p>}
    </form>
  );
}
