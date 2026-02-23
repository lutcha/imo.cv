'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { submitContactAction } from '@/app/actions/contact';

export function ContactForm() {
  const [result, setResult] = useState<{ ok: true } | { ok: false; error: string } | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setResult(null);
    try {
      const res = await submitContactAction(formData);
      setResult(res);
    } finally {
      setPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 space-y-4 max-w-md">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome *
        </label>
        <Input id="contact-name" name="name" required placeholder="O teu nome" className="w-full" />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          E-mail *
        </label>
        <Input id="contact-email" name="email" type="email" required placeholder="email@exemplo.cv" className="w-full" />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Telefone / WhatsApp
        </label>
        <Input id="contact-phone" name="phone" type="tel" placeholder="+238 XXX XX XX" className="w-full" />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Como podemos ajudar?"
        />
      </div>
      {result?.ok === true && (
        <p className="text-green-600 dark:text-green-400 text-sm">Mensagem enviada. Obrigado!</p>
      )}
      {result?.ok === false && (
        <p className="text-red-600 dark:text-red-400 text-sm">{result.error}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? 'A enviar…' : 'Enviar'}
      </Button>
    </form>
  );
}
