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
import { useLandingPage } from '@/hooks/useLandingPage'
import { Loader2 } from 'lucide-react'
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

    const result = await create({
      title,
      slug
    })

    if (result.success && result.id) {
      toast.success('Landing Page criada com sucesso!')
      router.push(`/dashboard/landing-pages/${result.id}/edition`)
    } else {
      toast.error(result.message || 'Erro ao criar página.')
    }
  }

  return (
    <div className="flex justify-center items-center p-6 h-full">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Nova Landing Page</CardTitle>
          <CardDescription>
            Defina o nome e endereço da sua nova página para começar.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Título da Página <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Ex: Consultoria Trabalhista"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                URL (Slug) <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
                  /lp/
                </span>
                <Input
                  id="slug"
                  placeholder="consultoria-trabalhista"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Este será o endereço público da sua página.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6 bg-gray-50/50 rounded-b-lg">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar e Editar'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
