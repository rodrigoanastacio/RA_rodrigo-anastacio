'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { DashboardSidebar } from './DashboardSidebar'

interface MobileNavProps {
  user?: {
    name?: string
    email?: string
    avatar_url?: string
    role?: string
    tenant_id?: string
  }
}

export function MobileNav({ user }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
        <DashboardSidebar user={user} />
      </SheetContent>
    </Sheet>
  )
}
