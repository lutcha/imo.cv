'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '@/lib/api/notifications';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';

export function NotificationBell() {
  const token = useAuthStore((s) => s.token);
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.list,
    refetchInterval: 30_000,
    enabled: !!token,
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAll = useMutation({
    mutationFn: notificationsApi.markAllRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });

  function handleToggle() {
    setOpen((o) => !o);
    // Mark all as read when opening the panel
    if (!open && unreadCount > 0) {
      markAll.mutate();
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="relative p-2 text-gray-600 hover:text-[#005baa] dark:text-gray-300 dark:hover:text-white"
        aria-label="Notificações"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-100 px-4 py-2.5 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Notificações</p>
          </div>

          {notifications.length === 0 ? (
            <p className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Sem notificações
            </p>
          ) : (
            notifications.slice(0, 10).map((n) => (
              <a
                key={n.id}
                href={n.action_url || '#'}
                className={[
                  'block border-b border-gray-50 px-4 py-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50',
                  !n.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : '',
                ].join(' ')}
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                {n.body && (
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{n.body}</p>
                )}
                <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                  {new Date(n.created_at).toLocaleString('pt-CV', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
