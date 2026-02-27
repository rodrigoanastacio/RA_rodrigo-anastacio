import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'sonner'

export interface PageSettings {
  title: string
  slug: string
  metaTitle?: string
  metaDescription?: string
  formId?: string
  whatsappFormId?: string
}

interface UseLandingPageBuilderProps {
  initialSections?: LPSection[]
  initialPublished?: boolean
  initialTitle?: string
  initialSlug?: string
  initialMetaTitle?: string
  initialMetaDescription?: string
  initialFormId?: string
  initialWhatsappFormId?: string
  onSave: (
    sections: LPSection[],
    pageSettings: PageSettings
  ) => Promise<{ success: boolean; slug?: string; message?: string }>
  onTogglePublish?: (published: boolean) => Promise<{ success: boolean }>
}

export function useLandingPageBuilder({
  initialSections = [],
  initialPublished = false,
  initialTitle = '',
  initialSlug = '',
  initialMetaTitle = '',
  initialMetaDescription = '',
  initialFormId = '',
  initialWhatsappFormId = '',
  onSave,
  onTogglePublish
}: UseLandingPageBuilderProps) {
  const [sections, setSections] = useState<LPSection[]>(initialSections)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isPublished, setIsPublished] = useState(initialPublished)
  const [isSaving, setIsSaving] = useState(false)

  const [pageSettings, setPageSettings] = useState<PageSettings>({
    title: initialTitle,
    slug: initialSlug,
    metaTitle: initialMetaTitle,
    metaDescription: initialMetaDescription,
    formId: initialFormId,
    whatsappFormId: initialWhatsappFormId
  })

  const addSection = (type: 'hero' | 'features' | 'bio' | 'footer') => {
    let defaultData = {}

    if (type === 'hero') {
      defaultData = {
        headline: '',
        subheadline: '',
        ctaLabel: 'Falar no WhatsApp',
        ctaLink: '#whatsapp',
        theme: 'light',
        layout: 'centered'
      }
    } else if (type === 'features') {
      defaultData = {
        headline: 'Por que escolher nossa solução?',
        subheadline: 'Recursos desenvolvidos para escalar seus resultados.',
        columns: 3,
        theme: 'light',
        features: [
          {
            icon: 'zap',
            title: 'Automação',
            description: 'Ganhe tempo automatizando tarefas repetitivas.'
          },
          {
            icon: 'chart',
            title: 'Analytics',
            description: 'Dados em tempo real para melhores decisões.'
          },
          {
            icon: 'lock',
            title: 'Segurança',
            description: 'Seus dados totalmente protegidos.'
          }
        ]
      }
    } else if (type === 'bio') {
      defaultData = {
        headline: '',
        subheadline: '',
        bio: [
          'Compartilhe sua jornada e autoridade aqui para gerar confiança em seus leads.',
          'Destaque seus diferenciais e resultados alcançados.'
        ],
        imageSrc:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
        alignment: 'left',
        theme: 'light',
        ctaLabel: 'Falar no WhatsApp',
        ctaLink: '#whatsapp'
      }
    } else if (type === 'footer') {
      defaultData = {
        companyName: '',
        description: '',
        email: 'contato@exemplo.com',
        phone: '',
        address: 'São Paulo, SP',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
        theme: 'light'
      }
    }

    const newSection: LPSection = {
      id: `${type}-${Date.now()}`,
      type,
      data: defaultData
    }
    setSections((prev) => [...prev, newSection])
    setSelectedId(newSection.id)
  }

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const updateSectionData = (key: string, value: unknown) => {
    if (!selectedId) return

    setSections((prev) =>
      prev.map((section) =>
        section.id === selectedId
          ? {
              ...section,
              data: { ...section.data, [key]: value }
            }
          : section
      )
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const result = await onSave(sections, pageSettings)
      if (result.success) {
        toast.success('Página salva com sucesso!', {
          description: result.slug ? `Slug: ${result.slug}` : undefined,
          action: result.slug
            ? {
                label: 'Visualizar',
                onClick: () => window.open(`/lp/${result.slug}`, '_blank')
              }
            : undefined
        })
      } else {
        toast.error(result.message || 'Erro ao salvar página.')
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro ao processar salvamento.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleTogglePublish = async () => {
    if (!onTogglePublish) return
    setIsSaving(true)
    const newStatus = !isPublished
    try {
      const result = await onTogglePublish(newStatus)
      if (result.success) {
        setIsPublished(newStatus)
        toast.success(
          newStatus ? 'Página publicada!' : 'Página despublicada.',
          {
            description: newStatus
              ? 'A página agora está visível publicamente.'
              : 'A página não está mais acessível publicamente.'
          }
        )
      } else {
        toast.error('Erro ao mudar status de publicação.')
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro ao processar alteração.')
    } finally {
      setIsSaving(false)
    }
  }

  const selectedSection = sections.find((s) => s.id === selectedId)

  return {
    sections,
    setSections,
    selectedId,
    setSelectedId,
    isPublished,
    isSaving,
    pageSettings,
    setPageSettings,
    selectedSection,
    actions: {
      addSection,
      deleteSection,
      updateSectionData,
      handleDragEnd,
      handleSave,
      handleTogglePublish
    }
  }
}
