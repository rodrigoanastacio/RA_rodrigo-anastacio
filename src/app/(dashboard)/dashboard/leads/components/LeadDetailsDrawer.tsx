'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle
} from '@/components/ui/sheet'
import {
  formatLeadStatus,
  getLeadStatusStyle,
  LeadStatusType
} from '@/shared/constants/lead.constants'
import { Lead } from '@/shared/entities/leads/lead.types'
import {
  ChevronDown,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  User,
  X
} from 'lucide-react'

interface LeadDetailsDrawerProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus?: (id: string, status: string) => void
}

export function LeadDetailsDrawer({
  lead,
  isOpen,
  onClose,
  onUpdateStatus
}: LeadDetailsDrawerProps) {
  if (!lead) return null

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="sm:max-w-[600px] p-0 overflow-y-auto bg-white border-l border-gray-100 shadow-2xl">
          <SheetTitle className="sr-only">
            Detalhes do Lead: {lead.nome_completo}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Visualização completa das informações coletadas no diagnóstico de
            performance e gestão.
          </SheetDescription>
          <div className="p-8 border-b border-gray-50 bg-white sticky top-0 z-10">
            <button
              onClick={onClose}
              className="absolute right-8 top-8 p-1 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1">
              <h2 className="text-[28px] font-extrabold text-[#111827] tracking-tight">
                {lead.nome_completo}
              </h2>
              <p className="text-[13px] font-medium text-gray-400 uppercase tracking-wider">
                Lead captado via Landing Page em{' '}
                {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={!lead.whatsapp}
                onClick={() =>
                  lead.whatsapp &&
                  window.open(
                    `https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`,
                    '_blank'
                  )
                }
              >
                <MessageCircle className="w-5 h-5" />
                WHATSAPP
              </Button>
              <div className="flex-1 min-w-[180px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center justify-between px-5 h-12 rounded-xl border-2 border-gray-100 bg-white text-[13px] font-extrabold text-gray-900 group hover:border-blue-400 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-400/20">
                      <span className="flex items-center gap-2">
                        STATUS:{' '}
                        <Badge
                          className={`border-0 shadow-none font-extrabold text-[10px] tracking-widest px-2 py-0.5 rounded ${getLeadStatusStyle(lead.status)}`}
                        >
                          {formatLeadStatus(lead.status)}
                        </Badge>
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    {Object.values(LeadStatusType).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => onUpdateStatus?.(lead.id, status)}
                        className="cursor-pointer"
                      >
                        <Badge
                          className={`w-full justify-center border-0 shadow-none font-extrabold text-[10px] tracking-widest px-2 py-1 rounded ${getLeadStatusStyle(status)}`}
                        >
                          {formatLeadStatus(status)}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User className="w-5 h-5 fill-blue-600/10" />
                </div>
                <h3 className="text-[14px] font-extrabold uppercase tracking-widest text-[#1e40af]">
                  Informações de Contato
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-y-6 p-8 rounded-[24px] bg-[#f8fafc]/50 border border-gray-100/50">
                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {lead.email}
                  </p>
                </div>
                {lead.whatsapp && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                      WhatsApp
                    </p>
                    <p className="text-[15px] font-bold text-gray-900">
                      {lead.whatsapp}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="p-8 bg-[#f8fafc] border-t border-gray-100 sticky bottom-0 z-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-xl border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 shadow-none"
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-xl border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 shadow-none"
                >
                  <Mail className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-xl border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 shadow-none"
                >
                  <FileText className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <button className="text-[11px] font-extrabold text-gray-400 hover:text-rose-500 uppercase tracking-widest transition-colors">
                  DESCARTAR LEAD
                </button>
                <Button
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl h-12 px-8 font-extrabold shadow-lg shadow-blue-200/50 transition-all active:scale-95 text-[14px] tracking-tight"
                  onClick={() =>
                    (window.location.href = `/dashboard/meeting/${lead.id}`)
                  }
                >
                  INICIAR REUNIÃO
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
