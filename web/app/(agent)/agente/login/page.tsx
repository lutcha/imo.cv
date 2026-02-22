'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EnvelopeIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '@/lib/api/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
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
      router.push('/agente');
      router.refresh();
    } catch {
      setError('Email ou palavra-passe incorretos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: decorative background */}
      <div className="hidden min-h-screen w-1/2 flex-col justify-between bg-gradient-to-br from-primary-blue-800 to-primary-blue-950 p-10 lg:flex">
        <Link href="/" className="text-2xl font-bold text-white">
          imo.cv
        </Link>
        <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
          <p className="text-lg font-medium text-white">
            Área reservada a agentes e agências. Gestão de imóveis e leads num só lugar.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-8 text-2xl font-bold text-primary-blue-600 dark:text-primary-blue-400">
            Iniciar sessão
          </h1>

          {/* Social login placeholders - preparados para futura integração */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 rounded-lg border border-primary-blue-200 bg-white py-2.5 text-sm font-medium text-gray-500 dark:border-primary-blue-800 dark:bg-gray-800"
            >
              <span className="text-lg">G</span> Gmail
            </button>
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 rounded-lg border border-primary-blue-200 bg-white py-2.5 text-sm font-medium text-gray-500 dark:border-primary-blue-800 dark:bg-gray-800"
            >
              <span className="text-lg">⌘</span> Apple
            </button>
          </div>

          <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Ou introduza email e palavra-passe
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </p>
            )}
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Email
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@exemplo.com"
                leftAddon={<EnvelopeIcon className="h-5 w-5" />}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Palavra-passe
              </span>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                leftAddon={<LockClosedIcon className="h-5 w-5" />}
              />
            </label>
            <div className="flex items-center justify-between gap-4 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
                rightIcon={<ArrowRightIcon className="h-4 w-4" />}
              >
                {loading ? 'A entrar…' : 'Entrar'}
              </Button>
              <Link
                href="/agente/esqueci-password"
                className="text-sm font-medium text-primary-blue-600 hover:underline dark:text-primary-blue-400"
              >
                Esqueci a palavra-passe
              </Link>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="text-primary-blue-600 hover:underline dark:text-primary-blue-400">
              ← Voltar ao início
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
