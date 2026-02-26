'use server'

import { createClient } from '@/lib/supabase/server'

export async function getNotifications() {
  const supabase = await createClient()

  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching notifications:', error)
    return { success: false, data: [] }
  }

  return { success: true, data: notifications }
}

export async function markAsRead(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id)

  if (error) {
    console.error('Error marking notification as read:', error)
    return { success: false, error: 'Failed to mark as read' }
  }

  return { success: true }
}

export async function markAllAsRead() {
  const supabase = await createClient()

  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('read', false)

  if (error) {
    console.error('Error marking all notifications as read:', error)
    return { success: false, error: 'Failed to mark all as read' }
  }

  return { success: true }
}
