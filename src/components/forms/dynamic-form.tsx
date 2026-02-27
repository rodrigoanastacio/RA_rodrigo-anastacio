'use client'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import PhoneInput from 'react-phone-number-input/input'
import { generateZodSchema } from './builder/schema-generator'
import { DynamicFormProps, FormField } from './types'

export function DynamicForm({
  schema,
  onSubmit,
  defaultValues,
  className,
  hideTitle
}: DynamicFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const isWizard = schema.display_type === 'wizard'

  const zodSchema = useMemo(() => generateZodSchema(schema), [schema])

  const methods = useForm<Record<string, unknown>>({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultValues || {},
    mode: 'onBlur'
  })

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting }
  } = methods

  const steps = schema.steps || []
  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const handleNext = async () => {
    const fieldsToValidate = currentStepData.fields.map((f) => f.name)
    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onFormSubmit: SubmitHandler<Record<string, unknown>> = async (data) => {
    await onSubmit(data)
  }

  const renderField = (field: FormField) => {
    const error = errors[field.name]?.message as string | undefined

    return (
      <div key={field.name} className="flex flex-col gap-2 w-full">
        {field.type !== 'checkbox' && (
          <label className="text-sm font-semibold text-gray-700">
            {field.label}
            {field.required && <span className="text-blue-500 ml-1">*</span>}
          </label>
        )}

        {field.type === 'textarea' ? (
          <textarea
            {...register(field.name)}
            placeholder={field.placeholder}
            className={cn(
              'form-textarea w-full rounded-lg border bg-white h-24 px-3 py-2 text-sm transition-colors',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
            )}
          />
        ) : field.type === 'select' ? (
          <select
            {...register(field.name)}
            className={cn(
              'form-select w-full rounded-lg border bg-white h-12 px-3 text-sm transition-colors',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
            )}
          >
            <option value="">{field.placeholder || 'Selecione...'}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === 'tel' ? (
          <Controller
            name={field.name}
            control={methods.control}
            render={({ field: controllerField }) => (
              <PhoneInput
                country="BR"
                className={cn(
                  'form-input w-full rounded-lg border bg-white h-12 px-3 text-sm transition-colors',
                  error
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                )}
                placeholder={field.placeholder}
                value={controllerField.value as string | undefined}
                onChange={controllerField.onChange}
              />
            )}
          />
        ) : field.type === 'checkbox' ? (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register(field.name)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        ) : (
          <input
            {...register(field.name)}
            type={field.type}
            placeholder={field.placeholder}
            className={cn(
              'form-input w-full rounded-lg border bg-white h-12 px-3 text-sm transition-colors',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
            )}
          />
        )}

        {error && <span className="text-red-500 text-xs">{error}</span>}
        {field.helperText && !error && (
          <span className="text-gray-400 text-xs">{field.helperText}</span>
        )}
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn('flex flex-col w-full', className)}
      >
        {isWizard ? (
          // Wizard Layout
          <div className="flex flex-col gap-6">
            {/* Progress Bar (Optional) */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`
                }}
              />
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                {currentStepData.title || `Passo ${currentStep + 1}`}
              </h3>
              {currentStepData.description && (
                <p className="text-sm text-gray-500">
                  {currentStepData.description}
                </p>
              )}
            </div>

            <div className="grid gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {currentStepData.fields.map(renderField)}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
              ) : (
                <div /> // Spacer
              )}

              {isLastStep ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-green-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      {schema.submit_label || 'Enviar'}
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          // Single Page Layout
          <div className="flex flex-col gap-6">
            {steps.map((step) => (
              <div key={step.id} className="grid gap-4">
                {!hideTitle && step.title && (
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-2">
                    {step.title}
                  </h3>
                )}
                {step.fields.map(renderField)}
              </div>
            ))}

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-bold shadow-lg shadow-blue-600/20 transition-all w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    {schema.submit_label || 'Enviar Formulário'}
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  )
}
