import { LeadFormData } from '@/lib/zod/lead.schema'
import { leadsHandler } from '@/shared/api-handlers/leads/leads.handler'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tenant_id, ...formData } = body

    if (!tenant_id) {
      return NextResponse.json(
        { error: 'Tenant ID é obrigatório' },
        { status: 400 }
      )
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false
        }
      }
    )

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    const leadData = formData as LeadFormData

    const metadata = {
      clientIp,
      userAgent,
      utmSource: formData.utm_source,
      utmMedium: formData.utm_medium,
      utmCampaign: formData.utm_campaign,
      utmContent: formData.utm_content,
      utmTerm: formData.utm_term,
      referrer: formData.referrer
    }

    await leadsHandler.create(supabaseAdmin, leadData, metadata, tenant_id)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error capturing lead:', error)
    const message =
      error instanceof Error ? error.message : 'Erro interno ao processar lead'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
