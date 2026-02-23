'use client';

/**
 * Stitch-style "Explore the Islands" section with card grid.
 * Used on Férias and Novas Construções pages. Base path for links (e.g. /ferias or /obras-novas).
 */
export interface IslandExploreSectionProps {
  basePath: '/ferias' | '/obras-novas';
  title: string;
  subtitle: string;
  islandCounts?: { name: string; count?: number }[];
  className?: string;
}

const DEFAULT_ISLANDS = [
  { name: 'Sal' },
  { name: 'Santiago' },
  { name: 'Boa Vista' },
  { name: 'São Vicente' },
];

export function IslandExploreSection({
  basePath,
  title,
  subtitle,
  islandCounts = DEFAULT_ISLANDS,
  className = '',
}: IslandExploreSectionProps) {
  return (
    <section
      className={`bg-white py-12 dark:bg-gray-900 ${className}`}
      aria-label={title}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {islandCounts.map(({ name, count }) => {
            const href = `${basePath}?island=${encodeURIComponent(name)}`;
            return (
              <a
                key={name}
                href={href}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent transition group-hover:from-gray-900/90" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white">{name}</h3>
                  {count != null && (
                    <p className="text-sm text-white/80">{count} imóveis</p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
