'use client';
import { FormEvent, useState, useTransition } from 'react';
import { sendEnquiry } from '@/app/actions';
import { CONTACT } from '@/lib/data';

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
    data.set('page', window.location.pathname);
    startTransition(async () => {
      const res = await sendEnquiry(data).catch(() => ({ ok: false as const, error: `Sorry, that didn’t send. Please try again, or call us on ${CONTACT.phone}.` }));
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

export function InterestSelect({ className }: { className: string }) {
  return (
    <select className={className} name="interest" defaultValue="" aria-label="I'm interested in">
      <option value="">I&apos;m interested in…</option>
      {INTERESTS.map((i) => <option key={i}>{i}</option>)}
    </select>
  );
}

export function ContactForm() {
  const { sent, pending, error, onSubmit } = useSubmit();
  return (
    <form data-reveal="1" onSubmit={onSubmit} style={{ display: 'grid', gap: 14, padding: 40, background: '#F7F3EC', border: '1px solid #E6E0D4', borderRadius: 8 }}>
      <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <input className="input" name="name" autoComplete="name" placeholder="Full name" required />
        <input className="input" name="phone" autoComplete="tel" placeholder="Phone" type="tel" />
      </div>
      <input className="input" name="email" autoComplete="email" placeholder="Email" type="email" required />
      <InterestSelect className="input" />
      <textarea className="input" name="message" placeholder="Tell us a little about your brief" rows={4} />
      <Honeypot />
      <button type="submit" className="btn btn-navy" disabled={pending} style={{ height: 54 }}>{pending ? 'Sending…' : sent ? 'Thanks — we’ll be in touch' : 'Book a strategy call'}</button>
      {error && <p role="alert" style={{ fontSize: 13, color: '#A33A2A', lineHeight: 1.5 }}>{error}</p>}
      <p style={{ fontSize: 12, color: '#8A7A57', lineHeight: 1.5 }}>We reply within one business day. Your details stay private.</p>
    </form>
  );
}

export function CtaForm({ label = 'Book a strategy call' }: { label?: string }) {
  const { sent, pending, error, onSubmit } = useSubmit();
  return (
    <form data-reveal="3" onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input className="input-dark" name="name" autoComplete="name" placeholder="Full name" required />
        <input className="input-dark" name="contact" placeholder="Phone or email" required />
      </div>
      <InterestSelect className="input-dark" />
      <Honeypot />
      <button type="submit" className="btn btn-gold" disabled={pending} style={{ height: 56 }}>{pending ? 'Sending…' : sent ? 'Thanks — we’ll be in touch' : label}</button>
      {error && <p role="alert" style={{ fontSize: 13, color: '#F2B8A6', lineHeight: 1.5 }}>{error}</p>}
    </form>
  );
}
