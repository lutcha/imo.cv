'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    q: 'A plataforma funciona sem internet estável?',
    a: 'Sim, a imo.cv foi desenhada para o contexto local. O CRM e a gestão de condomínios funcionam em modo offline e sincronizam automaticamente quando a ligação é restabelecida. As funcionalidades críticas nunca ficam bloqueadas por falhas de rede.',
  },
  {
    q: 'Como é feito o pagamento das mensalidades?',
    a: 'Aceitamos Vinti4, transferência bancária e cartões internacionais (Visa/Mastercard). Todos os pagamentos são processados de forma segura. Para condomínios, os moradores também podem pagar quotas directamente pela app.',
  },
  {
    q: 'Existe apoio técnico local?',
    a: 'Sim! Temos equipas de suporte na Praia e no Mindelo, disponíveis em horário de trabalho. O suporte premium (planos Pro/Professional) inclui resposta prioritária e acompanhamento dedicado por um gestor de conta.',
  },
  {
    q: 'Como é feita a migração dos meus dados actuais?',
    a: 'A nossa equipa de onboarding ajuda a importar imóveis, leads e clientes existentes. O processo demora em média 48 horas e não há interrupção de serviço. Importamos de Excel, CSV, ou outros CRMs.',
  },
];

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Tira as tuas dúvidas antes de começar
          </p>
        </div>

        <div className="mt-10 divide-y divide-gray-200 dark:divide-gray-800">
          {faqs.map((faq, i) => (
            <div key={i} className="py-4">
              <button
                className="flex w-full items-start justify-between gap-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                  {faq.q}
                </span>
                <ChevronDownIcon
                  className={`mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tens mais dúvidas?{' '}
            <a
              href="/contact"
              className="font-semibold hover:underline"
              style={{ color: '#005baa' }}
            >
              Fala connosco
            </a>{' '}
            ou envia email para{' '}
            <a
              href="mailto:suporte@imo.cv"
              className="font-semibold hover:underline"
              style={{ color: '#005baa' }}
            >
              suporte@imo.cv
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
