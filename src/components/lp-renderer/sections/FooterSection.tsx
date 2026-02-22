'use client'

import { cn } from '@/lib/utils'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube
} from 'lucide-react'

export interface FooterSectionProps {
  id?: string
  companyName?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  facebook?: string
  instagram?: string
  linkedin?: string
  twitter?: string
  youtube?: string
  theme?: 'light' | 'dark' | 'gray'
}

export function FooterSection({
  id,
  companyName = 'Sua Empresa',
  description = 'Descricao curta sobre sua missao ou o objetivo desta pagina.',
  email = 'contato@seudominio.com',
  phone,
  address,
  facebook,
  instagram = '#',
  linkedin = '#',
  twitter,
  youtube,
  theme = 'light'
}: FooterSectionProps) {
  const isDark = theme === 'dark'
  const isGray = theme === 'gray'

  const bgColor = isDark
    ? 'bg-slate-900 border-t border-slate-800'
    : isGray
      ? 'bg-slate-50 border-t border-gray-200'
      : 'bg-white border-t border-gray-100'

  const textColor = isDark ? 'text-gray-400' : 'text-gray-600'
  const headingColor = isDark ? 'text-white' : 'text-gray-900'

  return (
    <footer id={id} className={cn('py-12 md:py-16', bgColor)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3
              className={cn('text-xl font-bold tracking-tight', headingColor)}
            >
              {companyName}
            </h3>
            <p className={cn('text-sm leading-relaxed max-w-xs', textColor)}>
              {description}
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-4">
            <h4
              className={cn(
                'text-sm font-semibold uppercase tracking-wider',
                headingColor
              )}
            >
              Links Rápidos
            </h4>
            <nav className="flex flex-col space-y-2 text-sm">
              {['Home', 'Sobre', 'Serviços', 'Contato'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={cn(
                    'transition-colors hover:translate-x-1 duration-200 inline-block',
                    textColor,
                    isDark ? 'hover:text-white' : 'hover:text-blue-600'
                  )}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4
              className={cn(
                'text-sm font-semibold uppercase tracking-wider',
                headingColor
              )}
            >
              Contato
            </h4>
            <div className={cn('space-y-3 text-sm', textColor)}>
              {email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{address}</span>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-2">
              {[
                { icon: Instagram, link: instagram },
                { icon: Linkedin, link: linkedin },
                { icon: Facebook, link: facebook },
                { icon: Twitter, link: twitter },
                { icon: Youtube, link: youtube }
              ].map(
                ({ icon: Icon, link }, idx) =>
                  link && (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'transition-colors p-2 rounded-full',
                        isDark
                          ? 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      )}
                    >
                      <Icon size={18} />
                    </a>
                  )
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs',
            isDark
              ? 'border-slate-800 text-gray-500'
              : 'border-gray-200 text-gray-500'
          )}
        >
          <p>
            &copy; {new Date().getFullYear()} {companyName}. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">
              Políticas de Privacidade
            </a>
            <a href="#" className="hover:underline">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
