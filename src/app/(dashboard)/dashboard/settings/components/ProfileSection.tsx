'use client'

import { Box } from '@/components/ui/box'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'
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
      {/* Card header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gray-900 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
              Perfil
            </h2>
            <p className="text-[10px] text-gray-400 font-medium">
              Informações pessoais
            </p>
          </div>
        </div>

        <button
          onClick={onSave}
          disabled={saving || loading}
          className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-60 text-white h-8 px-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          {saving ? 'Salvando' : 'Salvar'}
        </button>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="animate-pulse space-y-4 max-w-md">
            <div className="h-20 w-20 bg-gray-100" />
            <div className="h-9 bg-gray-100 w-full" />
            <div className="h-9 bg-gray-100 w-full" />
          </div>
        ) : (
          <div className="max-w-md space-y-6">
            <div className="space-y-3">
              <SectionHeader
                icon={<Upload className="w-3 h-3" />}
                label="Foto de Perfil"
              />

              <div className="flex items-center gap-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    'relative h-20 w-20 bg-gray-50 border-2 border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-200',
                    'hover:border-[#4F46E5]/50 hover:bg-[#4F46E5]/3'
                  )}
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Foto de perfil"
                      fill
                      className={`object-cover transition-opacity duration-300 ${uploadingAvatar ? 'opacity-50' : 'group-hover:opacity-75'}`}
                    />
                  ) : (
                    <User className="h-8 w-8 text-gray-300 group-hover:text-[#4F46E5]/50 transition-colors" />
                  )}

                  {uploadingAvatar ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                      <Loader2 className="w-5 h-5 text-[#4F46E5] animate-spin" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="w-4 h-4 text-white" />
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
                    className="text-[11px] font-bold uppercase tracking-widest text-[#4F46E5] hover:text-[#4338CA] disabled:opacity-50 transition-colors cursor-pointer text-left"
                  >
                    Alterar foto
                  </button>
                  {avatarUrl && (
                    <button
                      onClick={onRemoveAvatar}
                      disabled={uploadingAvatar}
                      className="text-[11px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 disabled:opacity-50 transition-colors cursor-pointer text-left"
                    >
                      Remover
                    </button>
                  )}
                  <p className="text-[10px] text-gray-400">
                    PNG, JPG ou WEBP. Máx 2MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <SectionHeader
                icon={<User className="w-3 h-3" />}
                label="Dados Pessoais"
              />

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-9 px-3 border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#4F46E5]/40 focus:outline-none transition-all text-sm text-gray-900"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full h-9 px-3 border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed text-sm"
                />
                <p className="text-[10px] text-gray-400">
                  O e-mail não pode ser alterado.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Box>
  )
}
