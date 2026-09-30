import { EMAIL_LOGO } from './email-logo';

export type Enquiry = { name: string; email: string; phone: string; contact: string; interest: string; message: string; page: string };

// The site palette (app/globals.css) and the nearest fonts an inbox can be trusted to have.
const NAVY = '#0B1D3A', GOLD = '#C6A15B', CREAM = '#F7F3EC', SAND = '#E6E0D4', TAN = '#8A7A57', INK = '#4A4C55';
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const LOGO_CID = 'primeo-logo';

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const link = (href: string, label: string) => `<a href="${esc(href)}" style="color:${NAVY};text-decoration:underline">${esc(label)}</a>`;
const eyebrow = (text: string, color = TAN) => `<p style="margin:0;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${color}">${text}</p>`;

/**
 * The enquiry notification sent to the PRIMEO inbox by sendEnquiry (app/actions.ts): subject, a
 * plain-text body, and an HTML body in the site's colours with the logo attached inline.
 * Built from tables and inline styles because that is what Outlook and Gmail render reliably.
 */
export function buildEnquiryEmail(e: Enquiry) {
  // CtaForm has one "Phone or email" field; work out which of the two the visitor gave.
  const email = e.email || (isEmail(e.contact) ? e.contact : '');
  const other = e.phone || (email === e.contact ? '' : e.contact);
  const dial = other.replace(/[^\d+]/g, '');
  const isPhone = dial.length >= 6;
  const first = e.name.split(' ')[0];
  const where = /^\/[\w\-/]*$/.test(e.page) ? (e.page === '/' ? 'the home page' : `the ${e.page} page`) : '';
  const received = `${new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Brisbane', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date())} AEST`;

  // [label, value as HTML, value as text]
  const details = [
    email && ['Email', link(`mailto:${email}`, email), email],
    other && (isPhone ? ['Phone', link(`tel:${dial}`, other), other] : ['Contact', esc(other), other]),
    e.interest && ['Interested in', esc(e.interest), e.interest],
  ].filter(Boolean) as [string, string, string][];

  const button = (href: string, label: string, solid: boolean) =>
    `<td class="btn-cell" valign="top"><table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" ${solid ? `bgcolor="${NAVY}"` : ''} style="padding:15px 26px;border:1px solid ${NAVY};border-radius:2px;font-family:${SANS};font-size:12px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;white-space:nowrap"><a href="${esc(href)}" style="display:block;color:${solid ? CREAM : NAVY};text-decoration:none">${esc(label)}</a></td></tr></table></td>`;
  const buttons = [
    email && button(`mailto:${email}?subject=${encodeURIComponent('Your enquiry with PRIMEO')}`, `Reply to ${first}`, true),
    isPhone && button(`tel:${dial}`, `Call ${other}`, !email),
  ].filter(Boolean);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Website enquiry from ${esc(e.name)}</title>
<style>
@media (max-width: 520px) {
  .px { padding-left: 24px !important; padding-right: 24px !important; }
  .name { font-size: 27px !important; }
  .btn-cell { display: block !important; width: 100% !important; }
  .btn-gap { display: block !important; width: 100% !important; height: 12px !important; }
  .btn, .btns { width: 100% !important; }
  .lbl, .val { display: block !important; width: 100% !important; }
  .lbl { padding-bottom: 0 !important; padding-right: 0 !important; }
  .val { padding-top: 4px !important; border-top: 0 !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background:${CREAM}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc([e.interest, email, other].filter(Boolean).join(' · '))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CREAM}" style="background:${CREAM}">
<tr><td align="center" style="padding:32px 12px">
<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid ${SAND}">
  <tr><td align="center" bgcolor="${NAVY}" style="padding:30px 24px;background:${NAVY}"><img src="cid:${LOGO_CID}" width="${EMAIL_LOGO.width}" height="${EMAIL_LOGO.height}" alt="PRIMEO · Right Property | Right Price" style="display:block;border:0;width:${EMAIL_LOGO.width}px;max-width:100%;height:auto;color:${CREAM};font-family:${SANS};font-size:22px;font-weight:bold;letter-spacing:3px"></td></tr>
  <tr><td height="4" bgcolor="${GOLD}" style="height:4px;line-height:4px;font-size:0;background:${GOLD}">&nbsp;</td></tr>
  <tr><td class="px" style="padding:40px 40px 0">
    ${eyebrow('New website enquiry', GOLD)}
    <h1 class="name" style="margin:12px 0 0;font-family:${SERIF};font-size:32px;font-weight:normal;line-height:1.15;color:${NAVY}">${esc(e.name)}</h1>
    <p style="margin:10px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${TAN}">Received ${received}${where ? ` · from ${esc(where)}` : ''}</p>
  </td></tr>
  <tr><td class="px" style="padding:28px 40px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid ${SAND}">
      ${details.map(([label, value]) => `<tr><td class="lbl" width="130" valign="top" style="padding:14px 12px 14px 0;border-top:1px solid ${SAND}">${eyebrow(label)}</td><td class="val" valign="top" style="padding:12px 0;border-top:1px solid ${SAND};font-family:${SANS};font-size:15px;line-height:1.5;color:${NAVY};word-break:break-word">${value}</td></tr>`).join('\n      ')}
    </table>
  </td></tr>${e.message ? `
  <tr><td class="px" style="padding:28px 40px 0">
    ${eyebrow('Message')}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px"><tr><td bgcolor="${CREAM}" style="padding:18px 20px;background:${CREAM};border-left:3px solid ${GOLD};font-family:${SANS};font-size:15px;line-height:1.65;color:${INK};word-break:break-word">${esc(e.message).replace(/\r?\n/g, '<br>')}</td></tr></table>
  </td></tr>` : ''}
  <tr><td class="px" style="padding:32px 40px 40px;font-size:0;line-height:0">${buttons.length ? `
    <table role="presentation" class="btns" cellpadding="0" cellspacing="0" border="0"><tr>${buttons.join('<td class="btn-gap" width="12" style="font-size:0;line-height:0">&nbsp;</td>')}</tr></table>
  ` : ''}</td></tr>
  <tr><td class="px" bgcolor="${CREAM}" style="padding:20px 40px;background:${CREAM};border-top:1px solid ${SAND};font-family:${SANS};font-size:12px;line-height:1.6;color:${TAN}">${email ? `Replying to this email goes straight to ${esc(first)} at ${esc(email)}.` : `${esc(first)} left no email address, so this one needs a call.`}</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>`;

  const text = [
    'New website enquiry',
    '',
    `Name: ${e.name}`,
    ...details.map(([label, , value]) => `${label}: ${value}`),
    ...(e.message ? ['', 'Message:', e.message] : []),
    '',
    `Received ${received}${where ? ` from ${where}` : ''}`,
  ].join('\n');

  return {
    subject: `Website enquiry from ${e.name}${e.interest ? ` · ${e.interest}` : ''}`,
    text,
    html,
    // Lets the inbox owner answer the visitor by pressing Reply.
    replyTo: email || undefined,
    attachments: [{ filename: 'primeo-logo.png', content: EMAIL_LOGO.png, content_type: 'image/png', content_id: LOGO_CID }],
  };
}
