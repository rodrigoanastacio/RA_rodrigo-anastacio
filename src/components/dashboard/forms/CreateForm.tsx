'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { formsService } from '@/services/forms/forms.service'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function CreateForm() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

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

    setIsSaving(true)
    try {
      const newForm = await formsService.create({
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

      toast.success('Capítulo inicial criado!')
      router.push(`/dashboard/forms/${newForm.id}/builder`)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar formulário.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-lg shadow-xl rounded-[24px] border-gray-100 overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-extrabold text-[#111827]">
            Novo Formulário
          </CardTitle>
          <CardDescription className="text-gray-500 font-medium leading-relaxed">
            Comece definindo as informações básicas. Você poderá construir os
            campos na próxima etapa.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-bold text-gray-700 uppercase tracking-wider"
              >
                Nome do Formulário <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Ex: Contato LP Vendas"
                value={name}
                onChange={handleNameChange}
                className="rounded-xl h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="slug"
                className="text-sm font-bold text-gray-700 uppercase tracking-wider"
              >
                Slug Identificador <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                placeholder="contato-lp-vendas"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="rounded-xl h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                required
              />
              <p className="text-[11px] text-gray-400 font-medium">
                Identificador único para usar no código ou URL.
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-bold text-gray-700 uppercase tracking-wider"
              >
                Descrição (Interna)
              </Label>
              <Textarea
                id="description"
                placeholder="Ex: Captura contatos rápidos para a Landing Page de vendas do SaaS."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl min-h-[100px] border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
              />
            </div>
          </CardContent>
          <CardFooter className="p-8 border-t border-gray-50 bg-gray-50/30 flex justify-between gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-500 font-bold uppercase tracking-widest text-[11px] hover:bg-white active:scale-95"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl h-12 px-8 font-extrabold shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                'Próximo: Construir Campos'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
