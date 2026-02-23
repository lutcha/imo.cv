'use client';

import { FeeTracker } from '@/components/condominiums/FeeTracker';
import { Button } from '@/components/ui/Button';
import {
    BuildingOffice2Icon,
    UserGroupIcon,
    WrenchScrewdriverIcon,
    BellIcon
} from '@heroicons/react/24/outline';

export default function CondominiosPage() {
    return (
        <div className="mx-auto max-w-7xl">
            {/* Header Section */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Gestão de Condomínios
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Monitoriza propriedades, quotas e manutenção num único lugar.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <BellIcon className="mr-2 h-4 w-4" />
                        Notificações
                    </Button>
                    <Button>
                        Adicionar Condomínio
                    </Button>
                </div>
            </div>

            {/* Quick Access Grid */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                {[
                    { icon: BuildingOffice2Icon, label: 'Edifícios Ativos', value: '12', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
                    { icon: UserGroupIcon, label: 'Total Frações', value: '148', color: 'bg-green-50 text-green-600 dark:bg-green-900/20' },
                    { icon: WrenchScrewdriverIcon, label: 'Reparações Abertas', value: '7', color: 'bg-red-50 text-red-600 dark:bg-red-900/20' },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                            <stat.icon className="h-5 w-5" />
                        </div>
                        <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <FeeTracker />
                </div>

                <div className="space-y-6">
                    {/* Maintenance Summary */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Próximas Manutenções</h3>
                        <div className="space-y-3">
                            {[
                                { title: 'Elevador Bloco A', date: '22 Fev', status: 'Urgente', color: 'text-red-600 bg-red-50' },
                                { title: 'Limpeza de Cisterna', date: '25 Fev', status: 'Agendado', color: 'text-blue-600 bg-blue-50' },
                                { title: 'Pintura Fachada Norte', date: '01 Mar', status: 'Pendente', color: 'text-yellow-600 bg-yellow-50' },
                            ].map((m) => (
                                <div key={m.title} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{m.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{m.date}</p>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${m.color}`}>
                                        {m.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="mt-4 w-full text-sm">
                            Ver Todo o Calendário
                        </Button>
                    </div>

                    {/* Quick Notice Card */}
                    <div className="rounded-xl bg-imo-primary p-6 text-white">
                        <h3 className="font-bold mb-2">Aviso Rápido</h3>
                        <p className="text-sm text-teal-100 mb-4">Envia uma mensagem urgente para todos os proprietários.</p>
                        <Button className="w-full bg-white text-imo-primary font-bold hover:bg-gray-100">
                            Criar Comunicado
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
