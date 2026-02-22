import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { propertiesApi } from '@/lib/api/properties';
import { formatPrice, formatArea } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { MapboxMap } from '@/components/maps/MapboxMap';
import {
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let property;
  try {
    property = await propertiesApi.getById(id);
  } catch (error) {
    return notFound();
  }

  if (!property) return notFound();

  const isDetail = 'description' in property;
  const description = isDetail ? property.description : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Link
        href="/search"
        className="mb-6 inline-flex items-center gap-1 text-imo-primary hover:underline dark:text-primary-blue-400"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Voltar à pesquisa
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700">
            <Image
              src={property.main_image || "/images/placeholder-property.jpg"}
              alt={property.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              quality={75}
            />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            {property.title}
          </h1>
          <p className="mt-2 text-lg font-semibold text-imo-primary dark:text-primary-green-500">
            {formatPrice(property.price, property.currency)}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {property.listing_type_display} · {property.property_type_display}
            {property.island && ` · ${property.island}`}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            {property.bedrooms != null && (
              <span>{property.bedrooms} quartos</span>
            )}
            {property.bathrooms != null && (
              <span>{property.bathrooms} banheiros</span>
            )}
            {property.area_util != null && (
              <span>{formatArea(property.area_util)}</span>
            )}
          </div>
          {description && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Descrição
              </h2>
              <p className="mt-2 whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>
          )}
          {property.location_geojson && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Localização
              </h2>
              <div className="mt-2 h-64 rounded-xl overflow-hidden">
                <MapboxMap
                  properties={[property]}
                  center={
                    property.location_geojson
                      ? [
                        property.location_geojson.coordinates[1],
                        property.location_geojson.coordinates[0],
                      ]
                      : undefined
                  }
                  zoom={14}
                  height="256px"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {property.agency_name}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Agência verificada
            </p>
            <div className="mt-4 space-y-2">
              <Button className="w-full bg-success hover:bg-primary-green-600">
                WhatsApp
              </Button>
              <Button variant="outline" className="w-full">
                <PhoneIcon className="h-4 w-4" />
                Telefone
              </Button>
              <Button variant="outline" className="w-full">
                <EnvelopeIcon className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
