/**
 * Imagens temáticas (apartamentos, vilas, casas, terrenos) para imóveis sem fotos.
 * Ficheiros em public/images/properties/ obtidos com stitch-screens/download-property-images.ps1.
 * Se não existirem, o frontend usa fallback (picsum) para não quebrar.
 */

const BASE = '/images/properties';

/** Imagens por tipo de imóvel (paths locais após download do script) */
export const THEMED_IMAGES_BY_TYPE: Record<string, string[]> = {
  villa: [
    `${BASE}/villa-exterior.jpg`,
    `${BASE}/villa-living-room.jpg`,
    `${BASE}/villa-pool.jpg`,
    `${BASE}/villa-bedroom.jpg`,
    `${BASE}/villa-kitchen.jpg`,
    `${BASE}/villa-modern-pool.jpg`,
    `${BASE}/villa-sal.jpg`,
    `${BASE}/villa-traditional.jpg`,
    `${BASE}/villa-luxury-exterior.jpg`,
  ],
  apartment: [
    `${BASE}/apartment-beachfront.jpg`,
    `${BASE}/apartment-ocean-view.jpg`,
    `${BASE}/villa-living-room.jpg`,
    `${BASE}/villa-bedroom.jpg`,
    `${BASE}/villa-kitchen.jpg`,
  ],
  house: [
    `${BASE}/house-mindelo.jpg`,
    `${BASE}/villa-exterior.jpg`,
    `${BASE}/villa-traditional.jpg`,
    `${BASE}/villa-living-room.jpg`,
    `${BASE}/villa-kitchen.jpg`,
  ],
  land: [
    `${BASE}/land-coastal.jpg`,
    `${BASE}/villa-exterior.jpg`,
    `${BASE}/villa-sal.jpg`,
  ],
  commercial: [
    `${BASE}/villa-exterior.jpg`,
    `${BASE}/villa-living-room.jpg`,
  ],
  other: [
    `${BASE}/villa-exterior.jpg`,
    `${BASE}/apartment-ocean-view.jpg`,
    `${BASE}/house-mindelo.jpg`,
  ],
};

/** Tipos que mapeiam para as listas acima */
const NORMALIZED_TYPE: Record<string, string> = {
  apartment: 'apartment',
  villa: 'villa',
  house: 'house',
  land: 'land',
  commercial: 'commercial',
  other: 'other',
  MORADIA: 'house',
  APARTAMENTO: 'apartment',
  TERRENO: 'land',
  COMERCIAL: 'commercial',
};

/**
 * Devolve N imagens temáticas para um imóvel (seed por id para consistência).
 * Se não houver lista para o tipo, usa fallbackPicsum(id, count).
 */
export function getThemedImages(
  id: string,
  count: number,
  propertyType?: string | null
): string[] {
  const type = propertyType ? NORMALIZED_TYPE[propertyType] ?? 'other' : 'other';
  const list = THEMED_IMAGES_BY_TYPE[type] ?? THEMED_IMAGES_BY_TYPE.other;
  if (list.length === 0) return getFallbackPicsum(id, count);

  const seed = parseInt(id.replace(/-/g, '').slice(0, 8), 16);
  return Array.from({ length: count }, (_, i) => {
    const index = (seed + i * 17) % list.length;
    return list[index];
  });
}

/** Fallback: picsum.photos (comportamento anterior quando não há imagens temáticas). */
export function getFallbackPicsum(id: string, count: number): string[] {
  const base = parseInt(id.replace(/-/g, '').slice(0, 8), 16) % 1000;
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/seed/${(base + i * 17) % 1000}/1200/800`
  );
}
