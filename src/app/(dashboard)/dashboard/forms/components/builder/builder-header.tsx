'use client'

import { FormSchema } from '@/components/forms/types'
import { cn } from '@/lib/utils'
import { ArrowLeft, Eye, FormInput, Loader2, Pencil, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BuilderHeaderProps {
  schema: FormSchema
  activeTab: 'editor' | 'preview'
  setActiveTab: (tab: 'editor' | 'preview') => void
  onSave: () => Promise<void>
  isSaving: boolean
  isPublished: boolean
  onTogglePublish: (newStatus: boolean) => Promise<void>
}

export function BuilderHeader({
  schema,
  activeTab,
  setActiveTab,
  onSave,
  isSaving,
  isPublished,
  onTogglePublish
}: BuilderHeaderProps) {
  const router = useRouter()

  return (
    <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-1.5 text-gray-400 hover:text-[#4F46E5] transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Voltar
          </span>
        </button>

        <div className="w-px h-5 bg-gray-100" />

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#4F46E5] flex items-center justify-center">
            <FormInput className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-gray-900 leading-tight">
              {schema.name}
            </p>
            <p className="text-[10px] text-gray-400 font-mono leading-tight uppercase tracking-wider">
              Form Builder ·{' '}
              {schema.display_type === 'wizard' ? 'Multi-etapas' : 'Simples'}
              {' · '}
              <span
                className={cn(
                  'font-bold',
                  isPublished ? 'text-emerald-500' : 'text-amber-500'
                )}
              >
                {isPublished ? 'Publicado' : 'Rascunho'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-stretch h-8 border border-gray-100 bg-gray-50 overflow-hidden">
          <button
            onClick={() => setActiveTab('editor')}
            className={cn(
              'flex items-center gap-1.5 px-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer',
              activeTab === 'editor'
                ? 'bg-[#4F46E5] text-white'
                : 'text-gray-400 hover:text-gray-700 hover:bg-white'
            )}
          >
            <Pencil className="w-3 h-3" />
            Editor
          </button>
          <div className="w-px bg-gray-100" />
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'flex items-center gap-1.5 px-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer',
              activeTab === 'preview'
                ? 'bg-[#4F46E5] text-white'
                : 'text-gray-400 hover:text-gray-700 hover:bg-white'
            )}
          >
            <Eye className="w-3 h-3" />
            Preview
          </button>
        </div>

        <button
          onClick={() => onTogglePublish(!isPublished)}
          disabled={isSaving}
          className={cn(
            'flex items-center gap-2 h-8 px-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer border',
            isPublished
              ? 'border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
          )}
        >
          {isPublished ? 'Despublicar' : 'Publicar'}
        </button>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-60 text-white h-8 px-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          Salvar
        </button>
      </div>
    </div>
  )
}
