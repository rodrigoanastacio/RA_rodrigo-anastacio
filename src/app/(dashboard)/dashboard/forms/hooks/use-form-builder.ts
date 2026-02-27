'use client'

import { FormSchema } from '@/components/forms/types'
import { useFormBuilderNavigation } from './use-form-builder-navigation'
import { useFormSchemaEditor } from './use-form-schema-editor'

export function useFormBuilder(
  formId: string,
  initialSchema: FormSchema,
  initialPublished: boolean
) {
  const navigation = useFormBuilderNavigation()

  const editor = useFormSchemaEditor(
    formId,
    initialSchema,
    initialPublished,
    navigation.activeStepIndex,
    navigation.selectedField,
    navigation.setSelectedField,
    navigation.setActiveStepIndex
  )

  return {
    ...navigation,
    ...editor,
    activeStep: editor.schema.steps[navigation.activeStepIndex]
  }
}
