import { PageHeader } from '@/components/dashboard/PageHeader'
import { formsService } from '@/shared/services/forms/forms.service'
import { Calendar, FileText, FormInput, Layout, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function FormsListPage() {
  const { forms } = await formsService.getFormsSummary()

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Gestão de Formulários"
          description="Crie e gerencie formulários dinâmicos para suas Landing Pages."
        />
        <Link href="/dashboard/forms/new">
          <button className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white h-9 px-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            Novo Formulário
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.length === 0 ? (
          <div className="col-span-full py-20 bg-white border border-gray-100 flex flex-col items-center justify-center text-center">
            {/* Icon square */}
            <div className="w-12 h-12 bg-[#4F46E5]/08 border border-[#4F46E5]/20 flex items-center justify-center mb-4">
              <FormInput className="w-5 h-5 text-[#4F46E5] opacity-70" />
            </div>
            <p className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-1">
              Nenhum formulário criado
            </p>
            <p className="text-xs text-gray-400 mb-8 max-w-xs">
              Crie formulários personalizados para capturar dados dos seus
              leads.
            </p>
            <Link href="/dashboard/forms/new">
              <button className="flex items-center gap-2 border border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white h-9 px-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer">
                <Plus className="w-3.5 h-3.5" />
                Criar primeiro formulário
              </button>
            </Link>
          </div>
        ) : (
          forms.map((form) => (
            <Link key={form.id} href={`/dashboard/forms/${form.id}/builder`}>
              <div className="group bg-white border border-gray-100 hover:border-[#4F46E5]/30 hover:shadow-[0_4px_24px_rgba(79,70,229,0.06)] transition-all duration-200 cursor-pointer h-full flex flex-col justify-between overflow-hidden">
                {/* Accent line on hover */}
                <div className="h-0.5 w-0 group-hover:w-full bg-[#4F46E5] transition-all duration-300" />

                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    {/* Icon square */}
                    <div className="w-9 h-9 bg-gray-50 group-hover:bg-[#4F46E5] border border-gray-100 group-hover:border-[#4F46E5] flex items-center justify-center transition-all duration-200">
                      <FileText className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                    </div>

                    {/* Status badge */}
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 border ${
                        form.is_published
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-amber-50 text-amber-500 border-amber-100'
                      }`}
                    >
                      {form.is_published ? '● Publicado' : '○ Rascunho'}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-[#111827] mb-1.5 group-hover:text-[#4F46E5] transition-colors duration-200">
                    {form.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {form.description || 'Sem descrição.'}
                  </p>
                </div>

                <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Layout className="w-3 h-3" />
                    <span>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(form.schema as any)?.display_type === 'wizard'
                        ? 'Multi Etapas'
                        : 'Simples'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(form.updated_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
