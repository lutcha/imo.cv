'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BuildingOfficeIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  StarIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon as CheckBadgeSolid } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils/helpers';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AgencyProfile {
  id: string;
  name: string;
  slug: string;
  nif: string;
  email: string;
  phone: string;
  website: string | null;
  logo: string | null;
  is_verified: boolean;
  docs_approved: boolean;
  subscription_plan: 'STARTER' | 'PRO' | 'PREMIUM';
  subscription_plan_display: string;
  rating: string;
  created_at: string;
  updated_at: string;
}

interface AgencyPatchPayload {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

async function fetchAgencyMe(): Promise<AgencyProfile> {
  const token = localStorage.getItem('access_token');
  const res = await fetch('/api/backend/agencies/me/', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error('Erro ao carregar perfil');
  return res.json();
}

async function patchAgencyMe(payload: AgencyPatchPayload): Promise<AgencyProfile> {
  const token = localStorage.getItem('access_token');
  const res = await fetch('/api/backend/agencies/me/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Plan badge
// ---------------------------------------------------------------------------

const PLAN_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  STARTER: {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-700 dark:text-gray-200',
    border: 'border-gray-300 dark:border-gray-600',
  },
  PRO: {
    bg: 'bg-trust-blue-50 dark:bg-trust-blue-900/30',
    text: 'text-trust-blue-700 dark:text-trust-blue-300',
    border: 'border-trust-blue-300 dark:border-trust-blue-600',
  },
  PREMIUM: {
    bg: 'bg-dream-gold-50 dark:bg-dream-gold-900/30',
    text: 'text-dream-gold-700 dark:text-dream-gold-300',
    border: 'border-dream-gold-300 dark:border-dream-gold-600',
  },
};

function PlanBadge({ plan, label }: { plan: string; label: string }) {
  const styles = PLAN_STYLES[plan] ?? PLAN_STYLES.STARTER;
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border',
      styles.bg, styles.text, styles.border
    )}>
      {plan === 'PREMIUM' && <StarIcon className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Field row (read / edit)
// ---------------------------------------------------------------------------

function Field({
  label,
  value,
  editValue,
  editing,
  onChange,
  type = 'text',
  readOnly = false,
}: {
  label: string;
  value: string;
  editValue: string;
  editing: boolean;
  onChange: (v: string) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 self-center">{label}</dt>
      <dd className="col-span-2">
        {editing && !readOnly ? (
          <input
            type={type}
            value={editValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:border-trust-blue-500 focus:ring-1 focus:ring-trust-blue-500"
          />
        ) : (
          <span className={cn(
            'text-sm',
            readOnly ? 'text-gray-400 dark:text-gray-500 italic' : 'text-gray-900 dark:text-white'
          )}>
            {value || <span className="text-gray-400">—</span>}
          </span>
        )}
      </dd>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AgenteConfiguracoesPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<AgencyPatchPayload>({});
  const [saveError, setSaveError] = useState('');

  const { data: agency, isLoading, error } = useQuery({
    queryKey: ['agency-me'],
    queryFn: fetchAgencyMe,
    staleTime: 2 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: patchAgencyMe,
    onSuccess: (updated) => {
      qc.setQueryData(['agency-me'], updated);
      setEditing(false);
      setDraft({});
      setSaveError('');
    },
    onError: (err: Error) => {
      setSaveError(err.message);
    },
  });

  const startEdit = () => {
    if (!agency) return;
    setDraft({
      name: agency.name,
      email: agency.email,
      phone: agency.phone,
      website: agency.website ?? '',
    });
    setEditing(true);
    setSaveError('');
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft({});
    setSaveError('');
  };

  const saveEdit = () => {
    const payload: AgencyPatchPayload = {};
    if (draft.name !== agency?.name) payload.name = draft.name;
    if (draft.email !== agency?.email) payload.email = draft.email;
    if (draft.phone !== agency?.phone) payload.phone = draft.phone;
    if ((draft.website ?? '') !== (agency?.website ?? '')) payload.website = draft.website;
    if (Object.keys(payload).length === 0) { cancelEdit(); return; }
    mutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-trust-blue-600" />
      </div>
    );
  }

  if (error || !agency) {
    return (
      <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-6 text-red-600 dark:text-red-400 text-sm">
        Não foi possível carregar o perfil da agência.
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h1>

      {/* ── Status badges ── */}
      <div className="flex flex-wrap gap-3">
        <PlanBadge plan={agency.subscription_plan} label={`Plano ${agency.subscription_plan_display}`} />

        {agency.is_verified ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-hope-green-50 dark:bg-hope-green-900/30 text-hope-green-700 dark:text-hope-green-300 border border-hope-green-300 dark:border-hope-green-600">
            <CheckBadgeSolid className="h-3.5 w-3.5" />
            Agência Verificada
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-600">
            <ExclamationTriangleIcon className="h-3.5 w-3.5" />
            Verificação Pendente
          </span>
        )}

        {parseFloat(agency.rating) > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
            <StarIcon className="h-3.5 w-3.5" />
            {parseFloat(agency.rating).toFixed(1)}
          </span>
        )}
      </div>

      {/* ── Profile card ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <BuildingOfficeIcon className="h-5 w-5 text-trust-blue-600" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Perfil da Agência</h2>
          </div>
          {!editing ? (
            <button
              onClick={startEdit}
              className="flex items-center gap-1.5 text-sm text-trust-blue-600 hover:text-trust-blue-700 dark:text-trust-blue-400 font-medium"
            >
              <PencilSquareIcon className="h-4 w-4" />
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={cancelEdit}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <XMarkIcon className="h-4 w-4" />
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                disabled={mutation.isPending}
                className="flex items-center gap-1 text-sm font-semibold text-hope-green-600 hover:text-hope-green-700 dark:text-hope-green-400 disabled:opacity-50"
              >
                <CheckIcon className="h-4 w-4" />
                {mutation.isPending ? 'A guardar...' : 'Guardar'}
              </button>
            </div>
          )}
        </div>

        <dl className="px-6 py-2">
          <Field
            label="Nome"
            value={agency.name}
            editValue={draft.name ?? agency.name}
            editing={editing}
            onChange={(v) => setDraft(d => ({ ...d, name: v }))}
          />
          <Field
            label="NIF"
            value={agency.nif}
            editValue={agency.nif}
            editing={editing}
            onChange={() => {}}
            readOnly
          />
          <Field
            label="Email"
            value={agency.email}
            editValue={draft.email ?? agency.email}
            editing={editing}
            onChange={(v) => setDraft(d => ({ ...d, email: v }))}
            type="email"
          />
          <Field
            label="Telefone"
            value={agency.phone}
            editValue={draft.phone ?? agency.phone}
            editing={editing}
            onChange={(v) => setDraft(d => ({ ...d, phone: v }))}
            type="tel"
          />
          <Field
            label="Website"
            value={agency.website ?? ''}
            editValue={draft.website ?? agency.website ?? ''}
            editing={editing}
            onChange={(v) => setDraft(d => ({ ...d, website: v }))}
            type="url"
          />
          <Field
            label="Slug"
            value={agency.slug}
            editValue={agency.slug}
            editing={editing}
            onChange={() => {}}
            readOnly
          />
        </dl>

        {saveError && (
          <div className="mx-6 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
            {saveError}
          </div>
        )}
      </div>

      {/* ── Plan info card ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 py-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Plano e Verificação</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Plano atual</span>
            <PlanBadge plan={agency.subscription_plan} label={agency.subscription_plan_display} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Documentos aprovados</span>
            <span className={cn(
              'font-medium',
              agency.docs_approved ? 'text-hope-green-600 dark:text-hope-green-400' : 'text-amber-600 dark:text-amber-400'
            )}>
              {agency.docs_approved ? 'Sim' : 'Pendente'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Agência verificada</span>
            <span className={cn(
              'font-medium',
              agency.is_verified ? 'text-hope-green-600 dark:text-hope-green-400' : 'text-amber-600 dark:text-amber-400'
            )}>
              {agency.is_verified ? 'Sim' : 'Não'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Membro desde</span>
            <span className="text-gray-900 dark:text-white">
              {new Date(agency.created_at).toLocaleDateString('pt-CV', { year: 'numeric', month: 'long' })}
            </span>
          </div>
        </div>

        {!agency.is_verified && (
          <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3 text-xs text-amber-700 dark:text-amber-400">
            Para verificar a sua agência, envie os documentos para{' '}
            <a href="mailto:verificacao@imo.cv" className="underline font-medium">verificacao@imo.cv</a>.
          </div>
        )}
      </div>
    </div>
  );
}
