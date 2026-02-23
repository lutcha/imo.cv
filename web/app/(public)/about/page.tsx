import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Sobre nós | imo.cv',
  description: 'Conheça o imo.cv – o maior agregador imobiliário de Cabo Verde.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sobre nós</h1>
      <p className="mt-6 text-gray-600 dark:text-gray-400">
        O imo.cv é o maior agregador nacional de imóveis em Cabo Verde. Conectamos compradores,
        arrendatários e agentes numa única plataforma, com pesquisa por ilha, preço e tipo de imóvel.
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Esta página será expandida com a história, missão e equipa. Em breve mais conteúdo.
      </p>
      <div className="mt-10">
        <Link href="/">
          <Button variant="outline">Voltar ao início</Button>
        </Link>
      </div>
    </div>
  );
}
