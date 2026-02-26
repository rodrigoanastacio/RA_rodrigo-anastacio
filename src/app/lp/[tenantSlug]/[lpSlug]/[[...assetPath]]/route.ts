import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  {
    params
  }: {
    params: Promise<{
      tenantSlug: string
      lpSlug: string
      assetPath?: string[]
    }>
  }
) {
  const { tenantSlug, lpSlug, assetPath } = await params

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .select('id')
    .eq('slug', tenantSlug)
    .single()

  if (tenantError || !tenant) {
    return new NextResponse('Tenant não encontrado', { status: 404 })
  }

  const { data: lp, error: lpError } = await supabase
    .from('landing_pages')
    .select('id, is_published')
    .eq('tenant_id', tenant.id)
    .eq('slug', lpSlug)
    .single()

  if (lpError || !lp || !lp.is_published) {
    return new NextResponse('Página não encontrada ou inativa', { status: 404 })
  }

  const pathParts = assetPath || []
  const fileName = pathParts.length > 0 ? pathParts.join('/') : 'index.html'
  const filePath = `${tenant.id}/custom-lps/${lpSlug}/${fileName}`

  const { data: fileData, error: fileError } = await supabase.storage
    .from('tenant-assets')
    .download(filePath)

  if (fileError || !fileData) {
    console.error('[Edge Proxy] Erro ao buscar asset:', filePath, fileError)
    return new NextResponse('Asset não encontrado na Custom LP', {
      status: 404
    })
  }

  let contentType = 'application/octet-stream'
  if (fileName.endsWith('.html')) contentType = 'text/html; charset=utf-8'
  else if (fileName.endsWith('.css')) contentType = 'text/css; charset=utf-8'
  else if (fileName.endsWith('.js'))
    contentType = 'application/javascript; charset=utf-8'
  else if (fileName.endsWith('.json'))
    contentType = 'application/json; charset=utf-8'
  else if (fileName.endsWith('.png')) contentType = 'image/png'
  else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg'))
    contentType = 'image/jpeg'
  else if (fileName.endsWith('.svg')) contentType = 'image/svg+xml'
  else if (fileName.endsWith('.webp')) contentType = 'image/webp'
  else if (fileName.endsWith('.gif')) contentType = 'image/gif'
  else if (fileName.endsWith('.woff') || fileName.endsWith('.woff2'))
    contentType = 'font/woff2'

  const arrayBuffer = await fileData.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': fileName.endsWith('.html')
        ? 'public, max-age=60'
        : 'public, max-age=3600'
    }
  })
}
