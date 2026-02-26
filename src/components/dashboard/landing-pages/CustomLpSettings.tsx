'use client'

import {
  togglePublishAction,
  uploadCustomLpAction
} from '@/app/(dashboard)/dashboard/landing-pages/actions'
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  FileArchive,
  Globe,
  Loader2,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

interface CustomLpSettingsProps {
  lp: {
    id: string
    title: string
    slug: string
    is_published: boolean | null
    is_custom: boolean
    created_at: string | null
    updated_at: string | null
  }
}

export function CustomLpSettings({ lp }: CustomLpSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isPublished, setIsPublished] = useState(lp.is_published ?? false)
  const [isTogglingPublish, setIsTogglingPublish] = useState(false)

  const publicUrl = `/lp/${lp.slug}`

  async function handleReupload() {
    if (!file) {
      toast.error('Selecione um arquivo .zip para upload.')
      return
    }
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const result = await uploadCustomLpAction(formData, lp.slug)
      if (result.success) {
        toast.success('ZIP atualizado com sucesso! A página foi substituída.')
        setFile(null)
      } else {
        toast.error(result.message || 'Erro ao fazer upload.')
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro inesperado ao fazer upload.')
    } finally {
      setIsUploading(false)
    }
  }

  async function handleTogglePublish() {
    setIsTogglingPublish(true)
    try {
      const newStatus = !isPublished
      const result = await togglePublishAction(lp.id, newStatus)
      if (result.success) {
        setIsPublished(newStatus)
        toast.success(newStatus ? 'Página publicada!' : 'Página despublicada.')
      } else {
        toast.error('Erro ao alterar status.')
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro inesperado.')
    } finally {
      setIsTogglingPublish(false)
    }
  }

  function copyUrl() {
    const fullUrl = `${window.location.origin}${publicUrl}`
    navigator.clipboard.writeText(fullUrl)
    toast.success('URL copiada!')
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-80 xl:w-96 bg-[#111827] p-10 shrink-0">
        <div>
          <div className="w-10 h-10 bg-emerald-600 flex items-center justify-center mb-8">
            <FileArchive className="w-5 h-5 text-white" />
          </div>

          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
            Custom Landing Page
          </p>
          <h2 className="text-2xl font-extrabold text-white leading-tight mb-4">
            {lp.title}
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Esta página utiliza código personalizado via upload de arquivo .zip.
            Aqui você gerencia a publicação e pode substituir o conteúdo.
          </p>

          <div className="my-8 border-t border-white/8" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Status
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border ${
                  isPublished
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}
              >
                {isPublished ? '● Publicada' : '○ Rascunho'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Tipo
              </span>
              <span className="text-[10px] font-bold text-emerald-400">
                Custom ZIP
              </span>
            </div>
          </div>
        </div>

        {/* URL Preview */}
        <div className="bg-white/5 border border-white/10 p-4">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
            URL Pública
          </p>
          <p className="font-mono text-xs text-emerald-400 break-all">
            {publicUrl}
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-start justify-center p-8 bg-[#f9fafb] overflow-y-auto">
        <div className="w-full max-w-lg">
          <Link
            href="/dashboard/landing-pages"
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
            Voltar para Landing Pages
          </Link>

          <div className="space-y-4">
            {/* Section: Status */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div
                className={`h-0.5 w-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-400'}`}
              />
              <div className="p-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Status de Publicação
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {isPublished
                        ? 'Página publicada e acessível'
                        : 'Página em rascunho'}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {isPublished
                        ? 'Visitantes podem acessar esta página normalmente.'
                        : 'A página não está visível para visitantes.'}
                    </p>
                  </div>
                  <button
                    onClick={handleTogglePublish}
                    disabled={isTogglingPublish}
                    className={`flex items-center gap-2 h-9 px-5 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-200 disabled:opacity-60 cursor-pointer ${
                      isPublished
                        ? 'bg-amber-500 hover:bg-amber-600'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {isTogglingPublish && (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    )}
                    {isPublished ? 'Despublicar' : 'Publicar'}
                  </button>
                </div>
              </div>
            </div>

            {/* Section: Public URL */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="h-0.5 w-full bg-gray-100" />
              <div className="p-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  URL Pública
                </p>
                <div className="flex items-stretch border border-gray-200">
                  <div className="flex-1 px-4 py-3 bg-gray-50 font-mono text-xs text-gray-600 min-w-0 truncate">
                    {typeof window !== 'undefined'
                      ? `${window.location.origin}${publicUrl}`
                      : publicUrl}
                  </div>
                  <button
                    onClick={copyUrl}
                    title="Copiar URL"
                    className="px-4 border-l border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={publicUrl}
                    target="_blank"
                    className="px-4 border-l border-gray-200 text-gray-400 hover:text-[#4F46E5] hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Ao visitar esta URL, os arquivos do seu ZIP são servidos
                  automaticamente.
                </p>
              </div>
            </div>

            {/* Section: Replace ZIP */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="h-0.5 w-full bg-emerald-200" />
              <div className="p-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Substituir Conteúdo
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Faça upload de um novo .zip para substituir os arquivos da
                  página. O conteúdo anterior será sobrescrito.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-20 border-2 border-dashed border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer group mb-4"
                >
                  {file ? (
                    <>
                      <FileArchive className="w-5 h-5 text-emerald-500" />
                      <p className="text-xs font-bold text-emerald-700">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB · Clique para
                        trocar
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-gray-300 group-hover:text-emerald-400 transition-colors" />
                      <p className="text-xs text-gray-400 group-hover:text-emerald-600 transition-colors">
                        Clique para selecionar o novo .zip
                      </p>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReupload}
                  disabled={!file || isUploading}
                  className="w-full flex items-center justify-center gap-2 h-10 text-[10px] font-bold uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Substituindo...
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      Substituir Conteúdo
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
