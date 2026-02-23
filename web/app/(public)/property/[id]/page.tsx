import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { propertiesApi } from '@/lib/api/properties';
import { formatPrice } from '@/lib/utils/formatters';
import { MapboxMap } from '@/components/maps/MapboxMap';
import { ContactForm } from '@/components/contact/ContactForm';
import CreditSimulator from '@/components/finance/CreditSimulator';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getThemedImages } from '@/lib/utils/propertyImages';
import { PropertyGalleryCarousel } from '@/components/properties/PropertyGalleryCarousel';

type Props = { params: Promise<{ id: string }> };

/** N imagens para galeria: temáticas (villa/apartment/house/land) ou fallback. */
function getSeedImages(id: string, count: number, propertyType?: string | null): string[] {
  return getThemedImages(id, count, propertyType);
}

// ── Neighbourhood data ────────────────────────────────────────────────────────

interface Amenity {
  icon: string;
  label: string;
  distance: string;
}

const ISLAND_AMENITIES: Record<string, Amenity[]> = {
  santiago: [
    { icon: '✈️', label: 'Aeroporto Nelson Mandela', distance: '≈ 15 km' },
    { icon: '🏥', label: 'Hospital Dr. Agostinho Neto', distance: '≈ 5 km' },
    { icon: '🏬', label: 'Praiamar Shopping', distance: '≈ 3 km' },
    { icon: '🏫', label: 'Escolas & Liceus', distance: '≈ 1 km' },
    { icon: '🌊', label: 'Praia de Quebra Canela', distance: '≈ 8 km' },
    { icon: '🚌', label: 'Paragem de Alugueres', distance: '≈ 500 m' },
  ],
  'sao vicente': [
    { icon: '✈️', label: 'Aeroporto Cesária Évora', distance: '≈ 8 km' },
    { icon: '🏥', label: 'Hospital Baptista de Sousa', distance: '≈ 3 km' },
    { icon: '🛒', label: 'Mercado Municipal de Mindelo', distance: '≈ 2 km' },
    { icon: '🎓', label: 'Universidade de Cabo Verde', distance: '≈ 4 km' },
    { icon: '🌊', label: 'Praia da Laginha', distance: '≈ 2 km' },
    { icon: '⛵', label: 'Porto Grande de Mindelo', distance: '≈ 3 km' },
  ],
  sal: [
    { icon: '✈️', label: 'Aeroporto Américo Tomás', distance: '≈ 5 km' },
    { icon: '🏥', label: 'Hospital Regional do Sal', distance: '≈ 3 km' },
    { icon: '🏖️', label: 'Praia de Santa Maria', distance: '≈ 1 km' },
    { icon: '🏨', label: 'Zona Hoteleira', distance: '≈ 2 km' },
    { icon: '🛒', label: 'Supermercados & Lojas', distance: '≈ 500 m' },
    { icon: '🏄', label: 'Kite Beach', distance: '≈ 3 km' },
  ],
  'boa vista': [
    { icon: '✈️', label: 'Aeroporto Aristides Pereira', distance: '≈ 5 km' },
    { icon: '🏥', label: 'Centro de Saúde Sal Rei', distance: '≈ 2 km' },
    { icon: '🌊', label: 'Praia de Chaves', distance: '≈ 15 km' },
    { icon: '🐢', label: 'Reserva Natural de Tartarugas', distance: '≈ 10 km' },
    { icon: '🛒', label: 'Mercado de Sal Rei', distance: '≈ 2 km' },
    { icon: '🏖️', label: 'Praia de Santa Mônica', distance: '≈ 30 km' },
  ],
  fogo: [
    { icon: '✈️', label: 'Aeroporto de São Filipe', distance: '≈ 5 km' },
    { icon: '🏥', label: 'Hospital Regional do Fogo', distance: '≈ 3 km' },
    { icon: '🌋', label: 'Pico do Fogo (2 829 m)', distance: '≈ 25 km' },
    { icon: '🍷', label: 'Vinhas de Chã das Caldeiras', distance: '≈ 30 km' },
    { icon: '🛒', label: 'Mercado Municipal', distance: '≈ 2 km' },
    { icon: '🏫', label: 'Escola Secundária', distance: '≈ 1 km' },
  ],
  'santo antao': [
    { icon: '⛵', label: 'Porto Novo (Ferry)', distance: '≈ 10 km' },
    { icon: '🏥', label: 'Hospital Regional', distance: '≈ 5 km' },
    { icon: '🌄', label: 'Trilhos de Montanha', distance: '≈ 2 km' },
    { icon: '🌊', label: 'Ribeiras & Cascatas', distance: '≈ 5 km' },
    { icon: '🛒', label: 'Mercado local', distance: '≈ 1 km' },
    { icon: '🚌', label: 'Hiaces e Táxis', distance: '≈ 500 m' },
  ],
};

const DEFAULT_AMENITIES: Amenity[] = [
  { icon: '🏥', label: 'Centro de Saúde', distance: '≈ 2 km' },
  { icon: '🏫', label: 'Escola Primária & Liceu', distance: '≈ 1 km' },
  { icon: '🛒', label: 'Mercado local & Mini-mercados', distance: '≈ 500 m' },
  { icon: '🚌', label: 'Transportes públicos', distance: '≈ 300 m' },
  { icon: '🏦', label: 'Banco & Multibanco', distance: '≈ 1 km' },
  { icon: '⛪', label: 'Igreja & Centro comunitário', distance: '≈ 500 m' },
];

function getAmenities(island: string | null): Amenity[] {
  if (!island) return DEFAULT_AMENITIES;
  const norm = island
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  for (const [key, amenities] of Object.entries(ISLAND_AMENITIES)) {
    const normKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (norm.includes(normKey) || normKey.includes(norm)) return amenities;
  }
  return DEFAULT_AMENITIES;
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const property = await propertiesApi.getById(id);
    const title = `${property.title} | imo.cv`;
    const description =
      typeof (property as any).description === 'string' && (property as any).description
        ? (property as any).description.slice(0, 160)
        : `${property.listing_type_display} · ${property.property_type_display}${
            property.island ? ` · ${property.island}` : ''
          }`;
    return { title, description };
  } catch {
    return { title: 'Imóvel | imo.cv' };
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;

  let property: any;
  try {
    property = await propertiesApi.getById(id);
  } catch {
    return notFound();
  }
  if (!property) return notFound();

  // Images: lista completa para o carrossel (centro a cores, anterior/próxima em grayscale)
  const hasRealImages =
    Array.isArray(property.images) && property.images.length > 0;
  const seedImages = getSeedImages(id, 5, property.property_type);
  const allImages: string[] = hasRealImages
    ? [property.main_image, ...property.images.map((i: any) => i.file)].filter(Boolean)
    : seedImages;

  // Derived
  const area: number | null = property.area_util ?? property.area_bruta ?? null;
  const pricePerM2 =
    property.price && area ? Math.round(property.price / area) : null;
  const agencyName = property.agency_name ?? 'CV Premium Real Estate';
  const amenities = getAmenities(property.island);

  const waText = encodeURIComponent(
    `Tenho interesse no imóvel "${property.title}" (${formatPrice(
      property.price,
      property.currency
    )}). Poderia dar mais informações?`
  );
  const waLink = `https://wa.me/?text=${waText}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Back link */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-imo-primary dark:text-gray-400 dark:hover:text-teal-400"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar à pesquisa
        </Link>
      </div>

      {/* Galeria: centro a cores, anterior/próxima em grayscale (estilo Zimmo) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <PropertyGalleryCarousel
          images={allImages}
          title={property.title}
        />
      </div>

      {/* Main content + sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left column */}
          <div className="space-y-10 lg:col-span-2">

            {/* Title + location */}
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                  {property.property_type_display}
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  {property.listing_type_display}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                {property.title}
              </h1>
              {(property.island || property.municipality || property.concelho) && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  📍{' '}
                  {[property.island, property.municipality ?? property.concelho]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Preço
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-imo-primary dark:text-teal-400">
                    {formatPrice(property.price, property.currency)}
                  </p>
                </div>
                {pricePerM2 && (
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Preço / m²
                    </p>
                    <p className="mt-1 text-lg font-bold text-gray-700 dark:text-gray-300">
                      {formatPrice(pricePerM2, property.currency)}/m²
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Specs */}
            {(property.bedrooms != null ||
              property.bathrooms != null ||
              area != null ||
              property.area_bruta != null ||
              property.year_built != null ||
              property.has_garage) && (
              <div>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Características
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {property.bedrooms != null && (
                    <SpecCard icon="🛏" value={property.bedrooms} label="Quartos" />
                  )}
                  {property.bathrooms != null && (
                    <SpecCard icon="🚿" value={property.bathrooms} label="Casas de banho" />
                  )}
                  {property.area_util != null && (
                    <SpecCard
                      icon="📐"
                      value={`${property.area_util} m²`}
                      label="Área útil"
                    />
                  )}
                  {property.area_bruta != null && (
                    <SpecCard
                      icon="🏗️"
                      value={`${property.area_bruta} m²`}
                      label="Área bruta"
                    />
                  )}
                  {property.year_built != null && (
                    <SpecCard
                      icon="🏛️"
                      value={property.year_built}
                      label="Ano de construção"
                    />
                  )}
                  {property.has_garage && (
                    <SpecCard icon="🚗" value="Sim" label="Garagem" />
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Descrição
                </h2>
                <p className="whitespace-pre-wrap leading-relaxed text-gray-600 dark:text-gray-400">
                  {property.description}
                </p>
              </div>
            )}

            {/* Map */}
            {property.location_geojson && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Localização
                </h2>
                {property.address && (
                  <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                    📍 {property.address}
                  </p>
                )}
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                  <MapboxMap
                    properties={[property]}
                    center={[
                      property.location_geojson.coordinates[1],
                      property.location_geojson.coordinates[0],
                    ]}
                    zoom={14}
                    height="300px"
                  />
                </div>
              </div>
            )}

            {/* Neighbourhood */}
            <div>
              <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                O Bairro
              </h2>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Serviços e pontos de interesse próximos
                {property.island ? ` em ${property.island}` : ''}.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {amenities.map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-700"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xl dark:bg-gray-800">
                      {a.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {a.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {a.distance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-400 dark:text-gray-600">
                * Distâncias aproximadas baseadas na ilha / município.
              </p>
            </div>

            {/* Credit simulator (sale only) */}
            {property.listing_type?.toLowerCase() === 'sale' && property.price && (
              <div>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Simulação de Crédito Habitação
                </h2>
                <Suspense
                  fallback={
                    <div className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
                  }
                >
                  <CreditSimulator />
                </Suspense>
              </div>
            )}
          </div>

          {/* Right: sticky sidebar */}
          <div>
            <div className="sticky top-24 space-y-4">
              {/* Agency + contact buttons */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl dark:bg-teal-900/20">
                    🏢
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {agencyName}
                    </p>
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">
                      ✓ Agência verificada
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white transition hover:bg-[#1fb855]"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+238"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    📞 Ligar
                  </a>
                </div>
              </div>

              {/* Contact form */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Enviar mensagem
                </h3>
                <p className="mb-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Resposta esperada em até 2 horas úteis
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────

function SpecCard({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 p-4 text-center dark:border-gray-700">
      <span className="text-2xl">{icon}</span>
      <span className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
