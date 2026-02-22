'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="pt">
      <body style={{ minHeight: '100vh', margin: 0, fontFamily: 'system-ui' }}>
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ maxWidth: 400, padding: 24, border: '1px solid #fecaca', borderRadius: 12, background: '#fef2f2', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#b91c1c' }}>Erro crítico</h1>
            <p style={{ marginTop: 8, fontSize: 14, color: '#991b1b' }}>Recarregue a página.</p>
            <button type="button" onClick={reset} style={{ marginTop: 24, padding: '8px 16px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 500 }}>Recarregar</button>
          </div>
        </div>
      </body>
    </html>
  );
}
