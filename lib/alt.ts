/**
 * Alt text from a photo's placeholder label: "Photo: strategy meeting over coffee" becomes
 * "Strategy meeting over coffee". The labels in lib/data.ts describe what each photo shows, which
 * is what a screen reader should say; a card's title ("Discover") does not describe its picture.
 */
export function altFromLabel(label: string) {
  const t = label.replace(/^photo:\s*/i, '').trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
