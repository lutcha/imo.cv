'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { adminApi, type PlatformSettings } from '@/lib/api/admin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminConfiguracoesPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<PlatformSettings>({
    site_name: 'imo.cv',
    contact_email: '',
    whatsapp_default: '',
    maintenance_mode: false,
    allow_registration: true,
    featured_limit: 12,
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: () => adminApi.getSettings(),
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: () => adminApi.updateSettings(form),
    onSuccess: (updated) => {
      setForm(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-imo-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
          Configurações da Plataforma
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Definições globais que afetam toda a plataforma imo.cv.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* General */}
        <Section title="Geral">
          <FieldRow label="Nome da plataforma">
            <Input
              value={form.site_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, site_name: e.target.value }))
              }
            />
          </FieldRow>
          <FieldRow label="E-mail de contacto">
            <Input
              type="email"
              value={form.contact_email}
              onChange={(e) =>
                setForm((f) => ({ ...f, contact_email: e.target.value }))
              }
            />
          </FieldRow>
          <FieldRow label="WhatsApp padrão">
            <Input
              placeholder="+238 900 0000"
              value={form.whatsapp_default}
              onChange={(e) =>
                setForm((f) => ({ ...f, whatsapp_default: e.target.value }))
              }
            />
          </FieldRow>
          <FieldRow label="Limite de imóveis em destaque">
            <Input
              type="number"
              min={1}
              max={100}
              value={String(form.featured_limit)}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  featured_limit: Number(e.target.value),
                }))
              }
            />
          </FieldRow>
        </Section>

        {/* Access */}
        <Section title="Acesso e Registo">
          <ToggleRow
            label="Modo de manutenção"
            description="Bloqueia o acesso público ao site enquanto ativo."
            checked={form.maintenance_mode}
            onChange={(v) => setForm((f) => ({ ...f, maintenance_mode: v }))}
          />
          <ToggleRow
            label="Permitir novos registos"
            description="Quando desativado, agentes não podem criar conta."
            checked={form.allow_registration}
            onChange={(v) => setForm((f) => ({ ...f, allow_registration: v }))}
          />
        </Section>

        {/* Save */}
        <div className="flex items-center gap-4 pt-2">
          <Button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? 'A guardar…' : 'Guardar alterações'}
          </Button>
          {saved && (
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <CheckCircleIcon className="h-4 w-4" />
              Guardado com sucesso
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
      <label className="min-w-[200px] text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-imo-primary focus:ring-offset-2 ${
          checked
            ? 'bg-imo-primary'
            : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
