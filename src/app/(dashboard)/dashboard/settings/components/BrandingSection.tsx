'use client'

import { Box } from '@/components/ui/box'
import { Save, Upload, X } from 'lucide-react'
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
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        Identidade Visual
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Logo da Empresa
          </label>

          {logoPreview ? (
            <div className="space-y-4">
              <div className="relative w-48 h-48 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                  src={logoPreview}
                  alt="Preview do logo"
                  fill
                  className="object-contain p-4"
                />
                <button
                  onClick={handleRemoveClick}
                  className="absolute top-2 right-2 p-1.5 cursor-pointer bg-white shadow-md text-gray-500 rounded-full hover:text-red-500 transition-colors border border-gray-100"
                  title="Remover"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onUpload}
                  disabled={uploading}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Save size={16} />
                  {uploading ? 'Salvando...' : 'Salvar Logo'}
                </button>

                <button
                  onClick={onCancel}
                  disabled={uploading}
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full max-w-lg h-48 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group bg-gray-50/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="mb-1 text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  Clique para fazer upload
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, SVG ou WebP (Máx. 5MB)
                </p>
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
            <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-[10px]">
              i
            </span>
            Recomendamos imagem quadrada ou transparente para melhor
            visualização.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-400 italic">
            📝 Em breve: Edição de nome da empresa, slogan e cores
            personalizadas.
          </p>
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
