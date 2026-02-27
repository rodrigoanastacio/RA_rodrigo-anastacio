export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'

export interface FieldOption {
  label: string
  value: string
}

export interface FormField {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: FieldOption[] // For select/radio
  helperText?: string
  defaultValue?: string | number | boolean
  validation?: {
    min?: number
    max?: number
    regex?: string
    message?: string
  }
}

export interface FormStep {
  id: string
  title?: string
  description?: string
  fields: FormField[]
}

export interface FormSchema {
  id: string
  name: string
  description?: string
  display_type: 'single' | 'wizard'
  steps: FormStep[]
  submit_label?: string
}

export interface DynamicFormProps {
  schema: FormSchema
  onSubmit: (data: Record<string, unknown>) => Promise<void>
  defaultValues?: Record<string, unknown>
  className?: string
  hideTitle?: boolean
}
