import { createClient } from '@/lib/supabase/server'
import { tenantHandler } from '@/shared/api-handlers/tenant/tenant.handler'
import { TenantSettings } from '@/shared/entities/tenant/tenant.types'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('[logo] profile error:', profileError)
      return NextResponse.json(
        { error: 'Profile fetch failed', detail: profileError.message },
        { status: 500 }
      )
    }

    const tenantId = profile?.tenant_id
    if (!tenantId) {
      return NextResponse.json(
        { error: 'Tenant not found for this user' },
        { status: 400 }
      )
    }

    console.log('[logo] tenantId:', tenantId)

    const formData = await req.formData()
    const file = formData.get('logo') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo inválido. Use PNG, JPG, SVG ou WebP.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 5MB.' },
        { status: 400 }
      )
    }

    console.log('[logo] uploading file:', file.name, file.type, file.size)

    let publicUrl: string
    try {
      publicUrl = await tenantHandler.uploadLogo(supabase, tenantId, file)
      console.log('[logo] uploaded, url:', publicUrl)
    } catch (uploadErr) {
      console.error('[logo] uploadLogo failed:', uploadErr)
      return NextResponse.json(
        { error: 'Upload storage failed', detail: String(uploadErr) },
        { status: 500 }
      )
    }

    const tenant = await tenantHandler.getById(supabase, tenantId)
    const currentSettings = (tenant?.settings || {}) as TenantSettings
    const updatedSettings: TenantSettings = {
      ...currentSettings,
      branding: {
        ...currentSettings.branding,
        logoUrl: publicUrl
      }
    }

    try {
      await tenantHandler.updateSettings(supabase, tenantId, updatedSettings)
    } catch (updateErr) {
      console.error('[logo] updateSettings failed:', updateErr)
      return NextResponse.json(
        { error: 'Settings update failed', detail: String(updateErr) },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, logoUrl: publicUrl })
  } catch (error) {
    console.error('[POST /api/settings/logo] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (profileError || !profile?.tenant_id) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 400 })
    }

    await tenantHandler.deleteLogo(supabase, profile.tenant_id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE /api/settings/logo] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
