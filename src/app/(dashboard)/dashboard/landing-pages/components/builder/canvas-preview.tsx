import {
  LPSection,
  SectionRenderer
} from '@/components/lp-renderer/SectionRenderer'
import { cn } from '@/lib/utils'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, MousePointer2, Plus, Trash2 } from 'lucide-react'

import { FormSchema } from '@/components/forms/types'

interface CanvasPreviewProps {
  sections: LPSection[]
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  deleteSection: (id: string) => void
  handleDragEnd: (event: DragEndEvent) => void
  onAddHero: () => void
  activeForm?: FormSchema
  branding?: {
    businessName?: string
    businessSlogan?: string
    whatsappNumber?: string
  }
}

function SortableSection({
  section,
  isSelected,
  onClick,
  onDelete,
  activeForm,
  branding
}: {
  section: LPSection
  isSelected: boolean
  onClick: () => void
  onDelete: () => void
  activeForm?: FormSchema
  branding?: {
    businessName?: string
    businessSlogan?: string
    whatsappNumber?: string
  }
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group mb-6 transition-all duration-200',
        isSelected
          ? 'outline outline-[#4F46E5] outline-offset-4'
          : 'hover:outline hover:outline-[#4F46E5]/30 hover:outline-offset-2'
      )}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <div
        className={cn(
          'absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-[#4F46E5] text-white z-50 transition-opacity duration-200 shadow-lg',
          isSelected || isDragging
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        )}
      >
        <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border-r border-white/20">
          {section.type}
        </span>
        <div
          {...listeners}
          {...attributes}
          className="p-1.5 hover:bg-white/10 cursor-move transition-colors"
        >
          <GripVertical size={13} />
        </div>

        <div className="w-px h-4 bg-white/20" />

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-1.5 hover:bg-red-500 transition-colors cursor-pointer"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <div
        className={cn(
          'pointer-events-none select-none bg-white overflow-hidden shadow-sm',
          isDragging && 'shadow-xl scale-[1.01]'
        )}
      >
        <SectionRenderer
          section={section}
          form={activeForm}
          branding={branding}
        />
      </div>
    </div>
  )
}

export function CanvasPreview({
  sections,
  selectedId,
  setSelectedId,
  deleteSection,
  handleDragEnd,
  onAddHero,
  activeForm,
  branding
}: CanvasPreviewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#f0f2f5] relative flex flex-col"
      onClick={() => setSelectedId(null)}
    >
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="flex-1 py-12 px-8 min-h-full flex justify-center relative z-10">
        <div className="w-full max-w-4xl">
          <DndContext
            id="landing-page-builder-dnd"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                className={cn(
                  'min-h-[640px] transition-all duration-300',
                  sections.length === 0
                    ? 'flex items-center justify-center'
                    : 'space-y-6'
                )}
              >
                {sections.length === 0 ? (
                  <div className="text-center max-w-sm">
                    <div className="w-14 h-14 bg-white border border-gray-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                      <MousePointer2 size={22} className="text-[#4F46E5]" />
                    </div>

                    <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-tight mb-1">
                      Sua página está em branco
                    </h3>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                      Selecione componentes na biblioteca à esquerda para
                      começar a construir.
                    </p>

                    <button
                      onClick={onAddHero}
                      className="group inline-flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white h-9 px-5 text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 hover:shadow-[0_4px_16px_rgba(79,70,229,0.4)] cursor-pointer"
                    >
                      <Plus
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-90"
                      />
                      Adicionar Hero Section
                    </button>
                  </div>
                ) : (
                  sections.map((section) => (
                    <SortableSection
                      key={section.id}
                      section={section}
                      isSelected={section.id === selectedId}
                      onClick={() => setSelectedId(section.id)}
                      onDelete={() => deleteSection(section.id)}
                      activeForm={activeForm}
                      branding={branding}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  )
}
