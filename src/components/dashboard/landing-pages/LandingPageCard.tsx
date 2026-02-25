'use client'

import { deleteLandingPageAction } from '@/app/(dashboard)/dashboard/landing-pages/actions'
import { Button } from '@/components/ui/button'
import { LandingPage } from '@/services/landing-pages/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Edit2, Eye, Globe, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteLPModal } from './DeleteLPModal'

interface LandingPageCardProps {
  lp: LandingPage
  index?: number
}

export function LandingPageCard({ lp, index = 0 }: LandingPageCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const result = await deleteLandingPageAction(lp.id)
      if (result.success) {
        toast.success('Landing page excluída com sucesso!')
        setIsDeleteModalOpen(false)
      } else {
        toast.error(result.message || 'Erro ao excluir landing page.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro inesperado ao excluir.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div
        className="group relative bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(79,70,229,0.12)] hover:border-[#4F46E5]/20"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        {/* Accent bar top */}
        <div className="h-0.5 w-full bg-gray-100 group-hover:bg-[#4F46E5] transition-colors duration-300" />

        {/* Card header */}
        <div className="p-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-[#4F46E5]/8 flex items-center justify-center shrink-0 group-hover:bg-[#4F46E5] transition-colors duration-300">
              <Globe className="w-4 h-4 text-[#4F46E5] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                {lp.title}
              </h3>
              <span className="font-mono text-[9px] text-gray-400 tracking-tight">
                /lp/{lp.slug}
              </span>
            </div>
          </div>

          {/* Status badge */}
          {lp.is_published ? (
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100">
              ● Publicada
            </span>
          ) : (
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100">
              ○ Rascunho
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-gray-100" />

        {/* Metrics row */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="w-3 h-3" />
            <span className="text-[10px] font-medium">
              {format(new Date(lp.created_at), "d 'de' MMM, yyyy", {
                locale: ptBR
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Eye className="w-3 h-3 text-[#4F46E5]" />
            <span className="text-[10px] font-extrabold text-gray-900">
              {(lp.views || 0).toLocaleString('pt-BR')}
            </span>
            <span className="text-[9px] text-gray-400 uppercase tracking-wide">
              views
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-gray-100" />

        {/* Actions */}
        <div className="p-4 flex items-center gap-2">
          <Link href={`/lp/${lp.slug}`} target="_blank" className="flex-1">
            <button className="w-full flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#4F46E5] border border-gray-200 hover:border-[#4F46E5] py-2 transition-all duration-200 cursor-pointer">
              <Eye className="w-3 h-3" />
              Visualizar
            </button>
          </Link>
          <Link
            href={`/dashboard/landing-pages/${lp.id}/edition`}
            className="flex-1"
          >
            <button className="w-full flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-[#4F46E5] hover:bg-[#4338CA] py-2 transition-all duration-200 cursor-pointer">
              <Edit2 className="w-3 h-3" />
              Editar
            </button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-300 hover:text-rose-500 hover:bg-rose-50 shrink-0 rounded-none"
            onClick={() => setIsDeleteModalOpen(true)}
            title="Excluir"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <DeleteLPModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        lpTitle={lp.title}
        isLoading={isDeleting}
      />
    </>
  )
}
