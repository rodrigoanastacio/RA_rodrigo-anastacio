'use client'

import { useLeadActions } from '@/app/(dashboard)/dashboard/hooks/useLeadActions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  LeadStatus,
  LeadStatusColor,
  LeadStatusLabel
} from '@/shared/enums/LeadStatus'
import {
  Archive,
  ArrowRight,
  Calendar,
  MoreVertical,
  Trash2,
  User
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { DeleteLeadModal } from './DeleteLeadModal'

interface RecentLeadsProps {
  leads: {
    id: string
    name: string
    date: string
    status: string
  }[]
}

function StatusBadge({ status }: { status: string }) {
  const statusEnum = Object.values(LeadStatus).includes(status as LeadStatus)
    ? (status as LeadStatus)
    : undefined

  const label = statusEnum ? LeadStatusLabel[statusEnum] : status
  const color = statusEnum
    ? LeadStatusColor[statusEnum]
    : 'bg-gray-100 text-gray-700'

  return (
    <Badge
      variant="secondary"
      className={cn(
        'text-[10px] font-bold border-none px-2 h-5 shadow-none transition-colors',
        color
      )}
    >
      {label}
    </Badge>
  )
}

export function RecentLeads({ leads }: RecentLeadsProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<{
    id: string
    name: string
  } | null>(null)
  const { archiveLead, deleteLead, isLoading } = useLeadActions()

  const handleArchive = async (leadId: string) => {
    await archiveLead(leadId)
  }

  const handleDeleteClick = (lead: { id: string; name: string }) => {
    setSelectedLead(lead)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedLead) return
    await deleteLead(selectedLead.id)
    setDeleteModalOpen(false)
    setSelectedLead(null)
  }

  return (
    <div className="bg-white border border-gray-100 p-6 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Últimos Leads</h3>
        <Button variant="ghost" className="text-xs h-8" asChild>
          <Link href="/dashboard/leads/list">
            Ver todos <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden flex-1">
        <Table>
          <TableHeader className="hidden">
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="border-b-gray-50 hover:bg-gray-50/50"
              >
                <TableCell className="py-3 px-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 line-clamp-1">
                        {lead.name}
                      </p>
                      <div className="flex items-center text-[10px] text-gray-400 mt-0.5">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(lead.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right py-3 pr-0">
                  <StatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="text-right py-3 pr-0 w-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleArchive(lead.id)}
                        disabled={isLoading}
                      >
                        <Archive className="w-4 h-4 mr-2" />
                        Arquivar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(lead)}
                        disabled={isLoading}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {leads.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-gray-400 text-sm"
                >
                  Nenhum lead encontrado recente.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteLeadModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        leadName={selectedLead?.name || ''}
        isLoading={isLoading}
      />
    </div>
  )
}
