'use client'

import { deleteLandingPageAction } from '@/app/(dashboard)/dashboard/landing-pages/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LandingPage } from '@/services/landing-pages/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Edit, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteLPModal } from './DeleteLPModal'

interface LandingPageCardProps {
  lp: LandingPage
}

export function LandingPageCard({ lp }: LandingPageCardProps) {
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
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate pr-4">
            {lp.title}
          </CardTitle>
          <div className="flex gap-2">
            <Link href={`/lp/${lp.slug}`} target="_blank" title="Visualizar">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              href={`/dashboard/landing-pages/${lp.id}/edition`}
              title="Editar"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
              onClick={() => setIsDeleteModalOpen(true)}
              title="Excluir"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            {lp.is_published ? (
              <span className="text-green-600 font-bold text-[10px] tracking-widest uppercase bg-green-50 border border-green-100 px-3 py-1 rounded-full">
                Publicada
              </span>
            ) : (
              <span className="text-amber-600 font-bold text-[10px] tracking-widest uppercase bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
                Rascunho
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Criada em{' '}
            {format(new Date(lp.created_at), "d 'de' MMMM, yyyy", {
              locale: ptBR
            })}
          </p>
          <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
            <span className="font-mono text-[10px] text-gray-400">
              /lp/{lp.slug}
            </span>
            <span className="font-medium">{lp.views || 0} visualizações</span>
          </div>
        </CardContent>
      </Card>

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
