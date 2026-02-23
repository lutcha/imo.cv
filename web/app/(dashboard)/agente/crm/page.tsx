'use client';

import { KanbanPipeline } from '@/components/crm/KanbanPipeline';
import { Button } from '@/components/ui/Button';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function CRMPage() {
    return (
        <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        CRM Imobiliário
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Pipeline de vendas e gestão de clientes
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <FunnelIcon className="mr-2 h-4 w-4" />
                        Filtrar
                    </Button>
                    <Button size="sm">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Novo Lead
                    </Button>
                </div>
            </div>

            <KanbanPipeline />
        </div>
    );
}
