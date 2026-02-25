'use client'

import { useState } from 'react'

export function useFormBuilderNavigation() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>(
    'desktop'
  )
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [selectedField, setSelectedField] = useState<string | null>(null)

  return {
    activeTab,
    setActiveTab,
    previewMode,
    setPreviewMode,
    activeStepIndex,
    setActiveStepIndex,
    selectedField,
    setSelectedField
  }
}
