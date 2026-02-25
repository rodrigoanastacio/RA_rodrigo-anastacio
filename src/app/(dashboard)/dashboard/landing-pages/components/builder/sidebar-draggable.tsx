import {
  Grid,
  LayoutTemplate,
  RectangleHorizontal,
  Type,
  UserCircle2
} from 'lucide-react'

interface SidebarDraggableProps {
  onAddSection: (type: 'hero' | 'features' | 'bio' | 'footer') => void
}

const SECTIONS = [
  {
    type: 'hero' as const,
    label: 'Hero Section',
    description: 'Destaque principal',
    Icon: Type
  },
  {
    type: 'features' as const,
    label: 'Features',
    description: 'Lista de benefícios',
    Icon: Grid
  },
  {
    type: 'bio' as const,
    label: 'Bio / Sobre',
    description: 'Autoridade & Perfil',
    Icon: UserCircle2
  },
  {
    type: 'footer' as const,
    label: 'Footer',
    description: 'Rodapé & Contato',
    Icon: RectangleHorizontal
  }
]

export function SidebarDraggable({ onAddSection }: SidebarDraggableProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col z-20 h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#4F46E5] flex items-center justify-center">
            <LayoutTemplate className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
              Biblioteca
            </h2>
            <p className="text-[10px] text-gray-400 font-medium">
              Componentes disponíveis
            </p>
          </div>
        </div>
      </div>

      {/* Section list */}
      <div className="p-4 flex-1 overflow-y-auto space-y-2">
        <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-[0.15em] px-1 mb-3">
          Essenciais
        </p>

        {SECTIONS.map(({ type, label, description, Icon }) => (
          <button
            key={type}
            onClick={() => onAddSection(type)}
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
              <p className="text-[10px] text-gray-400 mt-0.5">{description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-[9px] text-gray-300 font-medium text-center uppercase tracking-wider">
          Clique para adicionar
        </p>
      </div>
    </div>
  )
}
