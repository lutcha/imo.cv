'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  HomeIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '@/lib/api/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type Role = 'buyer' | 'agent' | 'condo' | 'investor';

const ROLES: { id: Role; label: string; desc: string; icon: React.ElementType; color: string }[] = [
  {
    id: 'buyer',
    label: 'Comprador / Inquilino',
    desc: 'Pesquisa e guarda imóveis',
    icon: HomeIcon,
    color: '#005baa',
  },
  {
    id: 'agent',
    label: 'Agente Imobiliário',
    desc: 'CRM, leads e listagens',
    icon: BuildingStorefrontIcon,
    color: '#ec7f13',
  },
  {
    id: 'condo',
    label: 'Gestor de Condomínio',
    desc: 'Quotas, comunicados, reservas',
    icon: BuildingOffice2Icon,
    color: '#008542',
  },
  {
    id: 'investor',
    label: 'Investidor',
    desc: 'Market Intelligence e ROI',
    icon: ChartBarIcon,
    color: '#1e3b8a',
  },
];

const ROLE_REDIRECT: Record<Role, string> = {
  buyer: '/utilizador',
  agent: '/agente',
  condo: '/agente/condominios',
  investor: '/agente/market-intelligence',
};

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<Role>('agent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ email, password });
      setAuth(res.user, res.access);
      router.push(ROLE_REDIRECT[role]);
      router.refresh();
    } catch {
      setError('Email ou palavra-passe incorretos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Left: Brand Hero ── */}
      <div
        className="relative hidden w-[52%] flex-col justify-between overflow-hidden p-10 lg:flex"
        style={{ background: 'linear-gradient(145deg, #005baa 0%, #003572 60%, #001f4a 100%)' }}
      >
        {/* Dot-grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Pseudo-photo: layered shapes evoking coastal real estate */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-2/5 rounded-tl-[80px] bg-white/5 backdrop-blur-sm" />
          <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-[#ec7f13]/10 blur-3xl" />
          <div className="absolute top-24 -left-16 h-64 w-64 rounded-full bg-[#008542]/10 blur-3xl" />
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 text-2xl font-black text-white">
          imo.cv
        </Link>

        {/* Hero copy */}
        <div className="relative z-10">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
            Bem-vindo ao centro do mercado imobiliário de Cabo Verde
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Acede à maior plataforma de propriedades e conecta-te com profissionais do setor.
          </p>

          {/* Stats */}
          <div className="mt-8 flex gap-8">
            {[
              { value: '+12.000', label: 'Imóveis' },
              { value: '+500', label: 'Agências' },
              { value: '9', label: 'Ilhas' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              <ShieldCheckIcon className="h-4 w-4" />
              Plataforma Segura
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              <MapPinIcon className="h-4 w-4" />
              Todas as Ilhas
            </span>
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex w-full flex-col justify-center overflow-auto px-6 py-10 lg:w-[48%] lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="mb-8 block text-xl font-black lg:hidden" style={{ color: '#005baa' }}>
            imo.cv
          </Link>

          {/* Tabs */}
          <div className="mb-8 flex rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
                  tab === t
                    ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                {t === 'login' ? 'Entrar' : 'Criar Conta'}
              </button>
            ))}
          </div>

          {/* Social logins */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-500 opacity-60 dark:border-gray-700 dark:bg-gray-800"
            >
              <span className="font-black text-base">G</span> Google
            </button>
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-500 opacity-60 dark:border-gray-700 dark:bg-gray-800"
            >
              <span className="text-base">f</span> Facebook
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400">
              <span className="bg-white px-3 dark:bg-gray-900">ou use o email</span>
            </div>
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </p>
            )}
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-gray-500 dark:text-gray-400">
                E-mail
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                leftAddon={<EnvelopeIcon className="h-5 w-5" />}
              />
            </label>
            <label className="block">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Palavra-passe
                </span>
                <Link
                  href="/agente/esqueci-password"
                  className="text-xs font-semibold hover:underline"
                  style={{ color: '#005baa' }}
                >
                  Esqueceu-se?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                leftAddon={<LockClosedIcon className="h-5 w-5" />}
              />
            </label>

            {/* Role selector */}
            <div className="pt-2">
              <p className="mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                Sou um…
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const selected = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`relative flex flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition ${
                        selected
                          ? 'shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800'
                      }`}
                      style={
                        selected
                          ? { borderColor: r.color, backgroundColor: `${r.color}0d` }
                          : undefined
                      }
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: selected ? r.color : '#9ca3af' }}
                      />
                      <span
                        className="text-xs font-bold leading-tight"
                        style={{ color: selected ? r.color : '#374151' }}
                      >
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 text-sm font-bold"
              rightIcon={<ArrowRightIcon className="h-4 w-4" />}
              style={{ backgroundColor: '#005baa' } as React.CSSProperties}
            >
              {loading ? 'A entrar…' : 'Continuar para o Portal'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            <Link href="/" className="hover:underline" style={{ color: '#005baa' }}>
              ← Voltar ao início
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
