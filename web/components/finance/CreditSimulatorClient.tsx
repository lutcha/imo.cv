'use client';

import dynamic from 'next/dynamic';

const CreditSimulator = dynamic(
  () => import('@/components/finance/CreditSimulator'),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#005baa] border-t-transparent" />
      </div>
    ),
  }
);

export default function CreditSimulatorClient() {
  return <CreditSimulator />;
}
