import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contacto | imo.cv',
  description: 'Contacte a equipa imo.cv.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contacto</h1>
      <p className="mt-6 text-gray-600 dark:text-gray-400">
        Para questões gerais, parcerias ou suporte técnico, use o formulário ou os canais abaixo.
      </p>
      <ContactForm />
      <ul className="mt-10 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
        <li>E-mail: contacto@imo.cv</li>
      </ul>
      <div className="mt-10">
        <Link href="/">
          <Button variant="outline">Voltar ao início</Button>
        </Link>
      </div>
    </div>
  );
}
