'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils/formatters';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { leadsApi } from '@/lib/api/leads';
import { InformationCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';

const CURRENCY = 'CVE';
const MIN_PRICE = 1_000_000;
const MAX_PRICE = 80_000_000;
const PRICE_STEP = 500_000;
const MIN_DOWN_PERCENT = 10;
const PURCHASE_COSTS_PERCENT = 4; // Impostos e despesas da compra (estimativa)
const TERM_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40] as const;
const DEFAULT_INTEREST_RATE = 8.5;
const RATE_STEP = 0.1;
const RATE_MIN = 0;
const RATE_MAX = 25;

const LOCATIONS = [
  'Santiago',
  'Sal',
  'São Vicente',
  'Boa Vista',
  'Santo Antão',
  'Fogo',
  'Maio',
  'Outra ilha',
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export default function CreditSimulator() {
  const { t } = useLocale();

  const [propertyPrice, setPropertyPrice] = useState<number>(15_000_000);
  const [downPayment, setDownPayment] = useState<number>(3_000_000);
  const [term, setTerm] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(DEFAULT_INTEREST_RATE);
  const [interestType, setInterestType] = useState<'fixed' | 'variable'>('fixed');
  const [location, setLocation] = useState<string>(LOCATIONS[0]);
  const [houseType, setHouseType] = useState<'primary' | 'secondary'>('primary');
  const [under35, setUnder35] = useState<boolean>(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const safePrice = useMemo(() => clamp(propertyPrice, MIN_PRICE, MAX_PRICE), [propertyPrice]);
  const safeDown = useMemo(() => {
    const maxDown = safePrice * 0.95;
    return clamp(downPayment, 0, maxDown);
  }, [downPayment, safePrice]);
  const safeTerm = useMemo(() => clamp(term, 5, 40), [term]);
  const safeRate = useMemo(() => clamp(interestRate, RATE_MIN, RATE_MAX), [interestRate]);

  const setPropertyPriceSafe = useCallback((v: number) => {
    const p = clamp(v, MIN_PRICE, MAX_PRICE);
    setPropertyPrice(p);
    setDownPayment((prev) => Math.min(prev, p * 0.95));
  }, []);
  const setDownPaymentSafe = useCallback((v: number) => {
    setDownPayment(clamp(v, 0, safePrice * 0.95));
  }, [safePrice]);

  const stats = useMemo(() => {
    const loanAmount = Math.max(0, safePrice - safeDown);
    const monthlyRate = safeRate / 100 / 12;
    const numberOfPayments = safeTerm * 12;

    let monthlyPayment = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else if (loanAmount > 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    }
    monthlyPayment = Math.round(monthlyPayment * 100) / 100;

    const totalPaid = monthlyPayment * numberOfPayments;
    const totalInterest = Math.max(0, totalPaid - loanAmount);
    const downPaymentPercent = safePrice > 0 ? (safeDown / safePrice) * 100 : 0;
    const financePercent = safePrice > 0 ? (loanAmount / safePrice) * 100 : 0;
    const purchaseCosts = Math.round((safePrice * PURCHASE_COSTS_PERCENT) / 100);
    const totalCost = safePrice + purchaseCosts;

    return {
      loanAmount,
      monthlyPayment,
      totalPaid,
      totalInterest,
      downPaymentPercent,
      financePercent,
      purchaseCosts,
      totalCost,
    };
  }, [safePrice, safeDown, safeTerm, safeRate]);

  const amortizationRows = useMemo(() => {
    const rows: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
    let balance = stats.loanAmount;
    const monthlyRate = safeRate / 100 / 12;
    let payment = stats.monthlyPayment;
    for (let month = 1; month <= Math.min(safeTerm * 12, 120); month++) {
      const interest = balance * monthlyRate;
      const principal = payment - interest;
      balance = Math.max(0, balance - principal);
      rows.push({
        month,
        payment,
        principal,
        interest,
        balance,
      });
    }
    return rows;
  }, [stats.loanAmount, stats.monthlyPayment, safeRate, safeTerm]);

  return (
    <div className="glass shadow-premium overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-1 backdrop-blur-xl transition-all duration-300 dark:border-gray-700/30 dark:bg-gray-900/40">
      <div className="p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-trust-blue-500 to-hope-green-500 bg-clip-text text-transparent">
              {t('finance.simulatorTitle') || 'Simulador de Crédito Habitação'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('finance.simulatorSubtitle') || 'Calcula a tua prestação mensal em Cabo Verde'}
            </p>
          </div>
          <div className="hidden md:block rounded-full bg-trust-blue-50 px-4 py-1 text-xs font-semibold text-trust-blue-600 dark:bg-trust-blue-900/30">
            {safeTerm} {t('common.years') || 'Anos'}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Coluna esquerda – parâmetros */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('finance.propertyPrice') || 'Preço do imóvel'}
              </label>
              <Input
                type="number"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={safePrice}
                onChange={(e) => setPropertyPriceSafe(Number(e.target.value) || MIN_PRICE)}
                className="h-12 text-lg font-semibold"
              />
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={safePrice}
                onChange={(e) => setPropertyPriceSafe(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-trust-blue-600 dark:bg-gray-700"
                aria-label="Preço do imóvel"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('finance.downPayment') || 'Poupanças (entrada)'}
              </label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min={0}
                  max={safePrice}
                  step={PRICE_STEP / 10}
                  value={safeDown}
                  onChange={(e) => setDownPaymentSafe(Number(e.target.value) || 0)}
                  className="h-12 flex-1 text-lg font-semibold"
                />
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                  {stats.downPaymentPercent.toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.min(safePrice, safePrice * 0.95)}
                step={100000}
                value={safeDown}
                onChange={(e) => setDownPaymentSafe(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-hope-green-500 dark:bg-gray-700"
                aria-label="Poupanças ou valor de entrada"
              />
              <p className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                <InformationCircleIcon className="h-4 w-4 shrink-0 mt-0.5" />
                Lembra-te que os bancos normalmente pedem uma entrada mínima de 10% mais despesas de aquisição.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('finance.term') || 'Prazo (anos)'}
              </label>
              <div className="flex gap-2 flex-wrap">
                {TERM_OPTIONS.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setTerm(y)}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-sm font-semibold transition',
                      safeTerm === y
                        ? 'border-trust-blue-600 bg-trust-blue-600 text-white dark:border-trust-blue-500 dark:bg-trust-blue-500'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    )}
                  >
                    {y}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={safeTerm}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-trust-blue-600 dark:bg-gray-700"
                aria-label="Prazo do crédito em anos"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('finance.interestRate') || 'Tipo de taxa'}
                <InformationCircleIcon className="h-4 w-4 text-gray-400" aria-hidden />
              </label>
              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="interestType"
                    checked={interestType === 'fixed'}
                    onChange={() => setInterestType('fixed')}
                    className="accent-trust-blue-600"
                  />
                  <span className="text-sm font-medium">Fixa</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="interestType"
                    checked={interestType === 'variable'}
                    onChange={() => setInterestType('variable')}
                    className="accent-trust-blue-600"
                  />
                  <span className="text-sm font-medium">Variável</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setInterestRate((r) => clamp(r - RATE_STEP, RATE_MIN, RATE_MAX))}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-xl font-bold text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  aria-label="Diminuir taxa"
                >
                  −
                </button>
                <Input
                  type="number"
                  step={RATE_STEP}
                  min={RATE_MIN}
                  max={RATE_MAX}
                  value={safeRate}
                  onChange={(e) => setInterestRate(clamp(Number(e.target.value) || 0, RATE_MIN, RATE_MAX))}
                  className="h-12 flex-1 text-center text-lg font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setInterestRate((r) => clamp(r + RATE_STEP, RATE_MIN, RATE_MAX))}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-xl font-bold text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  aria-label="Aumentar taxa"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Localização do imóvel
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-base font-medium outline-none focus:ring-2 focus:ring-trust-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                aria-label="Localização do imóvel"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tipo de casa
              </label>
              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="houseType"
                    checked={houseType === 'primary'}
                    onChange={() => setHouseType('primary')}
                    className="accent-trust-blue-600"
                  />
                  <span className="text-sm font-medium">Principal</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="houseType"
                    checked={houseType === 'secondary'}
                    onChange={() => setHouseType('secondary')}
                    className="accent-trust-blue-600"
                  />
                  <span className="text-sm font-medium">Secundária</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Tens 35 anos ou menos?
                <InformationCircleIcon className="h-4 w-4 text-gray-400" aria-hidden />
              </label>
              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="under35"
                    checked={under35 === true}
                    onChange={() => setUnder35(true)}
                    className="accent-trust-blue-600"
                  />
                  <span className="text-sm font-medium">Sim</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="under35"
                    checked={under35 === false}
                    onChange={() => setUnder35(false)}
                    className="accent-trust-blue-600"
                  />
                  <span className="text-sm font-medium">Não</span>
                </label>
              </div>
            </div>
          </div>

          {/* Coluna direita – resultados */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              A tua prestação mensal
            </p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-trust-blue-600 dark:text-trust-blue-400">
              {formatPrice(stats.monthlyPayment, CURRENCY)}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 dark:text-gray-400">Valor crédito habitação</span>
                <InformationCircleIcon className="h-4 w-4 text-gray-400" aria-hidden />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                {formatPrice(stats.loanAmount, CURRENCY)}
              </span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500 dark:text-gray-400">Financiamento</span>
              <span className="font-bold">{stats.financePercent.toFixed(0)}%</span>
            </div>

            {/* Barra: custo total imóvel = preço + despesas */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Custo total do imóvel
              </p>
              <div className="flex h-8 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                <div
                  className="bg-dream-gold-400 dark:bg-dream-gold-500"
                  style={{ width: `${(safePrice / stats.totalCost) * 100}%` }}
                  title={`Preço: ${formatPrice(safePrice, CURRENCY)}`}
                />
                <div
                  className="bg-amber-600 dark:bg-amber-700"
                  style={{ width: `${(stats.purchaseCosts / stats.totalCost) * 100}%` }}
                  title={`Impostos e despesas: ${formatPrice(stats.purchaseCosts, CURRENCY)}`}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Preço {formatPrice(safePrice, CURRENCY)}</span>
                <span>Impostos/despesas {formatPrice(stats.purchaseCosts, CURRENCY)}</span>
                <span className="font-semibold">Total {formatPrice(stats.totalCost, CURRENCY)}</span>
              </div>
            </div>

            {/* Barra: poupança + crédito + juros */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Como financiares
              </p>
              {(() => {
                const totalFin = safeDown + stats.loanAmount + stats.totalInterest;
                if (totalFin <= 0) return null;
                return (
                  <div className="flex h-8 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                    <div
                      className="bg-trust-blue-300 dark:bg-trust-blue-600"
                      style={{ width: `${(safeDown / totalFin) * 100}%` }}
                    />
                    <div
                      className="bg-trust-blue-600 dark:bg-trust-blue-700"
                      style={{ width: `${(stats.loanAmount / totalFin) * 100}%` }}
                    />
                    <div
                      className="bg-hope-green-600 dark:bg-hope-green-700"
                      style={{ width: `${(stats.totalInterest / totalFin) * 100}%` }}
                    />
                  </div>
                );
              })()}
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex justify-between">
                  <span>Poupanças</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(safeDown, CURRENCY)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Valor crédito habitação</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(stats.loanAmount, CURRENCY)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Juros crédito habitação</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(stats.totalInterest, CURRENCY)}</span>
                </li>
                <li className="flex justify-between border-t border-gray-200 pt-2 dark:border-gray-600">
                  <span className="font-medium">Valor total com crédito</span>
                  <span className="font-bold text-hope-green-600 dark:text-hope-green-400">
                    {formatPrice(stats.loanAmount + stats.totalInterest, CURRENCY)}
                  </span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setShowAmortization((v) => !v)}
              className="mt-4 flex items-center gap-1 text-sm font-semibold text-trust-blue-600 hover:underline dark:text-trust-blue-400"
            >
              {showAmortization ? (
                <>Ocultar tabela de amortização <ChevronUpIcon className="h-4 w-4" /></>
              ) : (
                <>Ver tabela de amortização <ChevronDownIcon className="h-4 w-4" /></>
              )}
            </button>

            {showAmortization && (
              <div className="mt-4 max-h-64 overflow-auto rounded-lg border border-gray-200 dark:border-gray-600">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Mês</th>
                      <th className="px-3 py-2 font-semibold">Prestação</th>
                      <th className="px-3 py-2 font-semibold">Capital</th>
                      <th className="px-3 py-2 font-semibold">Juro</th>
                      <th className="px-3 py-2 font-semibold">Restante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationRows.slice(0, 24).map((row) => (
                      <tr key={row.month} className="border-t border-gray-100 dark:border-gray-700">
                        <td className="px-3 py-1.5">{row.month}</td>
                        <td className="px-3 py-1.5">{formatPrice(row.payment, CURRENCY)}</td>
                        <td className="px-3 py-1.5">{formatPrice(row.principal, CURRENCY)}</td>
                        <td className="px-3 py-1.5">{formatPrice(row.interest, CURRENCY)}</td>
                        <td className="px-3 py-1.5">{formatPrice(row.balance, CURRENCY)}</td>
                      </tr>
                    ))}
                    {amortizationRows.length > 24 && (
                      <tr className="border-t border-gray-200 bg-gray-50 dark:bg-gray-800">
                        <td colSpan={5} className="px-3 py-2 text-center italic text-gray-500">
                          … e mais {amortizationRows.length - 24} meses. Total: {formatPrice(stats.totalPaid, CURRENCY)} (capital + juros)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <Button
              className="mt-8 w-full rounded-xl bg-trust-blue-600 h-14 text-lg font-bold text-white hover:bg-trust-blue-700 dark:bg-trust-blue-500 dark:hover:bg-trust-blue-600"
              onClick={() => setShowLeadForm(true)}
            >
              {t('finance.requestApproval') || 'Solicitar Pré-Aprovação'}
            </Button>

            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              {t('finance.disclaimer') || '* Esta simulação não tem valor contratual. Sujeito a aprovação bancária.'}
            </p>
          </div>
        </div>

        {/* Lead form – inalterado */}
        {showLeadForm && (
          <div className="mt-12 rounded-2xl border border-dashed border-trust-blue-400 p-8 text-center animate-slide-up">
            <h4 className="text-xl font-bold dark:text-white">Desejas falar com um especialista de crédito?</h4>
            <p className="mt-2 text-gray-500">Enviaremos os dados da simulação para as agências parceiras (BCA, BCN, Ecobank).</p>
            {submitStatus === 'success' && (
              <p className="mt-4 text-green-600 dark:text-green-400 font-medium">Pedido enviado. Entraremos em contacto em breve.</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-red-600 dark:text-red-400 text-sm">Erro ao enviar. Tenta novamente.</p>
            )}
            {submitStatus !== 'success' && (
              <>
                <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
                  <Input
                    placeholder="O teu nome"
                    className="md:w-64 h-12"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    disabled={submitStatus === 'loading'}
                  />
                  <Input
                    placeholder="O teu WhatsApp (+238)"
                    className="md:w-64 h-12"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    disabled={submitStatus === 'loading'}
                  />
                  <Button
                    className="bg-trust-blue-600 h-12 px-8"
                    disabled={!leadName.trim() || !leadPhone.trim() || submitStatus === 'loading'}
                    onClick={async () => {
                      setSubmitStatus('loading');
                      try {
                        const notes = `Simulador: ${formatPrice(stats.monthlyPayment, CURRENCY)}/mês, ${safeTerm} anos, entrada ${formatPrice(safeDown, CURRENCY)}, taxa ${safeRate}%, ${location}, ${houseType === 'primary' ? 'principal' : 'secundária'}.`;
                        await leadsApi.create({
                          full_name: leadName.trim(),
                          email: `simulador+${leadPhone.replace(/\D/g, '')}@imo.cv`,
                          phone: leadPhone.trim(),
                          source: 'CreditSimulator',
                          notes,
                        });
                        setSubmitStatus('success');
                      } catch {
                        setSubmitStatus('error');
                      }
                    }}
                  >
                    {submitStatus === 'loading' ? 'A enviar…' : 'Enviar Agora'}
                  </Button>
                </div>
                <button
                  type="button"
                  className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
                  onClick={() => { setShowLeadForm(false); setSubmitStatus('idle'); }}
                >
                  Cancelar e voltar à simulação
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
