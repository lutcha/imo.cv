'use client';

const testimonials = [
  {
    initials: 'CS',
    name: 'Carlos Silva',
    role: 'Diretor, CV Imóveis',
    island: 'Sal',
    islandColor: '#005baa',
    quote:
      'O CRM da imo.cv mudou a forma como gerimos os nossos investidores europeus. Aumentámos as conversões em 40% nos primeiros 3 meses.',
  },
  {
    initials: 'MV',
    name: 'Maria Varela',
    role: 'Administradora de Condomínio',
    island: 'Santiago',
    islandColor: '#008542',
    quote:
      'A gestão de condomínios era um caos até usarmos a imo.cv. Agora os moradores pagam online e as assembleias são mais transparentes.',
  },
  {
    initials: 'AL',
    name: 'António Lopes',
    role: 'CEO, Cabo Verde Developers Group',
    island: 'Boa Vista',
    islandColor: '#ec7f13',
    quote:
      'Os dados de Market Intelligence são vitais para as nossas decisões de investimento. Não imagino trabalhar sem eles.',
  },
];

export function HomeTrust() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            Confiança em todas as ilhas
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Profissionais de Cabo Verde que transformaram os seus negócios com a imo.cv
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Quote mark */}
              <div className="text-4xl font-black leading-none text-gray-200 dark:text-gray-700">
                &ldquo;
              </div>

              <p className="mt-2 flex-1 text-sm italic leading-relaxed text-gray-700 dark:text-gray-300">
                {t.quote}
              </p>

              <div className="mt-5 flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: t.islandColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
                <span
                  className="ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: t.islandColor }}
                >
                  {t.island}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-3 gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:gap-8">
          {[
            { value: '+500', label: 'Agências activas' },
            { value: '+200', label: 'Condomínios geridos' },
            { value: '+12.000', label: 'Imóveis listados' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl"
                style={{ color: '#005baa' }}>
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
