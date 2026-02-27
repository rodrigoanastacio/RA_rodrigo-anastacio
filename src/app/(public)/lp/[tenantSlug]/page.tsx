import { FormSchema } from '@/components/forms/types'
import {
  LPSection,
  SectionRenderer
} from '@/components/lp-renderer/SectionRenderer'
import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

interface LandingPageProps {
  params: Promise<{
    tenantSlug: string
  }>
}

export async function generateMetadata({
  params
}: LandingPageProps): Promise<Metadata> {
  const { tenantSlug } = await params
  const supabase = await createClient()
  const { data: page } = await supabase
    .from('landing_pages')
    .select('title, meta_title, meta_description')
    .eq('slug', tenantSlug)
    .eq('is_published', true)
    .single()

  if (!page) {
    return {
      title: 'Página não encontrada'
    }
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description
  }
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { tenantSlug } = await params
  const supabase = await createClient()

  const { data: page, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', tenantSlug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('[Public LP] Erro Supabase:', error)
  }

  if (!page) {
    notFound()
  }

  // Custom LPs are served by the dedicated proxy route /lp/custom/[slug]
  // that uses the service role key internally — no tenant slug needed in the URL.
  if (page.is_custom) {
    redirect(`/lp/custom/${page.slug}`)
  }

  let formSchema: FormSchema | undefined = undefined
  if (page.form_id) {
    const { data: formData } = await supabase
      .from('forms')
      .select('schema')
      .eq('id', page.form_id)
      .single()

    if (formData) {
      formSchema = formData.schema
    }
  }

  const sections = page.content as LPSection[]

  // Fetch branding from profiles associated with this tenant
  const { data: profile } = await supabase
    .from('profiles')
    .select('business_name, business_slogan, whatsapp_number')
    .eq('tenant_id', page.tenant_id)
    .limit(1)
    .single()

  const branding = {
    businessName: profile?.business_name,
    businessSlogan: profile?.business_slogan,
    whatsappNumber: profile?.whatsapp_number
  }

  return (
    <main className="min-h-screen bg-white">
      {sections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
          form={formSchema}
          branding={branding}
        />
      ))}
    </main>
  )
}
