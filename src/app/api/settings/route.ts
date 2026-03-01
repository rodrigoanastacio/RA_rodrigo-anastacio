import { tenantService } from '@/services/tenant/tenant.service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tenant = await tenantService.getSettings()

    if (!tenant) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      settings: tenant.settings,
      tenant: {
        name: tenant.name,
        slug: tenant.slug
      }
    })
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
