'use client';
import { FormEvent, useState } from 'react';

const INTERESTS = ['Buying a property', 'Investing in property', 'Off-market properties', 'Property advisory', 'House & land packages'];

function useSubmit() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); };
  return { sent, onSubmit };
}

export function InterestSelect({ className }: { className: string }) {
  return (
    <select className={className} defaultValue="" aria-label="I'm interested in">
      <option value="">I&apos;m interested in…</option>
      {INTERESTS.map((i) => <option key={i}>{i}</option>)}
    </select>
  );
}

export function ContactForm() {
  const { sent, onSubmit } = useSubmit();
  return (
    <form data-reveal="1" onSubmit={onSubmit} style={{ display: 'grid', gap: 14, padding: 40, background: '#F7F3EC', border: '1px solid #E6E0D4', borderRadius: 8 }}>
      <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <input className="input" placeholder="Full name" required />
        <input className="input" placeholder="Phone" type="tel" />
      </div>
      <input className="input" placeholder="Email" type="email" required />
      <InterestSelect className="input" />
      <textarea className="input" placeholder="Tell us a little about your brief" rows={4} />
      <button type="submit" className="btn btn-navy" style={{ height: 54 }}>{sent ? 'Thanks — we’ll be in touch' : 'Book a strategy call'}</button>
      <p style={{ fontSize: 12, color: '#8A7A57', lineHeight: 1.5 }}>We reply within one business day. Your details stay private.</p>
    </form>
  );
}

export function CtaForm({ label = 'Book a strategy call' }: { label?: string }) {
  const { sent, onSubmit } = useSubmit();
  return (
    <form data-reveal="3" onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <div data-g2="1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <input className="input-dark" placeholder="Full name" required />
        <input className="input-dark" placeholder="Phone or email" required />
      </div>
      <InterestSelect className="input-dark" />
      <button type="submit" className="btn btn-gold" style={{ height: 56 }}>{sent ? 'Thanks — we’ll be in touch' : label}</button>
    </form>
  );
}
