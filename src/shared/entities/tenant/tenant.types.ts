export interface TenantSettings {
  branding?: {
    primaryColor?: string
    secondaryColor?: string
    logo?: string
    logoUrl?: string
    companyName?: string
    tagline?: string
  }
  domain?: {
    custom?: string
    subdomain?: string
  }
  features?: Record<string, boolean>
  niche?: string
  [key: string]: unknown
}

export interface TenantRow {
  id: string
  slug: string
  name: string
  status: string
  settings: TenantSettings
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface TenantPlainObj {
  id: string
  slug: string
  name: string
  status: 'active' | 'trialing' | 'past_due' | 'canceled'
  settings: TenantSettings
  createdAt: string
  updatedAt: string
}
