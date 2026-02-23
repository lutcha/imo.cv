'use client';

import Link from 'next/link';
import {
  BellAlertIcon,
  PlusIcon,
  MapPinIcon,
  BoltIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const FAVORITES = [
  {
    id: 1,
    title: 'Apartamento T3 em Palmarejo',
    price: '10.000.000 CVE',
    location: 'Praia',
    type: 'Venda',
    img: null,
    color: '#005baa',
  },
  {
    id: 2,
    title: 'T2 em Achada Sto António',
    price: '8.500.000 CVE',
    location: 'Achada',
    type: 'Venda',
    img: null,
    color: '#008542',
  },
];

const ALERTS = [
  {
    id: 1,
    label: 'T2 em Palmarejo',
    detail: 'Abaixo de 10M CVE',
    active: true,
    new: 3,
    color: '#005baa',
  },
  {
    id: 2,
    label: 'T1 em Achada Sto Ant.',
    detail: 'Em Destaque',
    active: true,
    new: 1,
    color: '#ec7f13',
  },
];

const CONTACTS = [
  {
    id: 1,
    name: 'Imobiliária Praia Norte',
    location: 'Sal 13 Palmarejo',
    badge: 'RECOMENDADO',
    badgeColor: '#008542',
  },
  {
    id: 2,
    name: 'Mindelo Real Estate',
    location: 'Sal 13 Urbano São',
    badge: 'RESPONDIDO',
    badgeColor: '#005baa',
  },
];

export default function UtilizadorDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Bem-vindo de volta, Utilizador!
          </h1>
          <p className="text-sm text-gray-500">Veja as novidades das suas pesquisas guardadas e favoritos.</p>
        </div>

        {/* Profile completion */}
        <div className="w-full max-w-xs rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Perfil 85% Completo</span>
            <span className="text-xs font-black" style={{ color: '#005baa' }}>85%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: '#005baa' }} />
          </div>
          <p className="mt-2 text-[10px] text-gray-400">
            Adiciona a tua foto para concluir (falta essa para 100%)
          </p>
        </div>
      </div>

      {/* Main 2-col grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left col — Favoritos + Contactos */}
        <div className="space-y-6 lg:col-span-2">
          {/* Favoritos */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-black text-gray-900 dark:text-white">
                <HeartSolid className="h-5 w-5 text-red-500" />
                Os Meus Favoritos
              </h2>
              <Link
                href="/utilizador/favoritos"
                className="text-sm font-bold hover:underline"
                style={{ color: '#005baa' }}
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {FAVORITES.map((fav) => (
                <div
                  key={fav.id}
                  className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Image placeholder */}
                  <div
                    className="flex h-36 items-center justify-center"
                    style={{ backgroundColor: `${fav.color}15` }}
                  >
                    <span className="text-4xl opacity-30">🏠</span>
                    <button
                      type="button"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow"
                    >
                      <HeartSolid className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: fav.color }}>
                      {fav.type}
                    </p>
                    <p className="mt-0.5 font-bold text-gray-900 dark:text-white">{fav.title}</p>
                    <p className="mt-1 text-lg font-black" style={{ color: fav.color }}>{fav.price}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                      <MapPinIcon className="h-3.5 w-3.5" />
                      {fav.location}
                    </div>
                    <Link
                      href={`/property/${fav.id}`}
                      className="mt-3 block w-full rounded-xl py-2 text-center text-sm font-bold text-white transition hover:brightness-110"
                      style={{ backgroundColor: fav.color }}
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))}

              {/* Add more CTA */}
              <Link
                href="/search"
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-gray-400 transition hover:border-[#005baa] hover:text-[#005baa] dark:border-gray-700 dark:bg-gray-800/50"
              >
                <PlusIcon className="h-8 w-8" />
                <span className="text-sm font-semibold">Descobrir mais imóveis</span>
              </Link>
            </div>
          </section>

          {/* Contactos Recentes */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-base font-black text-gray-900 dark:text-white">Contactos Recentes</h2>
            <div className="space-y-3">
              {CONTACTS.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-gray-700/40"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                      style={{ backgroundColor: c.badgeColor }}
                    >
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.location}</p>
                    </div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: c.badgeColor }}
                  >
                    {c.badge}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right col — Alertas + Dica Pro */}
        <div className="space-y-6">
          {/* Alertas Ativos */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-black text-gray-900 dark:text-white">Alertas Ativos</h2>
              <Link
                href="/utilizador/alertas"
                className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-white"
                style={{ backgroundColor: '#005baa' }}
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Novo Alerta
              </Link>
            </div>
            <div className="space-y-3">
              {ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between gap-2 rounded-xl border p-3"
                  style={{ borderColor: `${alert.color}30`, backgroundColor: `${alert.color}08` }}
                >
                  <div className="flex items-start gap-2">
                    <BellAlertIcon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: alert.color }} />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{alert.label}</p>
                      <p className="text-xs text-gray-500">{alert.detail}</p>
                      {alert.new > 0 && (
                        <span
                          className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-black text-white"
                          style={{ backgroundColor: alert.color }}
                        >
                          +{alert.new} novos
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {/* Toggle (visual only) */}
                    <div className="flex h-5 w-9 items-center rounded-full px-0.5" style={{ backgroundColor: alert.color }}>
                      <div className="ml-auto h-4 w-4 rounded-full bg-white shadow" />
                    </div>
                    <button type="button" className="text-gray-300 hover:text-red-400">
                      <TrashIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <Link
                href="/utilizador/alertas"
                className="block w-full rounded-xl border border-dashed border-gray-200 py-2.5 text-center text-xs font-semibold text-gray-400 hover:border-[#005baa] hover:text-[#005baa] dark:border-gray-600"
              >
                + Criar novo alerta
              </Link>
            </div>
          </section>

          {/* Dica Pro */}
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #005baa 0%, #003572 100%)' }}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ec7f13]">
              <BoltIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-black text-white">Dica Pro</h3>
            <p className="mt-2 text-sm text-white/70">
              Ativa as notificações via WhatsApp para receber todos os atualizados no teu telemóvel. Os melhores negócios ficam menos de 48h.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-[#ec7f13] py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              Configurar Notificações
            </button>
          </div>

          {/* Quick links */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-3 text-sm font-black text-gray-700 dark:text-gray-300">Acesso Rápido</h3>
            <div className="space-y-2">
              {[
                { href: '/search', label: 'Pesquisar Imóveis' },
                { href: '/search?listing_type=rent', label: 'Arrendar' },
                { href: '/ferias', label: 'Alojamento Local' },
                { href: '/obras-novas', label: 'Novas Construções' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#005baa] dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  {l.label}
                  <span className="text-gray-300">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
