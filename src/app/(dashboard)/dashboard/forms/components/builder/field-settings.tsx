'use client'

import { FormField, FormSchema } from '@/components/forms/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'
import {
  FormInput,
  Info,
  Layers,
  List,
  Plus,
  Settings2,
  Trash2,
  X
} from 'lucide-react'

interface FieldSettingsProps {
  schema: FormSchema
  setSchema: React.Dispatch<React.SetStateAction<FormSchema>>
  activeStepIndex: number
  activeFieldData: FormField | undefined
  setSelectedField: (field: string | null) => void
  updateField: (fieldName: string, updates: Partial<FormField>) => void
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
      {children}
    </p>
  )
}

function SharpInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className={cn(
        'h-9 rounded-none border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#4F46E5]/40 transition-all text-sm',
        props.className
      )}
    />
  )
}

export function FieldSettings({
  schema,
  setSchema,
  activeStepIndex,
  activeFieldData,
  setSelectedField,
  updateField
}: FieldSettingsProps) {
  const activeStep = schema.steps[activeStepIndex]

  return (
    <div className="w-72 border-l border-gray-100 bg-white flex flex-col overflow-hidden shrink-0 [&_input]:rounded-none">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 flex items-center justify-center">
              {activeFieldData ? (
                <FormInput className="w-3.5 h-3.5 text-white" />
              ) : (
                <Layers className="w-3.5 h-3.5 text-white" />
              )}
            </div>
            <span className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
              {activeFieldData ? 'Propriedades' : 'Configurações'}
            </span>
          </div>
          {activeFieldData && (
            <button
              onClick={() => setSelectedField(null)}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!activeFieldData ? (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div>
              <div className="space-y-3">
                <SectionHeader
                  icon={<Settings2 className="w-3 h-3" />}
                  label="Etapa Atual"
                />
                <div className="space-y-3">
                  <div>
                    <SectionLabel>Título</SectionLabel>
                    <SharpInput
                      value={activeStep.title || ''}
                      onChange={(e) => {
                        const newSteps = [...schema.steps]
                        newSteps[activeStepIndex] = {
                          ...activeStep,
                          title: e.target.value
                        }
                        setSchema((prev) => ({ ...prev, steps: newSteps }))
                      }}
                      placeholder="Insira o título"
                    />
                  </div>
                  <div>
                    <SectionLabel>Descrição</SectionLabel>
                    <SharpInput
                      value={activeStep.description || ''}
                      onChange={(e) => {
                        const newSteps = [...schema.steps]
                        newSteps[activeStepIndex] = {
                          ...activeStep,
                          description: e.target.value
                        }
                        setSchema((prev) => ({ ...prev, steps: newSteps }))
                      }}
                      placeholder="Insira a descrição"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Global settings */}
            <div>
              <div className="space-y-3">
                <SectionHeader
                  icon={<List className="w-3 h-3" />}
                  label="Configurações Globais"
                />
                <div className="space-y-3">
                  <div>
                    <SectionLabel>Texto do Botão Final</SectionLabel>
                    <SharpInput
                      value={schema.submit_label || ''}
                      onChange={(e) =>
                        setSchema((prev) => ({
                          ...prev,
                          submit_label: e.target.value
                        }))
                      }
                      placeholder="Insira o texto"
                    />
                  </div>

                  {/* Display type toggle */}
                  <div>
                    <SectionLabel>Tipo de Exibição</SectionLabel>
                    <div className="flex border border-gray-200 overflow-hidden h-9">
                      <button
                        onClick={() =>
                          setSchema((prev) => ({
                            ...prev,
                            display_type: 'single'
                          }))
                        }
                        className={cn(
                          'flex-1 text-[10px] font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer',
                          schema.display_type === 'single'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-400 hover:bg-gray-50'
                        )}
                      >
                        Simples
                      </button>
                      <div className="w-px bg-gray-200" />
                      <button
                        onClick={() =>
                          setSchema((prev) => ({
                            ...prev,
                            display_type: 'wizard'
                          }))
                        }
                        className={cn(
                          'flex-1 text-[10px] font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer',
                          schema.display_type === 'wizard'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-400 hover:bg-gray-50'
                        )}
                      >
                        Multi Etapas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-extrabold text-[#4F46E5] border border-[#4F46E5]/30 bg-[#4F46E5]/06 px-2 py-1 uppercase tracking-widest">
                {activeFieldData.type}
              </span>
              <span className="text-xs text-gray-400 font-mono truncate">
                {activeFieldData.name}
              </span>
            </div>

            <div>
              <SectionLabel>Rótulo (Label)</SectionLabel>
              <SharpInput
                value={activeFieldData.label}
                onChange={(e) =>
                  updateField(activeFieldData.name, { label: e.target.value })
                }
              />
            </div>

            <div>
              <SectionLabel>Placeholder</SectionLabel>
              <SharpInput
                value={activeFieldData.placeholder || ''}
                onChange={(e) =>
                  updateField(activeFieldData.name, {
                    placeholder: e.target.value
                  })
                }
              />
            </div>

            <div>
              <SectionLabel>Texto de Ajuda</SectionLabel>
              <SharpInput
                value={activeFieldData.helperText || ''}
                onChange={(e) =>
                  updateField(activeFieldData.name, {
                    helperText: e.target.value
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between border border-gray-100 px-3 py-2.5 bg-gray-50/50">
              <div>
                <Label className="text-xs font-bold text-gray-700 cursor-pointer">
                  Obrigatório
                </Label>
                <p className="text-[10px] text-gray-400">
                  Torna o preenchimento obrigatório
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateField(activeFieldData.name, {
                    required: !activeFieldData.required
                  })
                }
                className={cn(
                  'relative inline-flex h-5 w-9 shrink-0 cursor-pointer border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                  activeFieldData.required ? 'bg-[#4F46E5]' : 'bg-gray-200'
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-4 w-4 transform bg-white shadow ring-0 transition duration-200 ease-in-out',
                    activeFieldData.required ? 'translate-x-4' : 'translate-x-0'
                  )}
                />
              </button>
            </div>

            {activeFieldData.type === 'select' && (
              <div className="space-y-2 pt-3 border-t border-gray-100">
                <div className="space-y-3">
                  <SectionHeader
                    icon={<List className="w-3 h-3" />}
                    label="Opções do Menu"
                  />
                  <div className="space-y-1.5">
                    {(activeFieldData.options || []).map((opt, idx) => (
                      <div key={idx} className="flex gap-1.5">
                        <input
                          value={opt.label}
                          onChange={(e) => {
                            const newOpts = [...(activeFieldData.options || [])]
                            newOpts[idx] = {
                              ...opt,
                              label: e.target.value,
                              value: e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, '_')
                            }
                            updateField(activeFieldData.name, {
                              options: newOpts
                            })
                          }}
                          placeholder="Rótulo"
                          className="flex-1 h-8 px-2.5 text-xs border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#4F46E5]/40 outline-none transition-all"
                        />
                        <button
                          className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-rose-50 border border-gray-200 transition-all cursor-pointer"
                          onClick={() => {
                            const newOpts = (
                              activeFieldData.options || []
                            ).filter((_, i) => i !== idx)
                            updateField(activeFieldData.name, {
                              options: newOpts
                            })
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button
                      className="w-full h-8 flex items-center justify-center gap-1.5 border border-dashed border-gray-200 text-[10px] font-bold text-[#4F46E5] hover:bg-[#4F46E5]/04 transition-all cursor-pointer"
                      onClick={() => {
                        const newOpts = [
                          ...(activeFieldData.options || []),
                          { label: 'Nova Opção', value: 'nova_opcao' }
                        ]
                        updateField(activeFieldData.name, { options: newOpts })
                      }}
                    >
                      <Plus size={12} />
                      Adicionar Opção
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Info box */}
            <div className="border-l-2 border-[#4F46E5] bg-[#4F46E5]/04 px-3 py-2.5 flex items-start gap-2">
              <Info size={13} className="text-[#4F46E5] shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#4F46E5]/80 leading-relaxed">
                Alterações aplicadas instantaneamente. Salve ao finalizar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
