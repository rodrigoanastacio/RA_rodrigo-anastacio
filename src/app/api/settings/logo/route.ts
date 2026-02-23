import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

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

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    const tenant_id = profile?.tenant_id
    if (!tenant_id) {
      return NextResponse.json({ error: 'No tenant_id found' }, { status: 400 })
    }

    const formData = await req.formData()
    const file = formData.get('logo') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/webp'
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum 5MB.' },
        { status: 400 }
      )
    }

    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('settings')
      .eq('id', tenant_id)
      .single()

    if (tenantError) {
      return NextResponse.json(
        { error: 'Failed to fetch tenant' },
        { status: 500 }
      )
    }

    const fileExt = file.type.split('/')[1]
    const fileName = `${tenant_id}/logo.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('tenant-assets')
      .upload(fileName, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    const { data: urlData } = supabase.storage
      .from('tenant-assets')
      .getPublicUrl(fileName)

    const updatedSettings = {
      ...tenant.settings,
      branding: {
        ...tenant.settings?.branding,
        logoUrl: urlData.publicUrl
      }
    }

    const { error: updateError } = await supabase
      .from('tenants')
      .update({ settings: updatedSettings })
      .eq('id', tenant_id)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update tenant settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, logoUrl: urlData.publicUrl })
  } catch (error) {
    console.error('Logo upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
