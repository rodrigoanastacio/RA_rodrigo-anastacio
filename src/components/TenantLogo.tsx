'use client'

import { LayoutTemplate } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface TenantSettings {
  branding?: {
    companyName?: string
    tagline?: string
    logoUrl?: string
    primaryColor?: string
  }
}

interface TenantLogoProps {
  className?: string
  showText?: boolean
  companyName?: string
  tagline?: string
}

export function TenantLogo({
  className = '',
  showText = true,
  companyName: propCompanyName,
  tagline: propTagline
}: TenantLogoProps) {
  const [settings, setSettings] = useState<TenantSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [tenantName, setTenantName] = useState<string>('')

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings)
        setTenantName(data.tenant?.name || '')
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load tenant settings:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 bg-white/10 animate-pulse rounded-lg" />
        {showText && (
          <div className="space-y-2">
            <div className="h-4 w-32 bg-white/10 animate-pulse rounded" />
          </div>
        )}
      </div>
    )
  }

  const logoUrl = settings?.branding?.logoUrl
  const companyName =
    propCompanyName ||
    settings?.branding?.companyName ||
    tenantName ||
    'Sua Empresa'
  const tagline = propTagline || settings?.branding?.tagline || ''

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoUrl ? (
        <div className="relative w-full max-w-[180px] h-14 overflow-hidden">
          <Image
            src={logoUrl}
            alt={companyName}
            fill
            className="object-contain object-left"
            unoptimized // Supabase Storage URLs
          />
        </div>
      ) : (
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <LayoutTemplate className="w-5 h-5 text-white" />
        </div>
      )}

      {showText && !logoUrl && (
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm font-bold leading-tight text-gray-900 truncate">
            {companyName}
          </h2>
          {tagline && (
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest truncate mt-1">
              {tagline}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
