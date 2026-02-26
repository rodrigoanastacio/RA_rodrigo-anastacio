import { createClient } from '@/lib/supabase/server'
import {
  LandingPageInsert,
  LandingPageUpdate,
  landingPagesHandler
} from '@/shared/api-handlers/landing-pages/landing-pages.handler'

export const landingPagesService = {
  getLandingPagesSummary: async () => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) return { pages: [], total: 0 }

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', authUser.user.id)
      .single()

    const tenantId = profile?.tenant_id || ''
    if (!tenantId) return { pages: [], total: 0 }

    return landingPagesHandler.list(supabase, tenantId)
  },

  getLandingPageById: async (id: string) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', authUser.user.id)
      .single()

    const tenantId = profile?.tenant_id || ''
    if (!tenantId) throw new Error('Tenant not found')

    return landingPagesHandler.getById(supabase, id, tenantId)
  },

  createLandingPage: async (
    data: Omit<LandingPageInsert, 'tenant_id' | 'type' | 'is_published'>
  ) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', authUser.user.id)
      .single()

    const tenantId = profile?.tenant_id || ''
    if (!tenantId) throw new Error('Tenant not found')

    return landingPagesHandler.create(supabase, {
      ...data,
      tenant_id: tenantId,
      is_published: false
    })
  },

  updateLandingPage: async (
    id: string,
    data: Omit<LandingPageUpdate, 'tenant_id'>
  ) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', authUser.user.id)
      .single()

    const tenantId = profile?.tenant_id || ''
    if (!tenantId) throw new Error('Tenant not found')

    return landingPagesHandler.update(supabase, id, tenantId, {
      ...data,
      updated_at: new Date().toISOString()
    })
  },

  deleteLandingPage: async (id: string) => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', authUser.user.id)
      .single()

    const tenantId = profile?.tenant_id || ''
    if (!tenantId) throw new Error('Tenant not found')

    return landingPagesHandler.delete(supabase, id, tenantId)
  },

  uploadCustomLpZip: async (formData: FormData, lpSlug: string) => {
    const file = formData.get('file') as File | null
    if (!file) throw new Error('File is required')

    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', authUser.user.id)
      .single()

    const tenantId = profile?.tenant_id || ''
    if (!tenantId) throw new Error('Tenant not found')

    return landingPagesHandler.uploadZip(supabase, tenantId, lpSlug, file)
  }
}
