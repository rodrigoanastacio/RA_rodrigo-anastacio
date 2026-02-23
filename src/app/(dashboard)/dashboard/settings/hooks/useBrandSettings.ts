'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useBrandSettings() {
  const router = useRouter()
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data?.settings?.branding?.logoUrl) {
          setLogoPreview(data.settings.branding.logoUrl)
        }
      } catch (err) {
        console.error('Error fetching tenant settings', err)
      }
    }
    loadSettings()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/webp'
    ]
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Tipo de arquivo inválido. Use PNG, JPG, SVG ou WebP.')
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 5MB.')
      return
    }

    setError(null)
    setFile(selectedFile)

    const reader = new FileReader()
    reader.onloadend = () => {
      setLogoPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const uploadLogo = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('logo', file)

    try {
      const res = await fetch('/api/settings/logo', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao fazer upload')
      }

      toast.success('Logo atualizado com sucesso!')
      router.refresh()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const cancelUpload = () => {
    setFile(null)
    setError(null)
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setLogoPreview(data?.settings?.branding?.logoUrl || null)
      })
      .catch(() => setLogoPreview(null))
  }

  return {
    logoPreview,
    uploading,
    file,
    error,
    handleFileChange,
    uploadLogo,
    cancelUpload
  }
}
