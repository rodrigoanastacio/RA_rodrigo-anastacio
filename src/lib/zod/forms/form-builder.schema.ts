import { z } from 'zod'

export const formFieldSchema = z.object({
  name: z.string().min(1, 'Nome do campo é obrigatório'),
  label: z.string().optional(),
  type: z.enum([
    'text',
    'email',
    'tel',
    'textarea',
    'select',
    'checkbox',
    'radio'
  ]),
  placeholder: z.string().optional(),
  helperText: z.string().optional(),
  required: z.boolean().default(false),
  options: z
    .array(
      z.object({
        label: z.string(),
        value: z.string()
      })
    )
    .optional(),
  validation: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      pattern: z.string().optional()
    })
    .optional()
})

export const formStepSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  fields: z.array(formFieldSchema).min(1, 'Adicione pelo menos um campo')
})

export const formSchemaValidator = z.object({
  display_type: z.enum(['wizard', 'single']).default('wizard'),
  steps: z.array(formStepSchema).min(1, 'Adicione pelo menos uma etapa')
})

export const createFormSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
  schema: formSchemaValidator,
  is_published: z.boolean().default(false)
})

export const updateFormSchema = createFormSchema.partial()

export type FormFieldData = z.infer<typeof formFieldSchema>
export type FormStepData = z.infer<typeof formStepSchema>
export type FormSchemaData = z.infer<typeof formSchemaValidator>
export type CreateFormData = z.infer<typeof createFormSchema>
export type UpdateFormData = z.infer<typeof updateFormSchema>
