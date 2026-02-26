import { Database } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export type LandingPageRow =
  Database['public']['Tables']['landing_pages']['Row']
export type LandingPageInsert =
  Database['public']['Tables']['landing_pages']['Insert']
export type LandingPageUpdate =
  Database['public']['Tables']['landing_pages']['Update']

export const landingPagesHandler = {
  async list(supabase: SupabaseClient<Database>, tenantId: string) {
    const { data, error, count } = await supabase
      .from('landing_pages')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return {
      pages: data as LandingPageRow[],
      total: count || 0
    }
  },

  async getById(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string
  ) {
    const { data, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single()

    if (error) throw error
    return data as LandingPageRow
  },

  async create(supabase: SupabaseClient<Database>, page: LandingPageInsert) {
    const { data, error } = await supabase
      .from('landing_pages')
      .insert(page)
      .select()
      .single()

    if (error) throw error
    return data as LandingPageRow
  },

  async update(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string,
    page: LandingPageUpdate
  ) {
    const { data, error } = await supabase
      .from('landing_pages')
      .update(page)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select()
      .single()

    if (error) throw error
    return data as LandingPageRow
  },

  async deleteAssetsFolder(
    supabase: SupabaseClient<Database>,
    folderPath: string
  ) {
    const { data: list, error } = await supabase.storage
      .from('tenant-assets')
      .list(folderPath, { limit: 100 })

    if (error || !list) {
      console.warn(
        '[deleteAssetsFolder] Error listing folder:',
        folderPath,
        error
      )
      return
    }

    const filesToRemove: string[] = []
    for (const item of list) {
      if (item.id) {
        filesToRemove.push(`${folderPath}/${item.name}`)
      } else {
        await this.deleteAssetsFolder(supabase, `${folderPath}/${item.name}`)
      }
    }

    if (filesToRemove.length > 0) {
      const { error: removeError } = await supabase.storage
        .from('tenant-assets')
        .remove(filesToRemove)
      if (removeError) {
        console.warn('[deleteAssetsFolder] Error removing files:', removeError)
      }
    }
  },

  async delete(
    supabase: SupabaseClient<Database>,
    id: string,
    tenantId: string
  ) {
    const { data: lp } = await supabase
      .from('landing_pages')
      .select('slug, is_custom')
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .single()

    const { error } = await supabase
      .from('landing_pages')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId)

    if (error) throw error

    if (lp?.is_custom && lp.slug) {
      const folderPath = `${tenantId}/custom-lps/${lp.slug}`
      await this.deleteAssetsFolder(supabase, folderPath).catch((err) => {
        console.error('[LandingPagesHandler] Error cleaning up storage:', err)
      })
    }

    return true
  },

  async uploadZip(
    supabase: SupabaseClient<Database>,
    tenantId: string,
    lpSlug: string,
    file: File | Blob
  ) {
    const MAX_UNCOMPRESSED_BYTES = 5 * 1024 * 1024

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04]
    const isZip = ZIP_MAGIC.every((byte, i) => buffer[i] === byte)
    if (!isZip) {
      throw new Error('O arquivo enviado não é um ZIP válido.')
    }

    const AdmZip = (await import('adm-zip')).default
    const zip = new AdmZip(buffer)
    const zipEntries = zip.getEntries()

    const totalUncompressedBytes = zipEntries.reduce(
      (acc, entry) => acc + entry.header.size,
      0
    )
    if (totalUncompressedBytes > MAX_UNCOMPRESSED_BYTES) {
      throw new Error(
        `O conteúdo do ZIP (${(totalUncompressedBytes / 1024 / 1024).toFixed(1)}MB descompactado) excede o limite de 5MB.`
      )
    }

    const getContentType = (filename: string) => {
      if (filename.endsWith('.html')) return 'text/html; charset=utf-8'
      if (filename.endsWith('.css')) return 'text/css; charset=utf-8'
      if (filename.endsWith('.js'))
        return 'application/javascript; charset=utf-8'
      if (filename.endsWith('.json')) return 'application/json; charset=utf-8'
      if (filename.endsWith('.png')) return 'image/png'
      if (filename.endsWith('.jpg') || filename.endsWith('.jpeg'))
        return 'image/jpeg'
      if (filename.endsWith('.svg')) return 'image/svg+xml'
      if (filename.endsWith('.webp')) return 'image/webp'
      if (filename.endsWith('.gif')) return 'image/gif'
      if (filename.endsWith('.woff') || filename.endsWith('.woff2'))
        return 'font/woff2'
      return 'application/octet-stream'
    }

    let commonPrefix = ''

    const allPaths = zipEntries
      .filter(
        (e) =>
          !e.isDirectory &&
          !e.entryName.includes('__MACOSX') &&
          !e.entryName.startsWith('.')
      )
      .map((e) => e.entryName)

    if (allPaths.length > 0) {
      const parts = allPaths[0].split('/')
      if (parts.length > 1) {
        const potentialPrefix = parts[0] + '/'
        const allHavePrefix = allPaths.every((p) =>
          p.startsWith(potentialPrefix)
        )
        if (allHavePrefix) {
          commonPrefix = potentialPrefix
        }
      }
    }

    const strippedPaths = allPaths.map((p) => {
      let rel = p
      if (commonPrefix && rel.startsWith(commonPrefix)) {
        rel = rel.substring(commonPrefix.length)
      }
      return rel
    })

    const hasIndexHtml = strippedPaths.some((p) => p === 'index.html')
    let htmlAlias: string | null = null

    if (!hasIndexHtml) {
      const rootHtmlFiles = strippedPaths.filter(
        (p) => p.endsWith('.html') && !p.includes('/')
      )
      if (rootHtmlFiles.length === 1) {
        htmlAlias = rootHtmlFiles[0]
        console.info(
          `[uploadZip] No index.html found. Auto-aliasing "${htmlAlias}" → "index.html"`
        )
      } else if (rootHtmlFiles.length > 1) {
        console.warn(
          `[uploadZip] Multiple root .html files found and no index.html. ` +
            `Please rename the main file to index.html.`
        )
      }
    }

    const uploadPromises = zipEntries.map(async (entry) => {
      if (
        entry.isDirectory ||
        entry.entryName.includes('__MACOSX') ||
        entry.entryName.startsWith('.')
      ) {
        return null
      }

      let relativePath = entry.entryName
      if (commonPrefix && relativePath.startsWith(commonPrefix)) {
        relativePath = relativePath.substring(commonPrefix.length)
      }

      if (htmlAlias && relativePath === htmlAlias) {
        relativePath = 'index.html'
      }

      const filePath = `${tenantId}/custom-lps/${lpSlug}/${relativePath}`
      const fileData = entry.getData()
      const contentType = getContentType(entry.entryName)

      const { data, error } = await supabase.storage
        .from('tenant-assets')
        .upload(filePath, fileData, {
          upsert: true,
          contentType
        })

      if (error) {
        console.error(`Error uploading ${entry.entryName}:`, error)
        throw error
      }
      return data
    })

    const results = await Promise.all(uploadPromises.filter(Boolean))
    return results
  }
}
