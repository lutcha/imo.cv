'use client';

import Link from 'next/link';

const solucoesLinks = [
  { href: '/solucoes/crm', label: 'CRM para Agências' },
  { href: '/solucoes/condominios', label: 'Gestão de Condomínios' },
  { href: '/solucoes/market-intelligence', label: 'Market Intelligence' },
];

const empresaLinks = [
  { href: '/about', label: 'Sobre nós' },
  { href: '/contact', label: 'Contacto' },
  { href: '/blog', label: 'Blog' },
  { href: '/about#termos', label: 'Termos de Uso' },
  { href: '/about#privacidade', label: 'Privacidade' },
];

const marketplaceLinks = [
  { href: '/search?listing_type=sale', label: 'Comprar' },
  { href: '/search?listing_type=rent', label: 'Arrendar' },
  { href: '/ferias', label: 'Alojamento Local' },
  { href: '/obras-novas', label: 'Novas Construções' },
  { href: '/simuladores', label: 'Simuladores' },
  { href: '/agente/login', label: 'Área Agente' },
];

function FooterLinkGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-gray-500 transition-colors hover:text-[#005baa] dark:text-gray-400 dark:hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* 4-column grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-black" style={{ color: '#005baa' }}>
              imo.cv
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              A maior infraestrutura tecnológica para o mercado imobiliário em Cabo Verde.
            </p>
            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {['Praia', 'Mindelo', 'Sal', 'Boa Vista'].map((island) => (
                <span
                  key={island}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                >
                  {island}
                </span>
              ))}
            </div>
          </div>

          <FooterLinkGroup title="Soluções" links={solucoesLinks} />
          <FooterLinkGroup title="Empresa" links={empresaLinks} />
          <FooterLinkGroup title="Marketplace" links={marketplaceLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {year} imo.cv — Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-[#ec7f13]" />
            <span className="text-xs text-gray-400">Feito em Cabo Verde</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
