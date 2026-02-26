export type NotificationType = 'lead' | 'system'

export interface Notification {
  id: string
  tenant_id: string
  title: string
  message: string
  read: boolean
  type: NotificationType
  created_at: string
}
