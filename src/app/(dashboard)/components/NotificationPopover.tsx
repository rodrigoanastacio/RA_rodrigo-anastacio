'use client'

import { useNotifications } from '@/contexts/NotificationContext'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Bell, Check } from 'lucide-react'

export function NotificationPopover() {
  const { notifications, unreadCount, markAllAsRead, markAsRead } =
    useNotifications()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors rounded-xl outline-none group">
          <Bell
            className={cn(
              'h-5 w-5 transition-transform group-hover:scale-110',
              unreadCount > 0 && 'text-gray-600'
            )}
          />

          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[380px] bg-white rounded-2xl shadow-xl border border-gray-100 p-0 animate-in fade-in zoom-in-95 duration-200 z-50 flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-gray-900">Notificações</h4>
            {unreadCount > 0 && (
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount} novas
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              Marcar lidas
            </button>
          )}
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-2 space-y-1 min-h-[100px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 gap-2">
              <Bell className="w-8 h-8 opacity-20" />
              <p className="text-xs font-medium">Nenhuma notificação</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  'flex gap-3 p-3 rounded-xl transition-all cursor-pointer relative group',
                  notification.read
                    ? 'hover:bg-gray-50 opacity-60'
                    : 'bg-blue-50/30 hover:bg-blue-50'
                )}
              >
                <div
                  className={cn(
                    'w-2 h-2 rounded-full mt-2 shrink-0',
                    notification.read ? 'bg-transparent' : 'bg-blue-500'
                  )}
                />

                <div className="flex-1 space-y-1">
                  <p
                    className={cn(
                      'text-sm leading-tight',
                      notification.read
                        ? 'text-gray-600 font-medium'
                        : 'text-gray-900 font-bold'
                    )}
                  >
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium pt-1">
                    {formatDistanceToNow(notification.timestamp, {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
