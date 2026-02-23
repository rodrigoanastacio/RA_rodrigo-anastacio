import { formsService } from '@/shared/services/forms/forms.service'
import { notFound } from 'next/navigation'
import { FormBuilder } from '../../components/builder/form-builder'

interface BuilderPageProps {
  params: Promise<{ id: string }>
}

export default async function FormBuilderPage({ params }: BuilderPageProps) {
  const { id } = await params
  let form

  try {
    form = await formsService.getFormById(id)
  } catch (error) {
    console.error('[Form Builder Page]:', error)
    notFound()
  }

  if (!form) {
    notFound()
  }

  return (
    <div className="h-full animate-in fade-in duration-700">
      <FormBuilder formId={id} initialData={form} />
    </div>
  )
}
