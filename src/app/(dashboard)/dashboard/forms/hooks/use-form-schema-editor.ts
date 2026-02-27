'use client'

import {
  FieldType,
  FormField,
  FormSchema,
  FormStep
} from '@/components/forms/types'
import { formSchemaValidator } from '@/lib/zod/forms/form-builder.schema'
import { FormUpdate } from '@/shared/api-handlers/forms/forms.handler'
import { useState } from 'react'
import { toast } from 'sonner'
import { togglePublishFormAction, updateFormSchemaAction } from '../actions'

export function useFormSchemaEditor(
  formId: string,
  initialSchema: FormSchema,
  initialPublished: boolean,
  activeStepIndex: number,
  selectedField: string | null,
  setSelectedField: (field: string | null) => void,
  setActiveStepIndex: (index: number) => void
) {
  const [schema, setSchema] = useState<FormSchema>(initialSchema)
  const [isPublished, setIsPublished] = useState(initialPublished)
  const [isSaving, setIsSaving] = useState(false)

  const activeFieldData = schema.steps
    .flatMap((s) => s.fields)
    .find((f) => f.name === selectedField)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const validationResult = formSchemaValidator.safeParse(schema)
      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0]
        toast.error(`Erro de validação: ${firstError.message}`)
        return
      }

      const result = await updateFormSchemaAction(
        formId,
        schema as unknown as FormUpdate['schema']
      )
      if (!result.success) throw new Error(result.error)

      toast.success('Alterações salvas com sucesso!')
    } catch {
      toast.error('Erro ao salvar formulário.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleTogglePublish = async (newStatus: boolean) => {
    setIsSaving(true)
    try {
      const result = await togglePublishFormAction(formId, newStatus)
      if (!result.success) throw new Error(result.error)
      setIsPublished(newStatus)
      toast.success(
        newStatus
          ? 'Formulário publicado com sucesso!'
          : 'Formulário desativado (Rascunho).'
      )
    } catch {
      toast.error('Erro ao alterar status do formulário.')
    } finally {
      setIsSaving(false)
    }
  }

  const addField = (type: FieldType) => {
    const newField: FormField = {
      name: `field_${Date.now()}`,
      label: `Novo Campo de ${type}`,
      type,
      required: false,
      placeholder: ''
    }
    setSchema((prev) => ({
      ...prev,
      steps: prev.steps.map((step, idx) =>
        idx === activeStepIndex
          ? { ...step, fields: [...step.fields, newField] }
          : step
      )
    }))
  }

  const addStep = () => {
    const newStep: FormStep = {
      id: crypto.randomUUID(),
      title: `Nova Etapa ${schema.steps.length + 1}`,
      fields: []
    }
    setSchema((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
      display_type: 'wizard'
    }))
    setActiveStepIndex(schema.steps.length)
  }

  const removeStep = (index: number) => {
    if (schema.steps.length <= 1) return
    setSchema((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
      display_type: prev.steps.length - 1 <= 1 ? 'single' : 'wizard'
    }))
    setActiveStepIndex(Math.max(0, index - 1))
  }

  const removeField = (fieldName: string) => {
    if (selectedField === fieldName) setSelectedField(null)
    setSchema((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => ({
        ...step,
        fields: step.fields.filter((f) => f.name !== fieldName)
      }))
    }))
  }

  const updateField = (fieldName: string, updates: Partial<FormField>) => {
    setSchema((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => ({
        ...step,
        fields: step.fields.map((f) =>
          f.name === fieldName ? { ...f, ...updates } : f
        )
      }))
    }))
  }

  return {
    schema,
    setSchema,
    isPublished,
    isSaving,
    activeFieldData,
    handleSave,
    handleTogglePublish,
    addField,
    addStep,
    removeStep,
    removeField,
    updateField
  }
}
