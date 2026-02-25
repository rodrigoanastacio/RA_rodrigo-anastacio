'use client'

import { FormSchema } from '@/components/forms/types'
import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { FormRow } from '@/shared/api-handlers/forms/forms.handler'
import { useLandingPageBuilder } from '../hooks/use-landing-page-builder'
import { CanvasPreview } from './builder/canvas-preview'
import { PropertiesPanel } from './builder/properties-panel'
import { SidebarDraggable } from './builder/sidebar-draggable'

import { Minimize2, Monitor } from 'lucide-react'
import { useState } from 'react'

interface LandingPageBuilderProps {
  initialSections?: LPSection[]
  initialPublished?: boolean
  initialTitle?: string
  initialSlug?: string
  initialMetaTitle?: string
  initialMetaDescription?: string
  initialFormId?: string
  availableForms?: FormRow[]
  onSave: (
    sections: LPSection[],
    pageSettings: {
      title: string
      slug: string
      metaTitle?: string
      metaDescription?: string
      formId?: string
    }
  ) => Promise<{ success: boolean; slug?: string; message?: string }>
  onTogglePublish?: (published: boolean) => Promise<{ success: boolean }>
  isSaving?: boolean
}

export function LandingPageBuilder(props: LandingPageBuilderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const {
    sections,
    selectedId,
    setSelectedId,
    isPublished,
    isSaving,
    pageSettings,
    setPageSettings,
    selectedSection,
    actions
  } = useLandingPageBuilder({
    initialSections: props.initialSections,
    initialPublished: props.initialPublished,
    initialTitle: props.initialTitle,
    initialSlug: props.initialSlug,
    initialMetaTitle: props.initialMetaTitle,
    initialMetaDescription: props.initialMetaDescription,
    initialFormId: props.initialFormId,
    onSave: props.onSave,
    onTogglePublish: props.onTogglePublish
  })

  return (
    <div className="flex h-full bg-[#f8f9fa] overflow-hidden relative">
      {/* LEFT SIDEBAR */}
      {!isFullscreen && <SidebarDraggable onAddSection={actions.addSection} />}

      {/* CANVAS */}
      <div className="flex-1 relative flex flex-col min-h-0 overflow-hidden">
        {/* Fullscreen toggle */}
        <div className="absolute top-3 right-4 z-50">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="group flex items-center gap-1.5 border border-gray-200 bg-white hover:border-[#4F46E5]/40 hover:bg-[#4F46E5]/3 text-gray-500 hover:text-[#4F46E5] h-8 px-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 shadow-sm cursor-pointer"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                Sair
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5" />
                Tela Cheia
              </>
            )}
          </button>
        </div>

        <CanvasPreview
          sections={sections}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          deleteSection={actions.deleteSection}
          handleDragEnd={actions.handleDragEnd}
          onAddHero={() => actions.addSection('hero')}
          activeForm={
            props.availableForms?.find((f) => f.id === pageSettings.formId)
              ?.schema as unknown as FormSchema
          }
        />
      </div>

      {/* RIGHT PANEL */}
      <PropertiesPanel
        selectedSection={selectedSection}
        pageSettings={pageSettings}
        setPageSettings={setPageSettings}
        updateSectionData={actions.updateSectionData}
        isPublished={isPublished}
        isSaving={isSaving}
        onTogglePublish={actions.handleTogglePublish}
        onSave={actions.handleSave}
        availableForms={props.availableForms || []}
      />
    </div>
  )
}
