import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestão de Condomínios | imo.cv',
  description:
    'Sistema completo para administradores de condomínios. Transparência financeira, votação digital e comunicação centralizada.',
};

const painPoints = [
  { icon: '⚠️', text: 'Moradores em dívida sem visibilidade' },
  { icon: '📱', text: 'Comunicação dispersa por WhatsApp/papel' },
  { icon: '🗂️', text: 'Contabilidade manual e propensa a erros' },
  { icon: '🗳️', text: 'Assembleias difíceis de organizar' },
];

const features = [
  {
    icon: '🧾',
    title: 'Faturas Automáticas',
    desc: 'Emissão automática de quotas mensais com referência Vinti4. Pagamentos registados em tempo real.',
  },
  {
    icon: '🗳️',
    title: 'Votação Digital',
    desc: 'Assembleias virtuais com votação segura. Actas digitais geradas automaticamente após cada sessão.',
  },
  {
    icon: '🏊',
    title: 'Reserva de Áreas Comuns',
    desc: 'Sistema de reservas para piscina, salão de festas e ginásio. Moradores reservam pela app.',
  },
  {
    icon: '🔧',
    title: 'Gestão de Manutenção',
    desc: 'Registo e acompanhamento de pedidos de manutenção. Histórico completo de intervenções.',
  },
];

const stats = [
  { value: '+200', label: 'Administradores activos' },
  { value: '-60%', label: 'Tempo em admin' },
  { value: '98%', label: 'Satisfação moradores' },
];

const plans = [
  {
    name: 'Básico',
    price: '500',
    note: 'CVE/unidade/mês',
    desc: 'Para condomínios pequenos.',
    features: ['Gestão de unidades', 'Emissão de faturas', 'Comunicação centralizada', 'App para moradores'],
    cta: 'Começar agora',
    featured: false,
  },
  {
    name: 'Premium',
    price: '800',
    note: 'CVE/unidade/mês',
    desc: 'Para grandes condomínios.',
    features: [
      'Tudo no Básico',
      'Relatórios financeiros',
      'Sistema de votação digital',
      'Reserva de áreas comuns',
      'Suporte prioritário',
      'Gestor de conta dedicado',
    ],
    cta: 'Aderir ao Premium',
    featured: true,
  },
];

export default function CondominiosSolucaoPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 py-20 sm:py-28"
        style={{ background: 'linear-gradient(135deg, #008542 0%, #005b2d 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            Gestão de Condomínios
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
            Gestão de Condomínios
            <br />
            Transparente e Sem Stress
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Elimina as dores de cabeça da administração. Moradores pagam online, assembleias
            são digitais e as contas são claras para toda a gente.
          </p>

          {/* Pain points */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {painPoints.map((p) => (
              <div
                key={p.text}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm"
              >
                <div className="text-2xl">{p.icon}</div>
                <p className="mt-1 text-xs text-white/70">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/agente/condominios"
              className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-bold shadow-md transition-all hover:brightness-105"
              style={{ color: '#008542' }}
            >
              Ver o sistema →
            </Link>
            <Link
              href="#precos"
              className="inline-flex items-center rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Ver preços
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black" style={{ color: '#008542' }}>
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            Tudo numa só plataforma
          </h2>
          <p className="mt-3 text-gray-500">Desenhado para a realidade dos condomínios em Cabo Verde.</p>
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
            <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">Preços por unidade</h2>
            <p className="mt-3 text-gray-500">Quanto maior o condomínio, mais económico por unidade.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-950 ${
                  plan.featured ? 'border-2 ring-2 ring-[#008542]/20' : 'border border-gray-200 dark:border-gray-800'
                }`}
                style={plan.featured ? { borderColor: '#008542' } : {}}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#008542] px-4 py-1 text-xs font-bold text-white shadow">
                      Mais Popular
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.desc}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="mb-1 text-xs text-gray-500">{plan.note}</span>
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
                  style={{ backgroundColor: '#008542' }}
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
        style={{ background: 'linear-gradient(135deg, #008542 0%, #005b2d 100%)' }}
      >
        <h2 className="text-2xl font-black text-white sm:text-3xl">
          Pronto para simplificar a gestão?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">
          Junta-te aos +200 administradores que já confiam na imo.cv.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/agente/login"
            className="rounded-xl bg-white px-8 py-3 text-sm font-bold shadow-md transition-all hover:brightness-105"
            style={{ color: '#008542' }}
          >
            Começar agora
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border-2 border-white/30 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            Agendar demo
          </Link>
        </div>
      </section>
    </div>
  );
}
