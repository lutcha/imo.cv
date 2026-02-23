import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRM para Agências Imobiliárias | imo.cv',
  description:
    'Transforme a sua agência com o CRM líder nacional. Gestão de leads, funil Kanban, analytics de vendas e muito mais.',
};

const features = [
  {
    icon: '💬',
    title: 'Gestão de Leads WhatsApp',
    desc: 'Captura automática de leads do WhatsApp Business. Notificações em tempo real e resposta directa no sistema.',
  },
  {
    icon: '📋',
    title: 'Funil Kanban',
    desc: 'Visualiza todo o teu pipeline de vendas. Arrasta leads entre etapas e nunca percas um negócio de vista.',
  },
  {
    icon: '📈',
    title: 'Analytics de Vendas',
    desc: 'Relatórios de conversão, taxa de follow-up e desempenho por agente. Decisões baseadas em dados reais.',
  },
  {
    icon: '📡',
    title: 'Automação de Anúncios',
    desc: 'Publica os teus imóveis automaticamente nos principais portais nacionais e internacionais.',
  },
];

const agencias = ['CVImóveis', 'PraiaHouse', 'MindeloEstates', 'SalInvest', 'BoaVista Luxury'];

const plans = [
  {
    name: 'Starter',
    price: '4.500',
    desc: 'Para agências a começar.',
    features: ['5 imóveis activos', 'CRM básico', '3 utilizadores', 'Suporte por email', 'App mobile'],
    cta: 'Começar grátis 14 dias',
    featured: false,
  },
  {
    name: 'Pro',
    price: '9.000',
    desc: 'Para agências em crescimento.',
    features: [
      'Imóveis ilimitados',
      'Analytics avançado',
      'Pipeline completo',
      'WhatsApp premium',
      'Utilizadores ilimitados',
      'Gestor de conta dedicado',
    ],
    cta: 'Aderir ao Pro',
    featured: true,
  },
];

export default function CrmSolucaoPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 py-20 sm:py-28"
        style={{ background: 'linear-gradient(135deg, #005baa 0%, #003e76 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                CRM para Agências
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
                Transforme a sua Agência com o CRM Líder Nacional
              </h1>
              <p className="mt-5 text-lg text-white/80">
                Centraliza todos os teus leads, imóveis e clientes numa só plataforma.
                Fecha mais negócios, trabalha menos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/agente/login"
                  className="inline-flex items-center rounded-xl bg-[#ec7f13] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
                >
                  Começar agora grátis
                </Link>
                <Link
                  href="#precos"
                  className="inline-flex items-center rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Ver preços
                </Link>
              </div>
            </div>

            {/* Right: stats mockup */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#ec7f13]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  Dashboard ao vivo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Leads este mês', value: '42', trend: '+18%' },
                  { label: 'Taxa de conversão', value: '23%', trend: '+42%' },
                  { label: 'Negócios fechados', value: '9', trend: '+3' },
                  { label: 'Receita (mês)', value: '2.1M', trend: 'CVE' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white/10 p-3"
                  >
                    <p className="text-xs text-white/50">{stat.label}</p>
                    <p className="mt-1 text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-xs font-semibold text-[#ec7f13]">{stat.trend}</p>
                  </div>
                ))}
              </div>
              {/* Mini pipeline */}
              <div className="mt-4 rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs text-white/40">Pipeline de vendas</p>
                <div className="flex gap-1">
                  {[
                    { label: 'Novos', w: 'w-full', color: '#005baa' },
                    { label: 'Em contacto', w: 'w-4/5', color: '#1d6faa' },
                    { label: 'Visita', w: 'w-3/5', color: '#ec7f13' },
                    { label: 'Proposta', w: 'w-2/5', color: '#008542' },
                  ].map((stage) => (
                    <div key={stage.label} className="flex-1">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <p className="mt-1 text-[9px] text-white/40">{stage.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <div className="border-b border-gray-100 bg-gray-50 py-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
            Usada pelas melhores agências de Cabo Verde
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {agencias.map((a) => (
              <span key={a} className="text-sm font-bold text-gray-400">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            Tudo o que a tua agência precisa
          </h2>
          <p className="mt-3 text-gray-500">Funcionalidades pensadas para o mercado cabo-verdiano.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-bold text-gray-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">Planos simples e transparentes</h2>
            <p className="mt-3 text-gray-500">Começa grátis durante 14 dias. Sem cartão de crédito.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-950 ${
                  plan.featured ? 'border-2 ring-2 ring-[#ec7f13]/20' : 'border border-gray-200 dark:border-gray-800'
                }`}
                style={plan.featured ? { borderColor: '#ec7f13' } : {}}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#ec7f13] px-4 py-1 text-xs font-bold text-white shadow">
                      Mais Popular
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.desc}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="mb-1 text-sm text-gray-500">CVE/mês</span>
                  </div>
                </div>
                <ul className="my-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircleIcon className="h-4 w-4 shrink-0 text-[#008542]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/agente/login"
                  className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: plan.featured ? '#ec7f13' : '#005baa' }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="px-4 py-16 text-center"
        style={{ background: 'linear-gradient(135deg, #005baa 0%, #003e76 100%)' }}
      >
        <h2 className="text-2xl font-black text-white sm:text-3xl">
          Pronto para levar a sua agência ao próximo nível?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">
          Junte-se às agências que já cresceram com a imo.cv. Começa grátis hoje.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/agente/login"
            className="rounded-xl bg-[#ec7f13] px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
          >
            Começar grátis
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border-2 border-white/30 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            Agendar demonstração
          </Link>
        </div>
      </section>
    </div>
  );
}
