import { leadsHandler } from '@/shared/api-handlers/leads/leads.handler'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_MAX = 20 // Máximo de reqs por IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutos

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count += 1
  return true
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body._honeypot && body._honeypot.trim() !== '') {
      console.log('Bot detectado no honeypot. Descartando silenciosamente.')

      return NextResponse.json(
        { success: true, message: 'Lead captured' },
        { status: 200 }
      )
    }

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Muitas requisições. Tente novamente mais tarde.' },
        { status: 429 }
      )
    }

    const tenantId = body.tenantId
    if (!tenantId) {
      return NextResponse.json(
        { error: 'Tenant ID is required for custom capture' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const userAgent = req.headers.get('user-agent') || 'Unknown'

    const metadata = {
      clientIp,
      userAgent,
      utmSource: body.utm_source,
      utmMedium: body.utm_medium,
      utmCampaign: body.utm_campaign,
      utmContent: body.utm_content,
      utmTerm: body.utm_term,
      referrer: body.referrer,
      form_id: body.form_id,
      answers: body.data || body
    }

    await leadsHandler.create(supabase, metadata.answers, metadata, tenantId)

    return NextResponse.json(
      { success: true, message: 'Lead capturado com sucesso' },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('[Custom LP] Erro na captura de lead:', error)
    const message =
      error instanceof Error ? error.message : 'Erro interno do servidor'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
