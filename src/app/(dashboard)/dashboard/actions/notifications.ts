'use server'

import { createClient } from '@/lib/supabase/server'

async function getAuthContext() {
  const supabase = await createClient()
  const { data: authUser } = await supabase.auth.getUser()
  if (!authUser?.user) throw new Error('Unauthorized')

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', authUser.user.id)
    .single()

  if (!profile?.tenant_id) throw new Error('Tenant not found')

  return { supabase, tenantId: profile.tenant_id }
}

export async function getNotifications() {
  try {
    const { supabase, tenantId } = await getAuthContext()

    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching notifications:', error)
      return { success: false, data: [] }
    }

    return { success: true, data: notifications }
  } catch (error: unknown) {
    console.error('[getNotifications] Error:', error)
    return { success: false, data: [] }
  }
}

export async function markAsRead(id: string) {
  try {
    const { supabase, tenantId } = await getAuthContext()

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('tenant_id', tenantId)

    if (error) {
      console.error('Error marking notification as read:', error)
      return { success: false, error: 'Failed to mark as read' }
    }

    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}

export async function markAllAsRead() {
  try {
    const { supabase, tenantId } = await getAuthContext()

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('tenant_id', tenantId)
      .eq('read', false)

    if (error) {
      console.error('Error marking all notifications as read:', error)
      return { success: false, error: 'Failed to mark all as read' }
    }

    return { success: true }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
