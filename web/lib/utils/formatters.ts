/**
 * Format price for display (CVE or EUR)
 */
export function formatPrice(
  value: number | null | undefined,
  currency: string = 'CVE'
): string {
  if (value == null) return 'Sob consulta';
  return new Intl.NumberFormat('pt-CV', {
    style: 'currency',
    currency: currency === 'CVE' ? 'CVE' : 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format area (m²)
 */
export function formatArea(value: number | null | undefined): string {
  if (value == null) return '–';
  return `${value.toLocaleString('pt-CV')} m²`;
}

/**
 * Format date
 */
export function formatDate(
  value: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
): string {
  if (value == null) return '–';
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('pt-CV', options);
}
