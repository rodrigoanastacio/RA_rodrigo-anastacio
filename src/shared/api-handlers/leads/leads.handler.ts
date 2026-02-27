import { getTenantIdFromJWT } from '@/lib/auth/get-tenant-id'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  Lead,
  LeadRow,
  LeadsListResponse
} from '@/shared/entities/leads/lead.types'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

export const leadsHandler = {
  create: async (
    supabase: SupabaseClient,
    data: Record<string, unknown>,
    metadata: {
      clientIp: string
      userAgent: string
      utmSource?: string
      utmMedium?: string
      utmCampaign?: string
      utmContent?: string
      utmTerm?: string
      referrer?: string
      form_id?: string
      answers?: Record<string, unknown>
    },
    overrideTenantId?: string
  ) => {
    let tenantId: string | null | undefined = overrideTenantId
    let isPublicSubmission = false
    let formSchema: {
      steps?: { fields?: { type: string; label?: string; name: string }[] }[]
    } | null = null

    const jwtTenantId = await getTenantIdFromJWT()
    if (!tenantId) {
      tenantId = jwtTenantId
    }

    if (metadata.form_id) {
      const adminSupabase = createAdminClient()
      const { data: form, error: formError } = await adminSupabase
        .from('forms')
        .select('tenant_id, is_published, schema')
        .eq('id', metadata.form_id)
        .single()

      if (formError || !form) {
        throw new Error('Form not found')
      }

      if (!tenantId && !form.is_published) {
        throw new Error('Form is not published')
      }

      tenantId = tenantId || form.tenant_id
      formSchema = form.schema
    } else if (!tenantId) {
      throw new Error('Form ID is required for public submissions')
    }

    if (!tenantId) {
      throw new Error('Tenant ID could not be determined')
    }

    const isUnauthenticatedRequest = !jwtTenantId && !overrideTenantId
    if (isUnauthenticatedRequest) {
      isPublicSubmission = true
    }

    const answers = metadata.answers || data || {}
    let nome = ''
    let email = ''
    let whatsapp = ''

    const hasDynamicSteps = formSchema && formSchema.steps
    if (hasDynamicSteps) {
      const allFields = formSchema!.steps!.flatMap((step) => step.fields || [])

      const nomeField =
        allFields.find(
          (f) => f.type === 'text' && f.label?.toLowerCase().includes('nome')
        ) || allFields.find((f) => f.type === 'text')
      if (nomeField && answers[nomeField.name]) {
        nome = answers[nomeField.name] as string
      }

      const emailField = allFields.find((f) => f.type === 'email')
      if (emailField && answers[emailField.name]) {
        email = answers[emailField.name] as string
      }

      const telField = allFields.find((f) => f.type === 'tel')
      if (telField && answers[telField.name]) {
        whatsapp = answers[telField.name] as string
      }
    }

    const hasMissingFallbackNome = !nome
    if (hasMissingFallbackNome) {
      nome =
        (answers.nome as string) ||
        (answers.name as string) ||
        (answers.fullName as string) ||
        (answers.nome_completo as string) ||
        ''
    }

    const hasMissingFallbackEmail = !email
    if (hasMissingFallbackEmail) {
      email = (answers.email as string) || (answers.userEmail as string) || ''
    }

    const hasMissingFallbackWhatsapp = !whatsapp
    if (hasMissingFallbackWhatsapp) {
      whatsapp =
        (answers.whatsapp as string) ||
        (answers.phone as string) ||
        (answers.tel as string) ||
        ''
    }

    const insertClient = isPublicSubmission ? createAdminClient() : supabase

    const { error } = await insertClient.from('leads').insert([
      {
        tenant_id: tenantId,
        nome_completo: nome.toString().trim(),
        email: email.toString().trim().toLowerCase(),
        whatsapp: whatsapp.toString().replace(/\D/g, ''),
        status: 'novo_lead',
        ip_cliente: metadata.clientIp,
        agente_usuario: metadata.userAgent,
        utm_source: metadata.utmSource,
        utm_medium: metadata.utmMedium,
        utm_campaign: metadata.utmCampaign,
        utm_content: metadata.utmContent,
        utm_term: metadata.utmTerm,
        referrer: metadata.referrer,
        form_id: metadata.form_id,
        answers: answers
      }
    ])

    if (error) {
      throw error
    }

    return { success: true }
  },

  updateStatus: async (
    supabase: SupabaseClient,
    id: string,
    status: string
  ) => {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)

    if (error) {
      throw error
    }

    return { success: true }
  },

  list: async (
    supabase: SupabaseClient,
    options: {
      page?: number
      perPage?: number
      orderBy?: 'created_at' | 'nome_completo'
      orderDirection?: 'asc' | 'desc'
    } = {}
  ): Promise<LeadsListResponse> => {
    const {
      page = 1,
      perPage = 10,
      orderBy = 'created_at',
      orderDirection = 'desc'
    } = options

    const from = (page - 1) * perPage
    const to = from + perPage - 1

    const { count } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order(orderBy, { ascending: orderDirection === 'asc' })
      .range(from, to)

    if (error) {
      throw error
    }

    const leads: Lead[] = (data as LeadRow[]).map((row) => ({
      id: row.id,
      tenant_id: row.tenant_id,
      nome_completo: row.nome_completo,
      email: row.email,
      whatsapp: row.whatsapp || undefined,
      form_id: row.form_id || undefined,
      landing_page_id: row.landing_page_id || undefined,
      answers: row.answers || {},
      created_at: row.created_at,
      updated_at: row.updated_at,
      status: row.status,
      ip_cliente: row.ip_cliente || undefined,
      agente_usuario: row.agente_usuario || undefined,
      utm_source: row.utm_source || undefined,
      utm_medium: row.utm_medium || undefined,
      utm_campaign: row.utm_campaign || undefined,
      utm_content: row.utm_content || undefined,
      utm_term: row.utm_term || undefined,
      referrer: row.referrer || undefined
    }))

    return {
      leads,
      total: count || 0,
      page,
      perPage
    }
  },

  getById: async (
    supabase: SupabaseClient,
    id: string
  ): Promise<{ data: Lead | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error }
    }

    const row = data as LeadRow
    const lead: Lead = {
      id: row.id,
      tenant_id: row.tenant_id,
      nome_completo: row.nome_completo,
      email: row.email,
      whatsapp: row.whatsapp || undefined,
      form_id: row.form_id || undefined,
      landing_page_id: row.landing_page_id || undefined,
      answers: row.answers || {},
      created_at: row.created_at,
      updated_at: row.updated_at,
      status: row.status,
      ip_cliente: row.ip_cliente || undefined,
      agente_usuario: row.agente_usuario || undefined,
      utm_source: row.utm_source || undefined,
      utm_medium: row.utm_medium || undefined,
      utm_campaign: row.utm_campaign || undefined,
      utm_content: row.utm_content || undefined,
      utm_term: row.utm_term || undefined,
      referrer: row.referrer || undefined
    }

    return { data: lead, error: null }
  }
}
