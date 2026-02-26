'use client'

import { Box } from '@/components/ui/box'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'
import {
  Image as ImageIcon,
  Info,
  Loader2,
  Save,
  Upload,
  X
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { DeleteLogoModal } from './DeleteLogoModal'

interface BrandingSectionProps {
  logoPreview: string | null
  uploading: boolean
  error: string | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpload: () => void
  onCancel: () => void
  onRemove: () => void
}

export function BrandingSection({
  logoPreview,
  uploading,
  error,
  onFileChange,
  onUpload,
  onCancel,
  onRemove
}: BrandingSectionProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleRemoveClick = () => {
    if (logoPreview?.startsWith('data:')) {
      onRemove()
    } else {
      setIsDeleteModalOpen(true)
    }
  }

  const handleConfirmRemove = () => {
    setIsDeleteModalOpen(false)
    onRemove()
  }

  return (
    <Box>
      {/* Card header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#4F46E5] flex items-center justify-center">
            <ImageIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
              Identidade Visual
            </h2>
            <p className="text-[10px] text-gray-400 font-medium">
              Logo e marca da empresa
            </p>
          </div>
        </div>

        {logoPreview && (
          <button
            onClick={onUpload}
            disabled={uploading}
            className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-60 text-white h-8 px-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {uploading ? 'Salvando' : 'Salvar Logo'}
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="max-w-md space-y-4">
          <SectionHeader
            icon={<Upload className="w-3 h-3" />}
            label="Logo da Empresa"
          />

          {logoPreview ? (
            <div className="space-y-4">
              <div className="relative w-48 h-48 border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                <Image
                  src={logoPreview}
                  alt="Preview do logo"
                  fill
                  className="object-contain p-4"
                />
                <button
                  onClick={handleRemoveClick}
                  className="absolute top-2 right-2 w-6 h-6 bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-200 transition-all cursor-pointer"
                  title="Remover"
                >
                  <X size={13} />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onCancel}
                  disabled={uploading}
                  className="h-8 px-4 border border-gray-200 text-gray-600 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 disabled:opacity-50 transition-all cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <label
              className={cn(
                'flex flex-col items-center justify-center w-full max-w-sm h-40',
                'border-2 border-dashed border-gray-200 cursor-pointer',
                'hover:border-[#4F46E5]/50 hover:bg-[#4F46E5]/2 transition-all group bg-gray-50/50'
              )}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-9 h-9 bg-white border border-gray-100 flex items-center justify-center group-hover:bg-[#4F46E5]/8 transition-all">
                  <Upload className="w-4 h-4 text-gray-400 group-hover:text-[#4F46E5] transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-[#4F46E5] transition-colors">
                    Clique para fazer upload
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    PNG, JPG, SVG ou WebP · Máx. 5MB
                  </p>
                </div>
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
          )}

          {error && (
            <div className="border-l-2 border-rose-400 bg-rose-50 px-3 py-2.5 flex items-center gap-2">
              <Info size={13} className="text-rose-500 shrink-0" />
              <p className="text-[11px] text-rose-700 font-medium">{error}</p>
            </div>
          )}

          <div className="border-l-2 border-[#4F46E5] bg-[#4F46E5]/04 px-3 py-2.5 flex items-start gap-2">
            <Info size={13} className="text-[#4F46E5] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#4F46E5]/80 leading-relaxed">
              Recomendamos imagem quadrada ou com fundo transparente para melhor
              visualização.
            </p>
          </div>
        </div>
      </div>

      <DeleteLogoModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmRemove}
        isLoading={uploading}
      />
    </Box>
  )
}
