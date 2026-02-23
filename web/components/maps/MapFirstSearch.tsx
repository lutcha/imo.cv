'use client';

import { useState } from 'react';
import { MapboxMap } from './MapboxMap';
import { SearchBar } from '@/components/common/SearchBar';
import type { PropertyListItem } from '@/types/property';
import { Button } from '@/components/ui/Button';
import { ChevronUpIcon, ChevronDownIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils/helpers';

interface MapFirstSearchProps {
    properties: PropertyListItem[];
    initialIsland?: string;
}

export function MapFirstSearch({ properties, initialIsland = 'Santiago' }: MapFirstSearchProps) {
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [viewMode, setViewMode] = useState<'map' | 'split'>('map');

    return (
        <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* The 70-100% Map Background */}
            <div className={cn(
                "absolute inset-0 transition-all duration-500 ease-in-out",
                viewMode === 'split' ? "h-1/2 md:h-full md:w-2/3" : "h-full w-full"
            )}>
                <MapboxMap
                    properties={properties}
                    className="h-full w-full"
                    height="100%"
                />

                {/* Draw Polygon Button (Zimmo Style Placeholder) */}
                <div className="absolute top-4 left-4 z-10">
                    <Button variant="outline" className="glass h-10 rounded-full border-none px-4 text-xs font-bold shadow-premium hover:bg-white/40">
                        <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
                        Desenhar Zona
                    </Button>
                </div>
            </div>

            {/* Floating Floating Search Bar (Minimized by default on mobile) */}
            <div className="absolute top-4 left-1/2 z-20 w-[90%] -translate-x-1/2 md:w-auto md:min-w-[500px]">
                <div className={cn(
                    "glass shadow-premium overflow-hidden rounded-2xl transition-all duration-300",
                    !isFilterExpanded && "h-14"
                )}>
                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex-1 truncate text-sm font-medium text-gray-600 dark:text-gray-300">
                            {initialIsland} • Todos os imóveis • {properties.length} resultados
                        </div>
                        <button
                            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            {isFilterExpanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    <div className={cn(
                        "px-4 pb-4 transition-opacity duration-300",
                        isFilterExpanded ? "opacity-100" : "pointer-events-none opacity-0"
                    )}>
                        <SearchBar variant="inline" />
                    </div>
                </div>
            </div>

            {/* Results Drawer (Idealista Style) */}
            <div className={cn(
                "absolute bottom-0 right-0 z-10 transition-all duration-500 ease-in-out",
                viewMode === 'split'
                    ? "h-1/2 w-full bg-white md:h-full md:w-1/3 dark:bg-gray-900"
                    : "h-20 w-full translate-y-full md:h-full md:w-0"
            )}>
                <div className="h-full overflow-y-auto border-l border-gray-200 p-4 dark:border-gray-800">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-lg font-bold">Imóveis encontrados</h4>
                        <Button variant="ghost" size="sm" onClick={() => setViewMode('map')}>Fechar</Button>
                    </div>
                    <div className="grid gap-4">
                        {/* List of property cards would go here */}
                        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                            <p className="text-sm text-gray-500">Mover o mapa para atualizar resultados...</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Toggle Button */}
            {viewMode === 'map' && (
                <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
                    <Button
                        onClick={() => setViewMode('split')}
                        className="shadow-premium h-12 rounded-full bg-trust-blue-600 px-8 text-sm font-bold text-white transition-transform hover:scale-105"
                    >
                        Ver em Lista ({properties.length})
                    </Button>
                </div>
            )}
        </div>
    );
}
