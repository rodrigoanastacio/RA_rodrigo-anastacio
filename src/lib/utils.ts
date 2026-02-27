import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  const names = name.trim().split(' ')
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase()

  return (names[0][0] + names[names.length - 1][0]).toUpperCase()
}

export function getUserDisplayName(
  user?: { name?: string; email?: string } | null
): string {
  if (!user) return 'Usuário'
  return user.name || user.email || 'Usuário'
}

export function resolveMagicLink(
  link?: string,
  branding?: { whatsappNumber?: string }
) {
  if (link === '#whatsapp' && branding?.whatsappNumber) {
    const cleanNumber = branding.whatsappNumber.replace(/\D/g, '')
    return `https://wa.me/${cleanNumber}`
  }
  return link || '#'
}
