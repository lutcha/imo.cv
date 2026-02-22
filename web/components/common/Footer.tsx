'use client';

import Link from 'next/link';

const links = [
  { href: '/search', label: 'Pesquisar imóveis' },
  { href: '/about', label: 'Sobre nós' },
  { href: '/contact', label: 'Contacto' },
  { href: '/blog', label: 'Blog' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="text-xl font-bold text-imo-dark dark:text-primary-blue-300"
            >
              imo.cv
            </Link>
            <p className="mt-2 max-w-sm text-sm text-gray-600 dark:text-gray-400">
              O maior agregador nacional. Pesquisa, compara e encontra o teu
              imóvel em Cabo Verde.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-gray-600 hover:text-imo-primary dark:text-gray-400 dark:hover:text-primary-blue-400"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            © {year} imo.cv – Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
