import { createClient } from '@/lib/supabase/server'
import {
  FormInsert,
  FormUpdate,
  formsHandler
} from '@/shared/api-handlers/forms/forms.handler'

export const formsService = {
  getFormsSummary: async () => {
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser?.user) {
      return { forms: [] }
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', authUser.user.id)
      .single()

    const tenantId = profile?.tenant_id || ''

    if (!tenantId) {
      return { forms: [] }
    }

    const { forms } = await formsHandler.list(supabase, tenantId)

    return { forms }
  },

  getFormById: async (id: string) => {
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

    return formsHandler.getById(supabase, id, tenantId)
  },

  createForm: async (data: Omit<FormInsert, 'tenant_id'>) => {
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

    return formsHandler.create(supabase, { ...data, tenant_id: tenantId })
  },

  updateFormSchema: async (id: string, schema: FormUpdate['schema']) => {
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

    return formsHandler.update(supabase, id, tenantId, { schema })
  }
}
