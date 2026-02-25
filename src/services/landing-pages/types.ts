import { LPSection } from '@/components/lp-renderer/SectionRenderer'

export interface SaveLandingPageResult {
  success: boolean
  slug?: string
  id?: string
  message?: string
}

export type LandingPageContent = LPSection[]

export interface LandingPage {
  id: string
  tenant_id: string
  title: string
  slug: string
  content: LandingPageContent
  is_published: boolean
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
  views?: number
  template_id?: string
}

export interface CreateLandingPageInput {
  title: string
  slug: string
  content?: LandingPageContent
}
