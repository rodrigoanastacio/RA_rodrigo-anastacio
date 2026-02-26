import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(
  _request: NextRequest,
  {
    params
  }: {
    params: Promise<{
      slug: string
      assetPath?: string[]
    }>
  }
) {
  const { slug, assetPath } = await params

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data: lp, error: lpError } = await supabase
    .from('landing_pages')
    .select('id, slug, is_published, is_custom, tenant_id')
    .eq('slug', slug)
    .eq('is_custom', true)
    .eq('is_published', true)
    .single()

  if (lpError || !lp) {
    return new NextResponse('Página não encontrada', { status: 404 })
  }

  const rawPath = assetPath ? assetPath.join('/') : ''
  const sanitizedPath = rawPath
    ? path.posix.normalize(rawPath).replace(/^(\.\.[/\\]?)+/, '')
    : ''

  if (sanitizedPath.includes('..')) {
    return new NextResponse('Acesso negado', { status: 403 })
  }

  const fileName =
    sanitizedPath && sanitizedPath !== '.' ? sanitizedPath : 'index.html'
  const filePath = `${lp.tenant_id}/custom-lps/${slug}/${fileName}`

  const { data: fileData, error: fileError } = await supabase.storage
    .from('tenant-assets')
    .download(filePath)

  if (fileError || !fileData) {
    console.error('[Custom LP Proxy] Asset not found:', filePath, fileError)
    return new NextResponse('Arquivo não encontrado', { status: 404 })
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
  else if (fileName.endsWith('.ico')) contentType = 'image/x-icon'

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
