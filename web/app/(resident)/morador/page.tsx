'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';
import {
  BuildingOffice2Icon,
  ArrowLeftIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

async function fetchPublicCondominiums(): Promise<{ id: string; name: string; municipality: string }[]> {
  const res = await fetch('/api/backend/condominiums/public/');
  if (!res.ok) return [];
  return res.json();
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Channel = 'whatsapp' | 'email';

// ---------------------------------------------------------------------------
// API Functions
// ---------------------------------------------------------------------------

async function requestOTP(
  identifier: string,
  channel: Channel,
  condominiumId: string
): Promise<{ success: boolean; message: string; expires_in_minutes?: number; channel?: string }> {
  const body = channel === 'email'
    ? { email: identifier, condominium_id: condominiumId }
    : { phone: identifier, condominium_id: condominiumId };

  const response = await fetch('/api/backend/condominiums/resident/request-otp/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error('Erro ao solicitar código');
  return response.json();
}

async function verifyOTP(
  identifier: string,
  channel: Channel,
  condominiumId: string,
  otp: string
): Promise<{
  success: boolean;
  access: string;
  refresh: string;
  unit_id: string;
  condominium_id: string;
  role: string;
  resident_name: string;
  unit_identifier: string;
}> {
  const body = channel === 'email'
    ? { email: identifier, condominium_id: condominiumId, otp }
    : { phone: identifier, condominium_id: condominiumId, otp };

  const response = await fetch('/api/backend/condominiums/resident/verify-otp/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Código inválido');
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// Channel toggle
// ---------------------------------------------------------------------------

function ChannelToggle({ channel, onChange }: { channel: Channel; onChange: (c: Channel) => void }) {
  return (
    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 gap-1">
      <button
        type="button"
        onClick={() => onChange('whatsapp')}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          channel === 'whatsapp'
            ? 'bg-white dark:bg-gray-800 text-trust-blue-700 dark:text-trust-blue-400 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        )}
      >
        <DevicePhoneMobileIcon className="h-4 w-4" />
        WhatsApp
      </button>
      <button
        type="button"
        onClick={() => onChange('email')}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          channel === 'email'
            ? 'bg-white dark:bg-gray-800 text-trust-blue-700 dark:text-trust-blue-400 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        )}
      >
        <EnvelopeIcon className="h-4 w-4" />
        Email
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ResidentLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'contact' | 'otp'>('contact');
  const [channel, setChannel] = useState<Channel>('whatsapp');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [condominiumId, setCondominiumId] = useState('');
  const [error, setError] = useState('');
  const [expiresIn, setExpiresIn] = useState<number>(10);
  const [sentMessage, setSentMessage] = useState('');

  const { data: condominiums = [] } = useQuery({
    queryKey: ['public-condominiums'],
    queryFn: fetchPublicCondominiums,
    staleTime: 5 * 60 * 1000,
  });

  const requestMutation = useMutation({
    mutationFn: () => requestOTP(identifier, channel, condominiumId),
    onSuccess: (data) => {
      setExpiresIn(data.expires_in_minutes || 10);
      setSentMessage(data.message || '');
      setStep('otp');
      setError('');
    },
    onError: () => {
      setError('Erro ao enviar código. Verifique o contacto e tente novamente.');
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (otpCode: string) => verifyOTP(identifier, channel, condominiumId, otpCode),
    onSuccess: (data) => {
      localStorage.setItem('resident_access_token', data.access);
      localStorage.setItem('resident_refresh_token', data.refresh);
      localStorage.setItem('resident_data', JSON.stringify({
        unit_id: data.unit_id,
        condominium_id: data.condominium_id,
        role: data.role,
        resident_name: data.resident_name,
        unit_identifier: data.unit_identifier,
      }));
      router.push('/morador/dashboard');
    },
    onError: (err: Error) => {
      setError(err.message);
      setOtp(['', '', '', '', '', '']);
    },
  });

  const handleChannelChange = (c: Channel) => {
    setChannel(c);
    setIdentifier('');
    setError('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!condominiumId) { setError('Selecione o condomínio'); return; }
    if (!identifier) { setError(channel === 'email' ? 'Email obrigatório' : 'Telefone obrigatório'); return; }
    if (channel === 'whatsapp' && identifier.length < 7) { setError('Telefone inválido'); return; }
    requestMutation.mutate();
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) { setError('Código deve ter 6 dígitos'); return; }
    verifyMutation.mutate(otpCode);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => { newOtp[i] = d; });
      setOtp(newOtp);
      document.getElementById(`otp-${Math.min(digits.length - 1, 5)}`)?.focus();
      return;
    }
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-trust-blue-50 to-hope-green-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-trust-blue-600 text-white mb-4 shadow-lg">
            <BuildingOffice2Icon className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portal do Morador</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Aceda às suas quotas, reservas e avisos
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {step === 'contact' ? (
            <form onSubmit={handleContactSubmit} className="space-y-5">
              {/* Condominium */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Condomínio
                </label>
                <select
                  value={condominiumId}
                  onChange={(e) => setCondominiumId(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-trust-blue-500 focus:ring-trust-blue-500"
                  required
                >
                  <option value="">Selecione...</option>
                  {condominiums.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}{c.municipality ? ` — ${c.municipality}` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Channel toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Método de acesso
                </label>
                <ChannelToggle channel={channel} onChange={handleChannelChange} />
              </div>

              {/* Identifier input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {channel === 'email' ? 'Email' : 'Telefone / WhatsApp'}
                </label>
                {channel === 'whatsapp' ? (
                  <input
                    type="tel"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="+238 9XX XXXX"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-trust-blue-500 focus:ring-trust-blue-500"
                    required
                  />
                ) : (
                  <input
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="morador@exemplo.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-trust-blue-500 focus:ring-trust-blue-500"
                    required
                  />
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {channel === 'email'
                    ? 'Use o email associado à sua unidade'
                    : 'Use o número associado à sua unidade'}
                </p>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={requestMutation.isPending}
                className="w-full bg-trust-blue-600 text-white hover:bg-trust-blue-700 py-3"
              >
                {requestMutation.isPending ? 'A enviar...' : 'Enviar Código'}
              </Button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                {channel === 'email'
                  ? 'Receberá um código de 6 dígitos por email'
                  : 'Receberá um código de 6 dígitos via WhatsApp'}
              </p>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <button
                type="button"
                onClick={() => { setStep('contact'); setError(''); }}
                className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Voltar
              </button>

              {sentMessage && (
                <div className="rounded-lg bg-trust-blue-50 dark:bg-trust-blue-900/20 p-3 text-sm text-trust-blue-700 dark:text-trust-blue-300">
                  {sentMessage}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Código de Acesso
                </label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={cn(
                        'w-12 h-14 text-center text-2xl font-bold rounded-lg border focus:ring-2',
                        digit
                          ? 'border-trust-blue-500 bg-trust-blue-50 dark:bg-trust-blue-900/20 focus:ring-trust-blue-500'
                          : 'border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-trust-blue-500',
                        'dark:text-white'
                      )}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                  Válido por {expiresIn} minutos
                </p>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={verifyMutation.isPending || otp.some(d => !d)}
                className="w-full bg-trust-blue-600 text-white hover:bg-trust-blue-700 py-3"
              >
                {verifyMutation.isPending ? 'A validar...' : 'Entrar'}
              </Button>

              <button
                type="button"
                onClick={() => { setStep('contact'); setError(''); }}
                className="w-full text-sm text-trust-blue-600 hover:text-trust-blue-700 dark:text-trust-blue-400"
              >
                Reenviar código
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Precisa de ajuda? Contacte a administração do seu condomínio
          </p>
        </div>
      </div>
    </div>
  );
}
