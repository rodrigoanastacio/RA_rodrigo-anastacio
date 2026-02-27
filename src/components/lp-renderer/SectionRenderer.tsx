import { FormSchema } from '../forms/types'
import { BioSection } from './sections/BioSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { FooterSection } from './sections/FooterSection'
import { HeroSection } from './sections/HeroSection'

export const SECTION_COMPONENTS = {
  hero: HeroSection,
  features: FeaturesSection,
  bio: BioSection,
  footer: FooterSection
} as const

export type SectionType = keyof typeof SECTION_COMPONENTS

export interface LPSection {
  id: string
  type: SectionType
  data: Record<string, unknown>
  style?: Record<string, unknown>
}

interface SectionRendererProps {
  section: LPSection
  formId?: string
  form?: FormSchema
  whatsappFormId?: string
  whatsappForm?: FormSchema
  branding?: {
    businessName?: string
    businessSlogan?: string
    whatsappNumber?: string
  }
}

export function SectionRenderer({
  section,
  formId,
  form,
  whatsappFormId,
  whatsappForm,
  branding
}: SectionRendererProps) {
  const Component = SECTION_COMPONENTS[section.type]

  if (!Component) {
    console.warn(`Section type unknown: ${section.type}`)
    return null
  }

  return (
    <Component
      {...section.data}
      id={section.id}
      formId={formId}
      form={form}
      whatsappFormId={whatsappFormId}
      whatsappForm={whatsappForm}
      branding={branding}
    />
  )
}
