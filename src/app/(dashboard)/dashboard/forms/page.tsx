import { PageHeader } from '@/components/dashboard/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl h-11 px-6 font-bold shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4 mr-2" />
            Novo Formulário
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-400 bg-white border border-gray-100 rounded-[24px]">
            <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <FormInput className="w-8 h-8" />
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">
              Nenhum formulário criado
            </p>
            <p className="text-sm mb-8">
              Crie formulários personalizados para capturar dados dos seus
              leads.
            </p>
            <Link href="/dashboard/forms/new">
              <Button
                variant="outline"
                className="rounded-xl border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200"
              >
                Criar primeiro formulário
              </Button>
            </Link>
          </div>
        ) : (
          forms.map((form) => (
            <Link key={form.id} href={`/dashboard/forms/${form.id}/builder`}>
              <div className="group bg-white p-6 border border-gray-100 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <Badge
                      variant={form.is_published ? 'default' : 'secondary'}
                      className={
                        form.is_published
                          ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-100'
                          : ''
                      }
                    >
                      {form.is_published ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#111827] mb-2 group-hover:text-blue-600 transition-colors">
                    {form.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {form.description || 'Sem descrição.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Layout className="w-3.5 h-3.5" />
                    <span>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(form.schema as any)?.display_type === 'wizard'
                        ? 'Multi Etapas'
                        : 'Simples'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
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
