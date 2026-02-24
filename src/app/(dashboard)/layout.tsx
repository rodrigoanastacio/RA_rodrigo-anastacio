import { NotificationProvider } from '@/contexts/NotificationContext'
import { createClient } from '@/lib/supabase/server'
import { userHandler } from '@/shared/api-handlers/user/user.handler'
import { Toaster } from 'sonner'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardSidebar } from './components/DashboardSidebar'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const userData = (await userHandler.getMe(supabase)) || undefined

  return (
    <div className="h-screen flex bg-[#F9FAFB] overflow-hidden">
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:z-50 shrink-0">
        <DashboardSidebar user={userData} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <NotificationProvider>
          <DashboardHeader user={userData} />

          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>

          <Toaster richColors position="top-right" />
        </NotificationProvider>
      </div>
    </div>
  )
}
