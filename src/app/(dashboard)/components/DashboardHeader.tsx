'use client'

import { getUserDisplayName } from '@/lib/utils'
import { UserRole, UserRoleLabel } from '@/shared/enums/UserRole'
import { MobileNav } from './MobileNav'
import { NotificationPopover } from './NotificationPopover'
import { UserProfile } from './UserProfile'

interface DashboardHeaderProps {
  user?: {
    name?: string
    email?: string
    avatar_url?: string
    role?: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const userRole = user?.role
    ? UserRoleLabel[user.role as UserRole] || 'Membro'
    : 'Membro'

  return (
    <header className="sticky top-0 z-40 bg-[#ffffff] px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between lg:justify-end gap-x-4">
        <div className="flex items-center gap-x-4 lg:hidden">
          <MobileNav />
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <NotificationPopover />

          <div className="hidden sm:block w-px h-6 bg-gray-200 mx-2" />

          <UserProfile
            name={getUserDisplayName(user)}
            role={userRole}
            avatarUrl={user?.avatar_url || '/assets/avatar.jpg'}
          />
        </div>
      </div>
    </header>
  )
}
