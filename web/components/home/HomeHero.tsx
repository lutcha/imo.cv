'use client';

import Link from 'next/link';
import { SearchBar } from '@/components/common/SearchBar';

export function HomeHero() {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:py-28"
      style={{ background: 'linear-gradient(135deg, #005baa 0%, #008542 100%)' }}
    >
      {/* Subtle dot-grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ec7f13]" />
          Plataforma Líder em Cabo Verde
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          A plataforma imobiliária
          <br />
          <span className="text-white/90">oficial de Cabo Verde</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
          Profissionalizando o mercado imobiliário com transparência, tecnologia e
          dados — para agências, condomínios e investidores.
        </p>

        {/* Product CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/solucoes/crm"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#005baa] shadow-md transition-all hover:brightness-105 hover:shadow-lg"
          >
            Para Agências
          </Link>
          <Link
            href="/solucoes/condominios"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            Condomínios
          </Link>
          <Link
            href="/solucoes/market-intelligence"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            Investidores
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-10 flex max-w-sm items-center gap-4">
          <div className="flex-1 border-t border-white/20" />
          <span className="text-xs font-medium text-white/50">ou pesquisa imóveis</span>
          <div className="flex-1 border-t border-white/20" />
        </div>

        {/* SearchBar for marketplace buyers */}
        <div className="mx-auto mt-6 max-w-3xl">
          <SearchBar variant="hero" />
        </div>

        {/* Quick links */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
          <Link href="/search" className="transition-colors hover:text-white">
            Ver todos os imóveis
          </Link>
          <Link href="/search?view=map" className="transition-colors hover:text-white">
            Pesquisar no mapa
          </Link>
          <Link href="/ferias" className="transition-colors hover:text-white">
            Alojamento local
          </Link>
          <Link href="/obras-novas" className="transition-colors hover:text-white">
            Novas construções
          </Link>
        </div>
      </div>
    </section>
  );
}
