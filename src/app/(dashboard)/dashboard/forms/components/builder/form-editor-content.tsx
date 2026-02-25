'use client'

import { FieldType, FormSchema } from '@/components/forms/types'
import { cn } from '@/lib/utils'
import {
  FormInput,
  GripVertical,
  List,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Settings,
  Trash2,
  Type,
  X
} from 'lucide-react'

interface FormEditorContentProps {
  schema: FormSchema
  activeStepIndex: number
  selectedField: string | null
  setActiveStepIndex: (index: number) => void
  setSelectedField: (field: string | null) => void
  addField: (type: FieldType) => void
  removeField: (fieldName: string) => void
  addStep: () => void
  removeStep: (index: number) => void
}

const FIELD_TYPES = [
  {
    type: 'text' as FieldType,
    label: 'Texto Curto',
    description: 'Nome, sobrenome, etc.',
    icon: Type
  },
  {
    type: 'email' as FieldType,
    label: 'E-mail',
    description: 'Endereço de e-mail',
    icon: Mail
  },
  {
    type: 'tel' as FieldType,
    label: 'WhatsApp',
    description: 'Número de telefone',
    icon: Phone
  },
  {
    type: 'textarea' as FieldType,
    label: 'Texto Longo',
    description: 'Comentários & mensagens',
    icon: MessageSquare
  },
  {
    type: 'select' as FieldType,
    label: 'Seleção',
    description: 'Lista de opções',
    icon: List
  }
]

export function FormEditorContent({
  schema,
  activeStepIndex,
  selectedField,
  setActiveStepIndex,
  setSelectedField,
  addField,
  removeField,
  addStep,
  removeStep
}: FormEditorContentProps) {
  const activeStep = schema.steps[activeStepIndex]

  return (
    <>
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col z-20 h-full">
        {/* Header — identical to SidebarDraggable */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#4F46E5] flex items-center justify-center">
              <FormInput className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h2 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
                Elementos
              </h2>
              <p className="text-[10px] text-gray-400 font-medium">
                Campos disponíveis
              </p>
            </div>
          </div>
        </div>

        {/* Field list — identical pattern to SidebarDraggable */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2">
          <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-[0.15em] px-1 mb-3">
            Campos
          </p>

          {FIELD_TYPES.map(({ type, label, description, icon: Icon }) => (
            <button
              key={type}
              onClick={() => addField(type)}
              className="group w-full flex items-center gap-3 p-3 border border-gray-100 bg-white hover:border-[#4F46E5]/40 hover:bg-[#4F46E5]/3 transition-all duration-200 active:scale-[0.98] cursor-pointer text-left"
            >
              <div className="w-8 h-8 bg-gray-50 group-hover:bg-[#4F46E5] flex items-center justify-center transition-colors duration-200 shrink-0">
                <Icon
                  size={15}
                  className="text-gray-400 group-hover:text-white transition-colors duration-200"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-800 group-hover:text-[#4F46E5] transition-colors duration-200 leading-tight">
                  {label}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint — identical to SidebarDraggable */}
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-[9px] text-gray-300 font-medium text-center uppercase tracking-wider">
            Clique para adicionar
          </p>
        </div>
      </div>

      <div className="flex-1 bg-[#f8f9fa] overflow-y-auto">
        <div
          className="min-h-full px-10 py-8"
          style={{
            backgroundImage:
              'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-end gap-0 mb-6">
              {schema.steps.map((step, index) => (
                <div key={step.id} className="flex items-end group relative">
                  <button
                    onClick={() => {
                      setActiveStepIndex(index)
                      setSelectedField(null)
                    }}
                    className={cn(
                      'relative px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-150 border-b-2 whitespace-nowrap cursor-pointer',
                      activeStepIndex === index
                        ? 'bg-white text-[#4F46E5] border-[#4F46E5] shadow-[0_-1px_0_0_#fff]'
                        : 'bg-transparent text-gray-400 border-transparent hover:text-gray-600 hover:bg-white/50'
                    )}
                  >
                    <span className="text-gray-300 mr-1.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step.title || 'Sem título'}
                  </button>

                  {schema.steps.length > 1 && (
                    <button
                      onClick={() => removeStep(index)}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white items-center justify-center hidden group-hover:flex transition-all cursor-pointer z-10"
                    >
                      <X size={10} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addStep}
                className="flex items-center gap-1 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#4F46E5] hover:bg-white/60 border-b-2 border-transparent transition-all duration-150 cursor-pointer"
              >
                <Plus size={12} />
                Passo
              </button>
            </div>

            <div className="space-y-2">
              {activeStep.fields.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 p-16 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-[#4F46E5]/8 border border-[#4F46E5]/20 flex items-center justify-center mb-3">
                    <Plus size={20} className="text-[#4F46E5] opacity-60" />
                  </div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Adicione seu primeiro campo
                  </p>
                  <p className="text-[10px] text-gray-300 mt-1">
                    Selecione um elemento na barra lateral
                  </p>
                </div>
              ) : (
                schema.steps[activeStepIndex].fields.map((field) => (
                  <div
                    key={field.name}
                    onClick={() => setSelectedField(field.name)}
                    className={cn(
                      'group relative bg-white border transition-all duration-150 p-5 cursor-pointer',
                      selectedField === field.name
                        ? 'border-[#4F46E5] outline-2 outline-[#4F46E5]/20 shadow-[4px_4px_0px_rgba(79,70,229,0.10)]'
                        : 'border-gray-100 hover:border-[#4F46E5]/40 hover:shadow-[2px_2px_0px_rgba(79,70,229,0.06)]'
                    )}
                  >
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-200 group-hover:text-[#4F46E5]/30 transition-colors cursor-grab active:cursor-grabbing">
                      <GripVertical size={18} />
                    </div>

                    <div className="ml-5 flex items-center justify-between gap-3">
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-extrabold text-[#4F46E5] uppercase tracking-widest">
                            {field.type}
                          </span>
                          {field.required && (
                            <span className="bg-rose-50 text-rose-500 border border-rose-100 text-[8px] font-extrabold px-1.5 py-0.5 uppercase tracking-widest">
                              Obrigatório
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-[#111827] truncate">
                          {field.label}
                        </span>
                        {field.placeholder && (
                          <span className="text-[10px] text-gray-400 italic truncate">
                            {field.placeholder}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          className={cn(
                            'w-7 h-7 flex items-center justify-center transition-colors cursor-pointer',
                            selectedField === field.name
                              ? 'bg-[#4F46E5] text-white'
                              : 'text-gray-300 hover:text-[#4F46E5] hover:bg-[#4F46E5]/8'
                          )}
                          aria-label="Configurar campo"
                        >
                          <Settings size={14} />
                        </button>
                        <button
                          className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeField(field.name)
                          }}
                          aria-label="Remover campo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
