'use client'

import { useDashboard } from '@/app/(dashboard)/hooks/useDashboard'
import { TenantLogo } from '@/components/TenantLogo'
import { cn } from '@/lib/utils'
import {
  Home,
  LayoutTemplate,
  LogOut,
  Settings,
  Users,
  UsersRound
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Leads', href: '/dashboard/leads/list', icon: Users },
  { name: 'Equipe', href: '/dashboard/team/list', icon: UsersRound },
  {
    name: 'Landing Pages',
    href: '/dashboard/landing-pages',
    icon: LayoutTemplate
  },
  { name: 'Formulários', href: '/dashboard/forms', icon: LayoutTemplate },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings }
]

interface DashboardSidebarProps {
  user?: {
    name?: string
    email?: string
    avatar_url?: string
    role?: string
    tenant_id?: string
    business_name?: string
    business_slogan?: string
  }
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { handleLogout, isLoggingOut } = useDashboard()

  const filteredNavigation = navigation.filter((item) => {
    if (item.href === '/dashboard/team/list') {
      return user?.role === 'admin'
    }
    return true
  })

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-100">
      <div className="flex h-[88px] shrink-0 items-center px-6">
        <TenantLogo
          className="w-full"
          companyName={user?.business_name}
          tagline={user?.business_slogan}
        />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7 pl-4">
          <li className="flex-1">
            <ul role="list" className="space-y-2">
              {filteredNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name} className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        isActive
                          ? 'text-blue-400'
                          : 'text-gray-500 hover:text-blue-400',
                        'group flex gap-x-4 p-3 text-md font-semibold transition-all duration-200 items-center'
                      )}
                    >
                      <item.icon
                        className={cn(
                          isActive
                            ? 'text-blue-400'
                            : 'text-gray-400 group-hover:text-blue-400',
                          'h-5 w-5 shrink-0 transition-colors'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}

                      {isActive && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-full bg-blue-400 transition-colors" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>

          <li className="mt-auto px-2 pb-8">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full group font-semibold text-sm disabled:opacity-50"
            >
              <LogOut
                className={cn(
                  'h-5 w-5 shrink-0 transition-colors',
                  isLoggingOut && 'animate-pulse'
                )}
              />
              {isLoggingOut ? 'Saindo...' : 'Sair'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
