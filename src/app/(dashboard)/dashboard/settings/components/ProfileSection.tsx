'use client'

import { Box } from '@/components/ui/box'
import { Loader2, Save, Upload, User } from 'lucide-react'
import Image from 'next/image'

interface ProfileSectionProps {
  fullName: string
  setFullName: (name: string) => void
  email: string
  avatarUrl: string | null
  loading: boolean
  saving: boolean
  uploadingAvatar: boolean
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onSave: () => void
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveAvatar: () => void
}

export function ProfileSection({
  fullName,
  setFullName,
  email,
  avatarUrl,
  loading,
  saving,
  uploadingAvatar,
  fileInputRef,
  onSave,
  onAvatarChange,
  onRemoveAvatar
}: ProfileSectionProps) {
  return (
    <Box>
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        Informações do Perfil
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-100 rounded w-full max-w-md"></div>
          <div className="h-10 bg-gray-100 rounded w-full max-w-md"></div>
        </div>
      ) : (
        <div className="space-y-6 max-w-md">
          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Foto de Perfil
            </label>
            <div className="flex items-center gap-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative h-20 w-20 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer group hover:border-blue-500 transition-colors"
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Foto de perfil"
                    fill
                    className={`object-cover transition-opacity duration-300 ${uploadingAvatar ? 'opacity-50' : 'group-hover:opacity-75'}`}
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                )}

                {/* Overlays */}
                {uploadingAvatar ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                    {/* Subtle progress bar at bottom of the avatar circle */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div className="h-full bg-blue-600 animate-pulse w-full origin-left" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={onAvatarChange}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50"
                >
                  Alterar foto
                </button>
                {avatarUrl && (
                  <button
                    onClick={onRemoveAvatar}
                    disabled={uploadingAvatar}
                    className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 flex items-center gap-1"
                  >
                    Remover
                  </button>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  PGN, JPG ou WEBP. Máx 2MB.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">
              O email não pode ser alterado.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Box>
  )
}
