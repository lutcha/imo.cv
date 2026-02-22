import { Suspense } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/common/SearchBar';
import { Button } from '@/components/ui/Button';
import PropertyList from '@/components/properties/PropertyList';
import { SkeletonCard } from '@/components/common/Skeleton';

// Server Component
export default async function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-blue-600 to-primary-blue-800 px-4 py-20 dark:from-primary-blue-900 dark:to-primary-blue-950">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow sm:text-5xl md:text-6xl animate-fade-in-up">
            Mercado Imobiliário de Cabo Verde
          </h1>
          <p className="mt-4 text-lg text-primary-blue-100 sm:text-xl animate-fade-in-up delay-100">
            O maior agregador nacional. Pesquisa por mapa, guarda favoritos e
            contacta agentes verificados.
          </p>
          <div className="mx-auto mt-10 max-w-3xl animate-fade-in-up delay-200">
            <SearchBar variant="hero" />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
            <Link href="/search">
              <Button
                size="lg"
                className="bg-white text-primary-blue-700 hover:bg-primary-blue-50"
              >
                Ver imóveis
              </Button>
            </Link>
            <Link href="/search?view=map">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Pesquisar no mapa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'Pesquisa inteligente', desc: 'Filtra por ilha, preço, quartos e muito mais. Vê resultados no mapa ou em lista.' },
              { title: 'Agentes verificados', desc: 'Contacta diretamente agentes e agências de confiança em todo o arquipélago.' },
              { title: '100% gratuito', desc: 'Para compradores e arrendatários. Sem custos ocultos.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/50"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Imóveis em destaque</h2>
            <Link href="/search" className="text-imo-primary font-medium hover:underline dark:text-primary-blue-400">
              Ver todos
            </Link>
          </div>
          <div className="mt-8">
            <Suspense fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            }>
              <PropertyList filters={{ limit: 6 }} />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-primary-blue-600 py-16 dark:bg-primary-blue-900">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">És agente ou agência?</h2>
          <p className="mt-2 text-primary-blue-100">Junta-te à plataforma e divulga os teus imóveis em todo o país.</p>
          <Link href="/agente/login" className="mt-6 inline-block">
            <Button size="lg" className="bg-white text-primary-blue-700 hover:bg-primary-blue-50">
              Área Agente
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
