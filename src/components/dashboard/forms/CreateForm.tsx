'use client'

import { useCreateForm } from '@/app/(dashboard)/dashboard/forms/hooks/use-create-form'
import {
  ArrowLeft,
  ClipboardList,
  Loader2,
  Rocket,
  Sparkles,
  Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function CreateForm() {
  const router = useRouter()
  const { create, isSaving } = useCreateForm()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value
    setName(newName)
    const newSlug = newName
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
    if (!name || !slug) {
      toast.error('Preencha os campos obrigatórios.')
      return
    }
    await create({
      name,
      slug,
      description,
      schema: {
        id: crypto.randomUUID(),
        name,
        display_type: 'single',
        steps: [
          {
            id: crypto.randomUUID(),
            title: 'Informações de Contato',
            fields: []
          }
        ]
      }
    })
  }

  const previewSlug = slug ? `form/${slug}` : 'form/seu-formulario'

  return (
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
      <div className="hidden lg:flex flex-col justify-between w-80 xl:w-96 bg-[#111827] p-10 shrink-0">
        <div>
          <div className="w-10 h-10 bg-[#4F46E5] flex items-center justify-center mb-8">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>

          <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-3">
            Novo Formulário
          </p>
          <h2 className="text-2xl font-extrabold text-white leading-tight mb-4">
            Capture leads com formulários inteligentes
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Defina o nome e o identificador do seu formulário. Você construirá
            os campos no próximo passo.
          </p>

          <div className="my-8 border-t border-white/8" />

          <ul className="space-y-4">
            {[
              {
                icon: Sparkles,
                label: 'Campos personalizáveis',
                desc: 'Texto, e-mail, WhatsApp, seleção e mais'
              },
              {
                icon: Zap,
                label: 'Multi-etapas (Wizard)',
                desc: 'Divida em passos para maior conversão'
              },
              {
                icon: Rocket,
                label: 'Integrado às Landing Pages',
                desc: 'Associe a qualquer página criada'
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

        {slug && (
          <div className="bg-white/5 border border-white/10 p-4">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Identificador
            </p>
            <p className="font-mono text-xs text-[#4F46E5] break-all">
              {previewSlug}
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[#f9fafb]">
        <div className="w-full max-w-lg">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 mb-8 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
            Voltar
          </button>

          <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="h-0.5 w-full bg-[#4F46E5]" />

            <div className="p-8">
              <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-2">
                Passo 1 de 2
              </p>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                Informações básicas
              </h1>
              <p className="text-sm text-gray-400 mb-8">
                Defina o nome e o slug do seu novo formulário para começar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2"
                  >
                    Nome do Formulário <span className="text-[#4F46E5]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ex: Contato LP Vendas"
                    value={name}
                    onChange={handleNameChange}
                    required
                    className="w-full h-11 px-4 text-sm text-gray-900 bg-white border border-gray-200 focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/10 transition-all placeholder:text-gray-300 font-medium"
                  />
                </div>

                <div>
                  <label
                    htmlFor="slug"
                    className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2"
                  >
                    Slug Identificador <span className="text-[#4F46E5]">*</span>
                  </label>
                  <div className="flex items-stretch border border-gray-200 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/10 transition-all">
                    <span className="flex items-center px-4 bg-gray-50 border-r border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0 font-mono">
                      form/
                    </span>
                    <input
                      id="slug"
                      type="text"
                      placeholder="contato-lp-vendas"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                      className="flex-1 h-11 px-4 text-sm text-gray-900 bg-white focus:outline-none placeholder:text-gray-300 font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5">
                    Identificador único para usar no código ou URL.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2"
                  >
                    Descrição Interna{' '}
                    <span className="text-gray-300 normal-case tracking-normal font-medium">
                      (opcional)
                    </span>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Ex: Captura contatos para a LP de vendas do SaaS."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/10 transition-all placeholder:text-gray-300 font-medium resize-none"
                  />
                </div>

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
                    disabled={isSaving || !name || !slug}
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
                        Criar e Construir
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
