'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLead } from '@/lib/hooks/useLeads';
import { crmApi, type CRMInteractionType, type CreateCRMInteractionPayload } from '@/lib/api/crm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const INTERACTION_TYPE_KEYS: Record<CRMInteractionType, string> = {
  CHAMADA: 'agent.leadDetail.typeCall',
  EMAIL: 'agent.leadDetail.typeEmail',
  WHATSAPP: 'agent.leadDetail.typeWhatsapp',
  REUNIAO: 'agent.leadDetail.typeMeeting',
  VISITA: 'agent.leadDetail.typeVisit',
  OUTRO: 'agent.leadDetail.typeOther',
};

function formatDate(s: string | null) {
  if (!s) return '—';
  return new Date(s).toLocaleDateString('pt-CV', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const INTERACTION_TYPES_ORDER: CRMInteractionType[] = ['CHAMADA', 'EMAIL', 'WHATSAPP', 'REUNIAO', 'VISITA', 'OUTRO'];

export default function LeadDetailPage() {
  const { t } = useLocale();
  const params = useParams();
  const queryClient = useQueryClient();
  const id = params?.id as string;

  const { data: lead, isLoading: leadLoading, isError: leadError } = useLead(id);
  const { data: interactions = [], isLoading: interactionsLoading } = useQuery({
    queryKey: ['crm', id],
    queryFn: () => crmApi.listByLead(id),
    enabled: !!id,
  });

  const createInteraction = useMutation({
    mutationFn: (payload: CreateCRMInteractionPayload) => crmApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm', id] });
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
    },
  });

  const handleNewInteraction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const followUp = formData.get('follow_up_date') as string;
    createInteraction.mutate(
      {
        lead: id,
        interaction_type: formData.get('interaction_type') as CRMInteractionType,
        summary: (formData.get('summary') as string) || '',
        description: (formData.get('description') as string) || undefined,
        follow_up_date: followUp || undefined,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  if (leadError || (!leadLoading && !lead)) {
    return (
      <div>
        <Link href="/agente/leads" className="text-primary-blue-600 hover:underline">
          ← {t('agent.leadDetail.backToPipeline')}
        </Link>
        <p className="mt-4 text-red-600">{t('agent.leadDetail.notFound')}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/agente/leads"
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="h-5 w-5" /> {t('agent.leadDetail.backToPipeline')}
        </Link>
      </div>

      {leadLoading ? (
        <p className="text-gray-500">{t('agent.leadDetail.loading')}</p>
      ) : lead ? (
        <>
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h1 className="text-2xl font-bold text-imo-dark dark:text-white">
              {lead.full_name}
            </h1>
            <dl className="mt-4 grid gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">{t('agent.leadDetail.email')}</dt>
                <dd>
                  <a href={`mailto:${lead.email}`} className="text-primary-blue-600 hover:underline">
                    {lead.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">{t('agent.leadDetail.phone')}</dt>
                <dd>{lead.phone || '—'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">{t('agent.leadDetail.status')}</dt>
                <dd>{lead.status}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">{t('agent.leadDetail.priority')}</dt>
                <dd>{lead.priority}</dd>
              </div>
              {lead.property_title && (
                <div className="sm:col-span-2">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">{t('agent.leadDetail.propertyOfInterest')}</dt>
                  <dd>{lead.property_title}</dd>
                </div>
              )}
              {lead.notes && (
                <div className="sm:col-span-2">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">{t('agent.leadDetail.notes')}</dt>
                  <dd className="whitespace-pre-wrap">{lead.notes}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-gray-500 dark:text-gray-400">{t('agent.leadDetail.source')}</dt>
                <dd>{lead.source || '—'}</dd>
              </div>
            </dl>
          </div>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-imo-dark dark:text-white">
              {t('agent.leadDetail.newInteraction')}
            </h2>
            <form
              onSubmit={handleNewInteraction}
              className="mb-10 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 sm:max-w-xl"
            >
              <div>
                <label htmlFor="interaction_type" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('agent.leadDetail.interactionType')}
                </label>
                <select
                  id="interaction_type"
                  name="interaction_type"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {INTERACTION_TYPES_ORDER.map((value) => (
                    <option key={value} value={value}>
                      {t(INTERACTION_TYPE_KEYS[value])}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="summary" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('agent.leadDetail.summary')} *
                </label>
                <Input id="summary" name="summary" required maxLength={255} placeholder={t('agent.leadDetail.summaryPlaceholder')} />
              </div>
              <div>
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('agent.leadDetail.description')}
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={t('agent.leadDetail.descriptionPlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="follow_up_date" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('agent.leadDetail.followUp')}
                </label>
                <Input
                  id="follow_up_date"
                  name="follow_up_date"
                  type="datetime-local"
                  className="w-full"
                />
              </div>
              <Button type="submit" disabled={createInteraction.isPending}>
                {createInteraction.isPending ? t('agent.leadDetail.saving') : t('agent.leadDetail.registerInteraction')}
              </Button>
            </form>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-imo-dark dark:text-white">
              {t('agent.leadDetail.interactionHistory')} ({interactions.length})
            </h2>
            {interactionsLoading ? (
              <p className="text-gray-500">{t('agent.leadDetail.loading')}</p>
            ) : interactions.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">{t('agent.leadDetail.noInteractions')}</p>
            ) : (
              <ul className="space-y-4">
                {interactions.map((i) => (
                  <li
                    key={i.id}
                    className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatDate(i.interaction_date)}</span>
                      <span>·</span>
                      <span>{t(INTERACTION_TYPE_KEYS[i.interaction_type] ?? 'agent.leadDetail.typeOther')}</span>
                      <span>·</span>
                      <span>{i.agent_name}</span>
                    </div>
                    <p className="mt-1 font-medium text-imo-dark dark:text-white">{i.summary}</p>
                    {i.description && (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{i.description}</p>
                    )}
                    {i.follow_up_date && (
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {t('agent.leadDetail.followUpLabel')}: {formatDate(i.follow_up_date)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
