/** Mike's WhatsApp number for build requests (Instinct-style onboarding). */
export const MIKE_WHATSAPP = {
  e164: "+918240890242",
  digits: "918240890242",
  display: "+91 82408 90242",
  greeting: "Hey Mike!",
} as const;

export function mikeWhatsAppChatUrl(message: string = MIKE_WHATSAPP.greeting): string {
  return `https://wa.me/${MIKE_WHATSAPP.digits}?text=${encodeURIComponent(message)}`;
}

export function mikeWhatsAppQrImageUrl(size = 280): string {
  const params = new URLSearchParams({
    size: `${size}x${size}`,
    ecc: "M",
    margin: "12",
    data: mikeWhatsAppChatUrl(),
  });
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
}
