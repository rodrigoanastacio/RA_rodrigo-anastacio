'use server'

import {
  FormInsert,
  FormUpdate
} from '@/shared/api-handlers/forms/forms.handler'
import { formsService } from '@/shared/services/forms/forms.service'
import { revalidatePath } from 'next/cache'

export async function updateFormSchemaAction(
  formId: string,
  schema: FormUpdate['schema']
) {
  try {
    await formsService.updateFormSchema(formId, schema)
    revalidatePath(`/dashboard/forms/${formId}/builder`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Falha ao atualizar o formulário' }
  }
}

export async function togglePublishFormAction(id: string, published: boolean) {
  try {
    await formsService.updateForm(id, { is_published: published })
    revalidatePath(`/dashboard/forms/${id}/builder`)
    revalidatePath('/dashboard/forms')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Falha ao alterar status de publicação' }
  }
}

export async function createFormAction(data: Omit<FormInsert, 'tenant_id'>) {
  try {
    const newForm = await formsService.createForm(data)
    revalidatePath('/dashboard/forms')
    return { success: true, form: newForm }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Falha ao criar o formulário' }
  }
}
