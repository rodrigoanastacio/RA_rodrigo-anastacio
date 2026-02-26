'use client'

import { createAndPublishCustomLpAction } from '@/app/(dashboard)/dashboard/landing-pages/actions'
import { useLandingPage } from '@/hooks/useLandingPage'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileArchive,
  Globe,
  Loader2,
  Rocket,
  Sparkles,
  Upload
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

type LpMode = 'builder' | 'custom' | null

export function CreateLandingPageForm() {
  const router = useRouter()
  const { create, isSaving } = useLandingPage()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [mode, setMode] = useState<LpMode>(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value
    setTitle(newTitle)
    const newSlug = newTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    setSlug(newSlug)
  }

  async function handleBuilderSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !slug) {
      toast.error('Preencha os campos obrigatórios.')
      return
    }
    const result = await create({ title, slug, is_custom: false })
    if (result.success && result.id) {
      toast.success('Landing Page criada com sucesso!')
      router.push(`/dashboard/landing-pages/${result.id}/edition`)
    } else {
      toast.error(result.message || 'Erro ao criar página.')
    }
  }

  async function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !slug) {
      toast.error('Preencha os campos obrigatórios.')
      return
    }
    if (!file) {
      toast.error('Selecione um arquivo .zip para upload.')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const result = await createAndPublishCustomLpAction(
        { title, slug },
        formData
      )

      if (!result.success) {
        toast.error(result.message || 'Erro ao criar a Custom LP.')
        return
      }

      toast.success('Custom LP publicada com sucesso!')
      router.push('/dashboard/landing-pages')
    } catch (err) {
      console.error(err)
      toast.error('Ocorreu um erro inesperado.')
    } finally {
      setIsUploading(false)
    }
  }

  const previewUrl = slug ? `/lp/${slug}` : '/lp/sua-pagina'
  const isLoading = isSaving || isUploading

  return (
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-80 xl:w-96 bg-[#111827] p-10 shrink-0">
        <div>
          <div className="w-10 h-10 bg-[#4F46E5] flex items-center justify-center mb-8">
            <Globe className="w-5 h-5 text-white" />
          </div>

          <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-3">
            Nova Landing Page
          </p>
          <h2 className="text-2xl font-extrabold text-white leading-tight mb-4">
            Capture leads com páginas de alta conversão
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            {mode === null && 'Escolha como você quer criar sua Landing Page.'}
            {mode === 'builder' &&
              'Defina o título e a URL da sua página. Você personalizará o conteúdo no editor visual.'}
            {mode === 'custom' &&
              'Faça upload de um arquivo .zip com o HTML, CSS e JS prontos da sua landing page.'}
          </p>

          <div className="my-8 border-t border-white/8" />

          <ul className="space-y-4">
            {mode !== 'custom' && (
              <>
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#4F46E5]/15 flex items-center justify-center mt-0.5 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Editor visual completo
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Arraste, solte e personalize
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#4F46E5]/15 flex items-center justify-center mt-0.5 shrink-0">
                    <Rocket className="w-3.5 h-3.5 text-[#4F46E5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Publicação instantânea
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Sua página no ar em segundos
                    </p>
                  </div>
                </li>
              </>
            )}
            {mode === 'custom' && (
              <>
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-emerald-500/15 flex items-center justify-center mt-0.5 shrink-0">
                    <FileArchive className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Código personalizado
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      HTML, CSS, JS e assets
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-emerald-500/15 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Hospedagem automática
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Extraímos e publicamos seu ZIP
                    </p>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>

        {slug && (
          <div className="bg-white/5 border border-white/10 p-4">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Prévia da URL
            </p>
            <p className="font-mono text-xs text-[#4F46E5] break-all">
              {previewUrl}
            </p>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#f9fafb]">
        <div className="w-full max-w-lg">
          <button
            type="button"
            onClick={() => (mode !== null ? setMode(null) : router.back())}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 mb-8 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
            {mode !== null ? 'Trocar tipo' : 'Voltar'}
          </button>

          {/* Step 1: Mode Selection */}
          {mode === null && (
            <div>
              <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="h-0.5 w-full bg-[#4F46E5]" />
                <div className="p-8">
                  <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-2">
                    Passo 1 de 2
                  </p>
                  <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                    Como deseja criar?
                  </h1>
                  <p className="text-sm text-gray-400 mb-8">
                    Escolha o tipo de landing page que deseja criar.
                  </p>

                  <div className="space-y-3">
                    {/* Builder Option */}
                    <button
                      type="button"
                      onClick={() => setMode('builder')}
                      className="w-full flex items-start gap-5 p-5 border-2 border-gray-200 hover:border-[#4F46E5] hover:bg-[#4F46E5]/2 transition-all group text-left cursor-pointer"
                    >
                      <div className="w-11 h-11 bg-[#4F46E5]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4F46E5]/20 transition-colors">
                        <Sparkles className="w-5 h-5 text-[#4F46E5]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 mb-1">
                          Construtor Visual
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Crie sua página arrastando blocos prontos.
                          Formulários, seções e personalizações visuais
                          integradas.
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
                    </button>

                    {/* Custom Upload Option */}
                    <button
                      type="button"
                      onClick={() => setMode('custom')}
                      className="w-full flex items-start gap-5 p-5 border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-500/2 transition-all group text-left cursor-pointer"
                    >
                      <div className="w-11 h-11 bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <FileArchive className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 mb-1">
                          Upload Personalizado{' '}
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200 ml-1">
                            .ZIP
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Já tem sua landing page pronta? Suba um arquivo .zip
                          com HTML, CSS, JS e assets. Hospedamos
                          automaticamente.
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2A: Builder Form */}
          {mode === 'builder' && (
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="h-0.5 w-full bg-[#4F46E5]" />
              <div className="p-8">
                <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-2">
                  Passo 2 de 2 · Construtor Visual
                </p>
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                  Configurações básicas
                </h1>
                <p className="text-sm text-gray-400 mb-8">
                  Defina o nome e endereço da sua nova página.
                </p>

                <form onSubmit={handleBuilderSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2"
                    >
                      Título da Página <span className="text-[#4F46E5]">*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="Ex: Consultoria Trabalhista"
                      value={title}
                      onChange={handleTitleChange}
                      required
                      className="w-full h-11 px-4 text-sm text-gray-900 bg-white border border-gray-200 focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/10 transition-all placeholder:text-gray-300 font-medium"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="slug"
                      className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2"
                    >
                      URL (Slug) <span className="text-[#4F46E5]">*</span>
                    </label>
                    <div className="flex items-stretch border border-gray-200 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/10 transition-all">
                      <span className="flex items-center px-4 bg-gray-50 border-r border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
                        /lp/
                      </span>
                      <input
                        id="slug"
                        type="text"
                        placeholder="consultoria-trabalhista"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                        className="flex-1 h-11 px-4 text-sm text-gray-900 bg-white focus:outline-none placeholder:text-gray-300 font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      Este será o endereço público da sua página.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setMode(null)}
                      className="h-10 px-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-700 transition-all cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !title || !slug}
                      className="group flex items-center gap-2 h-10 px-6 text-[10px] font-bold uppercase tracking-widest text-white bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-[0_4px_12px_rgba(79,70,229,0.35)] cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        <>
                          <Rocket className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
                          Criar e Editar
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Step 2B: Custom LP Form */}
          {mode === 'custom' && (
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="h-0.5 w-full bg-emerald-500" />
              <div className="p-8">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">
                  Passo 2 de 2 · Upload Personalizado
                </p>
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                  Envie sua Landing Page
                </h1>
                <p className="text-sm text-gray-400 mb-8">
                  Defina o nome, URL e faça o upload do arquivo .zip da sua
                  página.
                </p>

                <form onSubmit={handleCustomSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="custom-title"
                      className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2"
                    >
                      Título da Página{' '}
                      <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      id="custom-title"
                      type="text"
                      placeholder="Ex: Consultoria Trabalhista"
                      value={title}
                      onChange={handleTitleChange}
                      required
                      className="w-full h-11 px-4 text-sm text-gray-900 bg-white border border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-gray-300 font-medium"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="custom-slug"
                      className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2"
                    >
                      URL (Slug) <span className="text-emerald-500">*</span>
                    </label>
                    <div className="flex items-stretch border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
                      <span className="flex items-center px-4 bg-gray-50 border-r border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
                        /lp/
                      </span>
                      <input
                        id="custom-slug"
                        type="text"
                        placeholder="consultoria-trabalhista"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                        className="flex-1 h-11 px-4 text-sm text-gray-900 bg-white focus:outline-none placeholder:text-gray-300 font-medium"
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Arquivo ZIP <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".zip"
                      onChange={(e) => {
                        const selected = e.target.files?.[0] || null
                        if (selected && selected.size > 5 * 1024 * 1024) {
                          toast.error('O arquivo deve ter no máximo 5MB.')
                          return
                        }
                        setFile(selected)
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-24 border-2 border-dashed border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group"
                    >
                      {file ? (
                        <>
                          <FileArchive className="w-6 h-6 text-emerald-500" />
                          <p className="text-xs font-bold text-emerald-700">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB · Clique
                            para trocar
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-gray-300 group-hover:text-emerald-400 transition-colors" />
                          <p className="text-xs font-semibold text-gray-400 group-hover:text-emerald-600 transition-colors">
                            Clique para selecionar o arquivo .zip
                          </p>
                          <p className="text-[10px] text-gray-300">
                            Máximo 50MB
                          </p>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setMode(null)}
                      className="h-10 px-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-700 transition-all cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !title || !slug || !file}
                      className="group flex items-center gap-2 h-10 px-6 text-[10px] font-bold uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-[0_4px_12px_rgba(5,150,105,0.35)] cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Enviando ZIP...
                        </>
                      ) : (
                        <>
                          <Upload className="h-3.5 w-3.5" />
                          Criar e Publicar
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
