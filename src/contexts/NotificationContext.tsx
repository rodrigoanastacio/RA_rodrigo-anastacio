'use client'

import {
  getNotifications,
  markAllAsRead as markAllAsReadAction,
  markAsRead as markAsReadAction
} from '@/app/(dashboard)/dashboard/actions/notifications'
import { env } from '@/config/env'
import { Notification } from '@/shared/entities/notifications/notification.types'
import { createBrowserClient } from '@supabase/ssr'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { toast } from 'sonner'

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  isLoading: boolean
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  isLoading: true
})

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createBrowserClient(env.supabase.url, env.supabase.anonKey)

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true)
      const { success, data } = await getNotifications()
      if (success && data) {
        setNotifications(data as Notification[])
      }
      setIsLoading(false)
    }

    fetchNotifications()

    const channel = supabase
      .channel('global-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const newNotification = payload.new as Notification

          setNotifications((prev) => [newNotification, ...prev])

          toast.success(newNotification.title, {
            description: newNotification.message,
            duration: 5000
          })

          const audio = new Audio('/assets/notification.mp3')
          audio.play().catch(() => {}) // Ignore autoplay errors
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const markAsRead = async (id: string) => {
    const previousNotifications = [...notifications]
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )

    const result = await markAsReadAction(id)
    if (!result.success) {
      setNotifications(previousNotifications)
      toast.error('Erro ao marcar notificação como lida')
    }
  }

  const markAllAsRead = async () => {
    const previousNotifications = [...notifications]
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

    const result = await markAllAsReadAction()
    if (!result.success) {
      setNotifications(previousNotifications)
      toast.error('Erro ao marcar notificações como lidas')
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        isLoading
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
