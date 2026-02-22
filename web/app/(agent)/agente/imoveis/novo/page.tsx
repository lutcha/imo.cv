'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  HomeIcon,
  ComputerDesktopIcon,
  BuildingOfficeIcon,
  Squares2X2Icon,
  TruckIcon,
  MapIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { REGISTER_PROPERTY_TYPES } from '@/lib/utils/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/helpers';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { propertiesApi } from '@/lib/api/properties';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Building: BuildingOffice2Icon,
  Store: BuildingStorefrontIcon,
  House: HomeIcon,
  Office: ComputerDesktopIcon,
  Apartment: BuildingOfficeIcon,
  Room: Squares2X2Icon,
  Garage: TruckIcon,
  Terrain: MapIcon,
};

const LISTING_VALUES = ['rent', 'sale', 'vacation'] as const;
/** Default point (Cape Verde, near Praia) when user does not provide coords */
const DEFAULT_COORDINATES: [number, number] = [-23.5136, 14.9331];

export type RegisterFormState = {
  step: 1 | 2 | 3 | 4 | 'success';
  // step 1
  selectedTypeIndex: number | null;
  listingType: string;
  price: string;
  // step 2
  address: string;
  latitude: string;
  longitude: string;
  // step 3
  rooms: string;
  bathrooms: string;
  areaTotal: string;
  areaUtil: string;
  yearBuilt: string;
  hasGarage: boolean;
  // step 4
  title: string;
  description: string;
};

const initialFormState: RegisterFormState = {
  step: 1,
  selectedTypeIndex: null,
  listingType: 'sale',
  price: '',
  address: '',
  latitude: '',
  longitude: '',
  rooms: '',
  bathrooms: '',
  areaTotal: '',
  areaUtil: '',
  yearBuilt: '',
  hasGarage: false,
  title: '',
  description: '',
};

export default function RegistarImovelPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [form, setForm] = useState<RegisterFormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const propertyType =
    form.selectedTypeIndex !== null
      ? REGISTER_PROPERTY_TYPES[form.selectedTypeIndex].id
      : null;

  const update = (patch: Partial<RegisterFormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const canStep1 =
    propertyType && form.price.trim() && Number(form.price) >= 0;
  const canStep2 = true;
  const canStep3 = true;
  const canStep4 =
    form.title.trim().length > 0 && form.description.trim().length > 0;

  const getCoordinates = (): [number, number] => {
    const lat = parseFloat(form.latitude);
    const lon = parseFloat(form.longitude);
    if (
      !Number.isNaN(lat) &&
      !Number.isNaN(lon) &&
      lat >= -90 &&
      lat <= 90 &&
      lon >= -180 &&
      lon <= 180
    ) {
      return [lon, lat];
    }
    return DEFAULT_COORDINATES;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyType || !form.price.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const [lon, lat] = getCoordinates();
      const payload = {
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [lon, lat] as [number, number],
        },
        properties: {
          title: form.title.trim(),
          description: form.description.trim(),
          property_type: propertyType,
          status: 'RASCUNHO',
          price: String(Number(form.price).toFixed(2)),
          currency: 'CVE',
          address: form.address.trim() || '',
          area_total: form.areaTotal.trim()
            ? String(Number(form.areaTotal).toFixed(2))
            : null,
          area_util: form.areaUtil.trim()
            ? String(Number(form.areaUtil).toFixed(2))
            : null,
          rooms: Math.max(0, parseInt(form.rooms, 10) || 0),
          bathrooms: Math.max(0, parseInt(form.bathrooms, 10) || 0),
          year_built: form.yearBuilt.trim()
            ? Math.max(1800, parseInt(form.yearBuilt, 10) || null)
            : null,
          has_garage: form.hasGarage,
          amenities: { listing_type: form.listingType },
        },
      };
      await propertiesApi.createWithGeoJson(payload);
      update({ step: 'success' });
    } catch (err) {
      setSubmitError(t('registerProperty.errorSubmit'));
    } finally {
      setSubmitting(false);
    }
  };

  if (form.step === 'success') {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
          <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
            <CheckCircleIcon className="h-10 w-10 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold">
                {t('registerProperty.successTitle')}
              </h2>
              <p className="mt-1 text-sm opacity-90">
                {t('registerProperty.successMessage')}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/agente/imoveis">
              <Button>{t('registerProperty.viewList')}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stepLabels = [
    t('registerProperty.step1'),
    t('registerProperty.step2'),
    t('registerProperty.step3'),
    t('registerProperty.step4'),
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/agente/imoveis"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-primary-blue-600 hover:underline dark:text-primary-blue-400"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {t('registerProperty.backToList')}
      </Link>

      <h1 className="mb-2 text-2xl font-bold text-primary-blue-600 dark:text-primary-blue-400">
        {t('registerProperty.title')}
      </h1>
      <div className="mb-8 flex gap-2">
        {stepLabels.map((label, i) => (
          <span
            key={i}
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              form.step === i + 1
                ? 'bg-primary-blue-600 text-white dark:bg-primary-blue-500'
                : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            )}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {form.step === 1 && (
          <>
            <div>
              <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('registerProperty.propertyType')}
              </p>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
                {REGISTER_PROPERTY_TYPES.map((item, index) => {
                  const Icon = ICONS[item.icon] ?? BuildingOffice2Icon;
                  const isSelected = form.selectedTypeIndex === index;
                  return (
                    <button
                      key={`${item.label}-${index}`}
                      type="button"
                      onClick={() => update({ selectedTypeIndex: index })}
                      className={cn(
                        'flex flex-col items-center justify-center rounded-xl border-2 bg-gray-50 py-4 transition dark:bg-gray-800/50',
                        isSelected
                          ? 'border-primary-blue-600 bg-primary-blue-50 dark:border-primary-blue-500 dark:bg-primary-blue-900/20'
                          : 'border-transparent hover:border-gray-300 hover:bg-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-800'
                      )}
                    >
                      <Icon className="mb-2 h-8 w-8 text-primary-blue-600 dark:text-primary-blue-400" />
                      <span className="text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('registerProperty.price')}
              </label>
              <Input
                type="number"
                min={0}
                step={1}
                value={form.price}
                onChange={(e) => update({ price: e.target.value })}
                placeholder="0"
                leftAddon={<span className="text-gray-500">CVE</span>}
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('registerProperty.listingType')}
              </p>
              <div className="flex flex-wrap gap-3">
                {LISTING_VALUES.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => update({ listingType: value })}
                    className={cn(
                      'rounded-lg border-2 px-5 py-2.5 text-sm font-medium transition',
                      form.listingType === value
                        ? 'border-primary-blue-600 bg-primary-blue-600 text-white dark:border-primary-blue-500 dark:bg-primary-blue-500'
                        : 'border-primary-blue-200 bg-white text-primary-blue-600 hover:bg-primary-blue-50 dark:border-primary-blue-800 dark:bg-gray-800 dark:text-primary-blue-400 dark:hover:bg-primary-blue-900/20'
                    )}
                  >
                    {t(`registerProperty.${value}`)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {form.step === 2 && (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('registerProperty.address')}
              </label>
              <Input
                type="text"
                value={form.address}
                onChange={(e) => update({ address: e.target.value })}
                placeholder={t('registerProperty.addressPlaceholder')}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('registerProperty.latLonOptional')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('registerProperty.latitude')}
                </label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={form.latitude}
                  onChange={(e) => update({ latitude: e.target.value })}
                  placeholder="14.93"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('registerProperty.longitude')}
                </label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={form.longitude}
                  onChange={(e) => update({ longitude: e.target.value })}
                  placeholder="-23.51"
                />
              </div>
            </div>
          </>
        )}

        {form.step === 3 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('registerProperty.rooms')}
                </label>
                <Input
                  type="number"
                  min={0}
                  value={form.rooms}
                  onChange={(e) => update({ rooms: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('registerProperty.bathrooms')}
                </label>
                <Input
                  type="number"
                  min={0}
                  value={form.bathrooms}
                  onChange={(e) => update({ bathrooms: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('registerProperty.areaTotal')}
                </label>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={form.areaTotal}
                  onChange={(e) => update({ areaTotal: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('registerProperty.areaUtil')}
                </label>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={form.areaUtil}
                  onChange={(e) => update({ areaUtil: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('registerProperty.yearBuilt')}
              </label>
              <Input
                type="number"
                min={1800}
                max={new Date().getFullYear() + 1}
                value={form.yearBuilt}
                onChange={(e) => update({ yearBuilt: e.target.value })}
                placeholder="2020"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.hasGarage}
                onChange={(e) => update({ hasGarage: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-blue-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('registerProperty.hasGarage')}
              </span>
            </label>
          </>
        )}

        {form.step === 4 && (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('registerProperty.propertyTitle')}
              </label>
              <Input
                type="text"
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
                placeholder={t('registerProperty.propertyTitlePlaceholder')}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('registerProperty.description')}
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary-blue-500 focus:ring-1 focus:ring-primary-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                rows={4}
                value={form.description}
                onChange={(e) => update({ description: e.target.value })}
                placeholder={t('registerProperty.descriptionPlaceholder')}
                required
              />
            </div>
            {submitError && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {submitError}
              </p>
            )}
          </>
        )}

        <div className="flex flex-wrap gap-3 pt-4">
          {form.step > 1 && form.step !== 'success' && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                update({ step: (form.step - 1) as 1 | 2 | 3 | 4 })
              }
            >
              {t('registerProperty.previous')}
            </Button>
          )}
          {form.step < 4 && (
            <Button
              type="button"
              disabled={
                (form.step === 1 && !canStep1) ||
                (form.step === 2 && !canStep2) ||
                (form.step === 3 && !canStep3)
              }
              onClick={() => {
                if (form.step === 1 && canStep1)
                  update({ step: 2 });
                else if (form.step === 2 && canStep2)
                  update({ step: 3 });
                else if (form.step === 3 && canStep3)
                  update({ step: 4 });
              }}
            >
              {t('registerProperty.continue')}
            </Button>
          )}
          {form.step === 4 && (
            <Button type="submit" disabled={!canStep4 || submitting}>
              {submitting ? t('common.loading') : t('registerProperty.submit')}
            </Button>
          )}
          {form.step === 1 && (
            <Link href="/agente/imoveis">
              <Button type="button" variant="outline">
                {t('registerProperty.cancel')}
              </Button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
