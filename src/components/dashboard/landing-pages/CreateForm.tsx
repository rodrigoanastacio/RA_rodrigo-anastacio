'use client'

import { useLandingPage } from '@/hooks/useLandingPage'
import { ArrowLeft, Globe, Loader2, Rocket, Sparkles, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function CreateLandingPageForm() {
  const router = useRouter()
  const { create, isSaving } = useLandingPage()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title || !slug) {
      toast.error('Preencha os campos obrigatórios.')
      return
    }

    const result = await create({ title, slug })

    if (result.success && result.id) {
      toast.success('Landing Page criada com sucesso!')
      router.push(`/dashboard/landing-pages/${result.id}/edition`)
    } else {
      toast.error(result.message || 'Erro ao criar página.')
    }
  }

  const previewUrl = slug ? `/lp/${slug}` : '/lp/sua-pagina'

  return (
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
      {/* Left Panel — Context */}
      <div className="hidden lg:flex flex-col justify-between w-80 xl:w-96 bg-[#111827] p-10 shrink-0">
        {/* Top */}
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
            Defina o título e a URL da sua página. Você poderá personalizar o
            conteúdo completo no editor visual.
          </p>

          {/* Divider */}
          <div className="my-8 border-t border-white/8" />

          {/* Features */}
          <ul className="space-y-4">
            {[
              {
                icon: Sparkles,
                label: 'Editor visual completo',
                desc: 'Arraste, solte e personalize'
              },
              {
                icon: Zap,
                label: 'Formulários integrados',
                desc: 'Capture leads automaticamente'
              },
              {
                icon: Rocket,
                label: 'Publicação instantânea',
                desc: 'Sua página no ar em segundos'
              }
            ].map(({ icon: Icon, label, desc }) => (
              <li key={label} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#4F46E5]/15 flex items-center justify-center mt-0.5 shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#4F46E5]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{label}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* URL Preview */}
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

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#f9fafb]">
        <div className="w-full max-w-lg">
          {/* Back link */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 mb-8 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
            Voltar
          </button>

          {/* Form card */}
          <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            {/* Card accent */}
            <div className="h-0.5 w-full bg-[#4F46E5]" />

            <div className="p-8">
              <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-2">
                Passo 1 de 2
              </p>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                Configurações básicas
              </h1>
              <p className="text-sm text-gray-400 mb-8">
                Defina o nome e endereço da sua nova página para começar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title field */}
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

                {/* Slug field */}
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

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="h-10 px-5 text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-700 transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || !title || !slug}
                    className="group flex items-center gap-2 h-10 px-6 text-[10px] font-bold uppercase tracking-widest text-white bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all hover:shadow-[0_4px_12px_rgba(79,70,229,0.35)] cursor-pointer"
                  >
                    {isSaving ? (
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
        </div>
      </div>
    </div>
  )
}
