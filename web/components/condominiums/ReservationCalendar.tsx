'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { condominiumsApi } from '@/lib/api/condominiums';
import type { CommonArea, Reservation, Unit } from '@/types/condominium';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';
import { PlusIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ReservationCalendarProps {
    condominiumId: string;
}

interface TimeSlot {
    hour: number;
    start: string;
    end: string;
    label: string;
}

interface ReservationSlot {
    id: string;
    start: string;
    end: string;
    status: string;
    resident_name: string;
    unit_identifier?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const WEEK_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const OPERATING_HOURS = Array.from({ length: 14 }, (_, i) => i + 8); // 8h-22h

function formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
}

function formatDateISO(date: Date): string {
    return date.toISOString().split('T')[0];
}

function getWeekDates(baseDate: Date): Date[] {
    const dates: Date[] = [];
    const dayOfWeek = baseDate.getDay(); // 0 = Domingo
    const diff = baseDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Ajustar para começar na Segunda
    const monday = new Date(baseDate.setDate(diff));
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        dates.push(date);
    }
    return dates;
}

function isSlotOverlapping(slotStart: string, slotEnd: string, hour: number, date: Date): boolean {
    const slotStartHour = new Date(slotStart).getHours();
    const slotEndHour = new Date(slotEnd).getHours();
    return hour >= slotStartHour && hour < slotEndHour;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReservationCalendar({ condominiumId }: ReservationCalendarProps) {
    const queryClient = useQueryClient();
    const [selectedArea, setSelectedArea] = useState<string>('');
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState<{ date: Date; hour: number } | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

    const weekDates = useMemo(() => getWeekDates(currentWeekStart), [currentWeekStart]);

    // Fetch common areas
    const { data: areasData } = useQuery({
        queryKey: ['commonAreas', condominiumId],
        queryFn: () => condominiumsApi.listCommonAreas(condominiumId),
    });
    const commonAreas = areasData?.results ?? [];

    // Auto-select first area once the query resolves
    useEffect(() => {
        if (commonAreas.length > 0 && !selectedArea) {
            setSelectedArea(commonAreas[0].id);
        }
    }, [commonAreas]);

    // Fetch reservations for selected area
    const { data: reservationsData } = useQuery({
        queryKey: ['reservations', condominiumId, selectedArea],
        queryFn: () => condominiumsApi.listReservations(condominiumId, selectedArea),
        enabled: !!selectedArea,
    });
    const reservations = reservationsData?.results ?? [];

    // Fetch availability for each day when an area is selected
    const { data: availabilityData } = useQuery({
        queryKey: ['availability', condominiumId, selectedArea, formatDateISO(currentWeekStart)],
        queryFn: () => condominiumsApi.getCommonAreaAvailability(
            condominiumId,
            selectedArea,
            formatDateISO(currentWeekStart)
        ),
        enabled: !!selectedArea,
    });

    // Group reservations by date
    const reservationsByDate = useMemo(() => {
        const grouped: Record<string, ReservationSlot[]> = {};
        reservations.forEach((res) => {
            const dateKey = res.start_datetime.split('T')[0];
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push({
                id: res.id,
                start: res.start_datetime,
                end: res.end_datetime,
                status: res.status,
                resident_name: res.resident_name,
                unit_identifier: res.unit_identifier,
            });
        });
        return grouped;
    }, [reservations]);

    const handlePrevWeek = () => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeekStart(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeekStart(newDate);
    };

    const handleSlotClick = (date: Date, hour: number) => {
        if (!selectedArea) return;
        
        // Check if slot is free
        const dateKey = formatDateISO(date);
        const dayReservations = reservationsByDate[dateKey] || [];
        const slotStart = new Date(date);
        slotStart.setHours(hour, 0, 0, 0);
        const slotEnd = new Date(date);
        slotEnd.setHours(hour + 1, 0, 0, 0);

        const isOccupied = dayReservations.some((res) =>
            isSlotOverlapping(res.start, res.end, hour, date)
        );

        if (!isOccupied) {
            setSelectedSlot({ date, hour });
            setShowCreateModal(true);
        }
    };

    const handleReservationClick = (reservation: Reservation) => {
        setSelectedReservation(reservation);
    };

    const weekStartStr = weekDates[0]?.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
    const weekEndDate = weekDates[6];
    const weekEndStr = weekEndDate?.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    {/* Area Selector */}
                    <select
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                    >
                        <option value="">Selecionar Área</option>
                        {commonAreas.map((area) => (
                            <option key={area.id} value={area.id}>
                                {area.name}
                            </option>
                        ))}
                    </select>

                    {/* Week Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevWeek}
                            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Semana anterior"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {weekStartStr} - {weekEndStr}
                        </span>
                        <button
                            onClick={handleNextWeek}
                            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Próxima semana"
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            {!selectedArea ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Selecione uma área comum para ver o calendário de reservas.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="min-w-[800px]">
                        {/* Day Headers */}
                        <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
                            <div className="p-3 text-xs font-semibold text-gray-400 uppercase tracking-tight">
                                Hora
                            </div>
                            {weekDates.map((date, i) => {
                                const isToday = formatDateISO(new Date()) === formatDateISO(date);
                                return (
                                    <div
                                        key={i}
                                        className={cn(
                                            "p-3 text-center text-sm font-semibold",
                                            isToday
                                                ? "bg-trust-blue-50 text-trust-blue-600 dark:bg-trust-blue-900/20"
                                                : "text-gray-700 dark:text-gray-300"
                                        )}
                                    >
                                        <div className="uppercase tracking-tight">{WEEK_DAYS[i]}</div>
                                        <div className="mt-1 text-base">{date.getDate()}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Time Slots */}
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {OPERATING_HOURS.map((hour) => (
                                <div key={hour} className="grid grid-cols-8">
                                    {/* Time Label */}
                                    <div className="border-r border-gray-100 p-2 text-xs font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                        {formatHour(hour)}
                                    </div>

                                    {/* Day Cells */}
                                    {weekDates.map((date, dayIndex) => {
                                        const dateKey = formatDateISO(date);
                                        const dayReservations = reservationsByDate[dateKey] || [];
                                        const slotReservation = dayReservations.find((res) =>
                                            isSlotOverlapping(res.start, res.end, hour, date)
                                        );

                                        const isToday = formatDateISO(new Date()) === dateKey;
                                        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                                        return (
                                            <div
                                                key={dayIndex}
                                                className={cn(
                                                    "relative border-r border-gray-100 p-1 dark:border-gray-700",
                                                    isToday && "bg-trust-blue-50/30 dark:bg-trust-blue-900/10",
                                                    isPast && "bg-gray-50 dark:bg-gray-800/30"
                                                )}
                                            >
                                                {slotReservation ? (
                                                    <button
                                                        onClick={() => handleReservationClick({
                                                            id: slotReservation.id,
                                                            start_datetime: slotReservation.start,
                                                            end_datetime: slotReservation.end,
                                                            status: slotReservation.status as any,
                                                            resident_name: slotReservation.resident_name,
                                                            common_area: selectedArea,
                                                            unit: '',
                                                            resident_phone: '',
                                                            notes: '',
                                                            paid_amount_cve: null,
                                                            created_at: '',
                                                            updated_at: '',
                                                            unit_identifier: slotReservation.unit_identifier,
                                                        } as Reservation)}
                                                        className={cn(
                                                            "flex h-full w-full flex-col items-center justify-center rounded text-xs font-medium transition-colors",
                                                            "p-1 text-center",
                                                            slotReservation.status === 'CONFIRMED'
                                                                ? "bg-hope-green-100 text-hope-green-700 hover:bg-hope-green-200 dark:bg-hope-green-900/30"
                                                                : slotReservation.status === 'PENDING'
                                                                ? "bg-dream-gold-100 text-dream-gold-700 hover:bg-dream-gold-200 dark:bg-dream-gold-900/30"
                                                                : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                                        )}
                                                    >
                                                        <div className="line-clamp-1">{slotReservation.resident_name}</div>
                                                        <div className="text-[10px] opacity-75">
                                                            {new Date(slotReservation.start).getHours()}:00 - {new Date(slotReservation.end).getHours()}:00
                                                        </div>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSlotClick(date, hour)}
                                                        className={cn(
                                                            "flex h-full w-full items-center justify-center rounded text-xs transition-colors",
                                                            "hover:bg-trust-blue-50 dark:hover:bg-trust-blue-900/20",
                                                            isPast ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                                                        )}
                                                        disabled={isPast}
                                                    >
                                                        <PlusIcon className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Create Reservation Modal */}
            {showCreateModal && selectedSlot && (
                <CreateReservationModal
                    condominiumId={condominiumId}
                    commonAreaId={selectedArea}
                    initialDate={selectedSlot.date}
                    initialHour={selectedSlot.hour}
                    onClose={() => {
                        setShowCreateModal(false);
                        setSelectedSlot(null);
                    }}
                    onSuccess={() => {
                        setShowCreateModal(false);
                        setSelectedSlot(null);
                        queryClient.invalidateQueries({ queryKey: ['reservations', condominiumId, selectedArea] });
                    }}
                />
            )}

            {/* View Reservation Modal */}
            {selectedReservation && (
                <ViewReservationModal
                    condominiumId={condominiumId}
                    reservation={selectedReservation}
                    onClose={() => setSelectedReservation(null)}
                    onCancel={() => {
                        queryClient.invalidateQueries({ queryKey: ['reservations', condominiumId, selectedArea] });
                        setSelectedReservation(null);
                    }}
                />
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Create Reservation Modal
// ---------------------------------------------------------------------------

function CreateReservationModal({
    condominiumId,
    commonAreaId,
    initialDate,
    initialHour,
    onClose,
    onSuccess,
}: {
    condominiumId: string;
    commonAreaId: string;
    initialDate: Date;
    initialHour: number;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const queryClient = useQueryClient();
    const [residentName, setResidentName] = useState('');
    const [residentPhone, setResidentPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedUnit, setSelectedUnit] = useState<string>('');

    const { data: unitsData } = useQuery({
        queryKey: ['units', condominiumId],
        queryFn: () => condominiumsApi.listUnits(condominiumId),
    });
    const units = unitsData?.results ?? [];

    const { data: areaData } = useQuery({
        queryKey: ['commonArea', commonAreaId],
        queryFn: () => condominiumsApi.listCommonAreas(condominiumId).then(d => d.results.find(a => a.id === commonAreaId)),
        enabled: !!commonAreaId,
    });

    const createMutation = useMutation({
        mutationFn: (payload: any) =>
            condominiumsApi.createReservation(condominiumId, commonAreaId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations', condominiumId, commonAreaId] });
            onSuccess();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const startDatetime = new Date(initialDate);
        startDatetime.setHours(initialHour, 0, 0, 0);
        
        const endDatetime = new Date(startDatetime);
        endDatetime.setHours(endDatetime.getHours() + 1);

        createMutation.mutate({
            unit: selectedUnit,
            resident_name: residentName,
            resident_phone: residentPhone,
            start_datetime: startDatetime.toISOString(),
            end_datetime: endDatetime.toISOString(),
            status: 'PENDING',
            notes: notes,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Nova Reserva
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {areaData && (
                        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-semibold">Área:</span> {areaData.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-semibold">Data:</span> {initialDate.toLocaleDateString('pt-PT')} às {initialHour}:00
                            </p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Unidade *
                        </label>
                        <select
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                        >
                            <option value="">Selecionar unidade</option>
                            {units.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.identifier}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Nome do Residente *
                        </label>
                        <input
                            type="text"
                            value={residentName}
                            onChange={(e) => setResidentName(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            placeholder="Seu nome completo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Telefone / WhatsApp *
                        </label>
                        <input
                            type="tel"
                            value={residentPhone}
                            onChange={(e) => setResidentPhone(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            placeholder="+238 XXX XXXX"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Notas (opcional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            placeholder="Informações adicionais..."
                        />
                    </div>

                    {areaData?.requires_payment && areaData.price_cve && (
                        <div className="rounded-lg bg-dream-gold-50 p-3 dark:bg-dream-gold-900/20">
                            <p className="text-sm text-dream-gold-700 dark:text-dream-gold-400">
                                <span className="font-semibold">Taxa de reserva:</span> {parseFloat(areaData.price_cve).toLocaleString('pt-CV')} CVE
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="bg-trust-blue-600 text-white hover:bg-trust-blue-700"
                        >
                            {createMutation.isPending ? 'A criar...' : 'Criar Reserva'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// View Reservation Modal
// ---------------------------------------------------------------------------

function ViewReservationModal({
    condominiumId,
    reservation,
    onClose,
    onCancel,
}: {
    condominiumId: string;
    reservation: Reservation;
    onClose: () => void;
    onCancel: () => void;
}) {
    const queryClient = useQueryClient();

    const cancelMutation = useMutation({
        mutationFn: () =>
            condominiumsApi.cancelReservation(condominiumId, reservation.common_area, reservation.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations', condominiumId, reservation.common_area] });
            onCancel();
        },
    });

    const startDate = new Date(reservation.start_datetime);
    const endDate = new Date(reservation.end_datetime);

    const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
        PENDING: { label: 'Pendente', color: 'bg-dream-gold-100 text-dream-gold-700 dark:bg-dream-gold-900/30' },
        CONFIRMED: { label: 'Confirmada', color: 'bg-hope-green-100 text-hope-green-700 dark:bg-hope-green-900/30' },
        CANCELLED: { label: 'Cancelada', color: 'bg-red-100 text-red-700 dark:bg-red-900/30' },
        COMPLETED: { label: 'Concluída', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' },
    };

    const statusConfig = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.PENDING;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Detalhes da Reserva
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Estado</span>
                            <span className={cn("rounded-full px-3 py-1 text-xs font-bold", statusConfig.color)}>
                                {statusConfig.label}
                            </span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Área:</span>{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">{reservation.common_area_name}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Data:</span>{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {startDate.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Horário:</span>{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {startDate.getHours()}:00 - {endDate.getHours()}:00
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Unidade:</span>{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">{reservation.unit_identifier}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Residente:</span>{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">{reservation.resident_name}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Telefone:</span>{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">{reservation.resident_phone}</span>
                            </div>
                            {reservation.notes && (
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400">Notas:</span>{' '}
                                    <p className="mt-1 text-gray-900 dark:text-white">{reservation.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {reservation.status === 'PENDING' && (
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" onClick={onClose}>
                                Fechar
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => cancelMutation.mutate()}
                                disabled={cancelMutation.isPending}
                                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700"
                            >
                                {cancelMutation.isPending ? 'A cancelar...' : 'Cancelar Reserva'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
