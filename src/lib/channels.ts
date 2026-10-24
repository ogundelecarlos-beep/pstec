import { company, isApproved, regionMap, whatsappDefaultMessage } from '@/content/site';

/** Link do WhatsApp apenas com número aprovado; caso contrário null. */
export function whatsappUrl(extra?: string): string | null {
  if (!isApproved(company.whatsapp)) return null;
  const digits = company.whatsapp.value.replace(/\D/g, '');
  if (digits.length < 12) return null;
  const text = extra ? `${whatsappDefaultMessage}\n${extra}` : whatsappDefaultMessage;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Destino único de mapa, “abrir no Maps” e rota. */
export function mapTargets() {
  if (isApproved(company.approvedAddress)) {
    const q = encodeURIComponent(company.approvedAddress.value);
    return {
      approved: true as const,
      label: company.approvedAddress.value,
      openUrl: `https://www.google.com/maps/search/?api=1&query=${q}`,
      routeUrl: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
      embedUrl: `https://www.google.com/maps?q=${q}&output=embed`,
      embedTitle: `Mapa com a localização da PSTEC: ${company.approvedAddress.value}`,
    };
  }
  const [w, s, e, n] = regionMap.osmBbox;
  return {
    approved: false as const,
    label: regionMap.label,
    openUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(regionMap.searchQuery)}`,
    routeUrl: null,
    embedUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${w}%2C${s}%2C${e}%2C${n}&layer=mapnik`,
    embedTitle: 'Mapa regional de Franco da Rocha — SP, sem marcação de endereço',
  };
}

export function telHref(phone: string) {
  return `tel:+55${phone.replace(/\D/g, '')}`;
}
