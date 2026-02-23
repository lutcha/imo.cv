'use server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContactAction(formData: FormData): Promise<ContactResult> {
  const name = formData.get('name')?.toString()?.trim();
  const email = formData.get('email')?.toString()?.trim();
  const message = formData.get('message')?.toString()?.trim();

  if (!name || !email) {
    return { ok: false, error: 'Nome e e-mail são obrigatórios.' };
  }

  try {
    const res = await fetch(`${API_BASE}/api/leads/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: name,
        email,
        phone: formData.get('phone')?.toString()?.trim() || '',
        source: 'Contact',
        notes: message || '',
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || 'Erro ao enviar.' };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Erro de ligação.' };
  }
}
