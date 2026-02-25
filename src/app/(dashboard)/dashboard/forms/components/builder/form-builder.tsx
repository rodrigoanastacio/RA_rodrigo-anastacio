'use client'

import { FormSchema } from '@/components/forms/types'
import { useFormBuilder } from '../../hooks/use-form-builder'
import { BuilderHeader } from './builder-header'
import { FieldSettings } from './field-settings'
import { FormEditorContent } from './form-editor-content'
import { FormPreview } from './form-preview'

interface FormBuilderProps {
  formId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any
}

export function FormBuilder({ formId, initialData }: FormBuilderProps) {
  const {
    schema,
    setSchema,
    isSaving,
    previewMode,
    setPreviewMode,
    activeTab,
    setActiveTab,
    selectedField,
    setSelectedField,
    activeStepIndex,
    setActiveStepIndex,
    activeFieldData,
    handleSave,
    addField,
    addStep,
    removeStep,
    removeField,
    updateField
  } = useFormBuilder(formId, initialData.schema as FormSchema)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <BuilderHeader
        schema={schema}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="flex flex-1 overflow-hidden">
        {activeTab === 'editor' ? (
          <>
            <FormEditorContent
              schema={schema}
              activeStepIndex={activeStepIndex}
              selectedField={selectedField}
              setActiveStepIndex={setActiveStepIndex}
              setSelectedField={setSelectedField}
              addField={addField}
              removeField={removeField}
              addStep={addStep}
              removeStep={removeStep}
            />

            <FieldSettings
              schema={schema}
              setSchema={setSchema}
              activeStepIndex={activeStepIndex}
              activeFieldData={activeFieldData}
              setSelectedField={setSelectedField}
              updateField={updateField}
            />
          </>
        ) : (
          <FormPreview
            schema={schema}
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            activeStepIndex={activeStepIndex}
            setActiveStepIndex={setActiveStepIndex}
          />
        )}
      </div>
    </div>
  )
}
