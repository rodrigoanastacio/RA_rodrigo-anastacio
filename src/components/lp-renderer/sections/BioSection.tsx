'use client'

import { Button } from '@/components/ui/button'
import { cn, resolveMagicLink } from '@/lib/utils'
import { BadgeCheck, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'

export interface BioSectionProps {
  id?: string
  headline?: string
  subheadline?: string
  bio?: string[]
  imageSrc?: string
  alignment?: 'left' | 'right'
  theme?: 'light' | 'dark' | 'gray'
  ctaLabel?: string
  ctaLink?: string
  branding?: {
    businessName?: string
    businessSlogan?: string
    whatsappNumber?: string
  }
}

export function BioSection({
  id,
  headline,
  subheadline,
  bio = [
    'Com mais de 10 anos de experiência no mercado corporativo, ajudei centenas de profissionais a alcançarem cargos de liderança.',
    'Minha metodologia une teoria e prática, focando em resultados tangíveis e crescimento sustentável.'
  ],
  imageSrc = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
  alignment = 'left',
  theme = 'light',
  ctaLabel,
  ctaLink,
  branding
}: BioSectionProps) {
  const displayHeadline =
    headline || branding?.businessName || 'Titulo da Seção'
  const displaySubheadline =
    subheadline || branding?.businessSlogan || 'Subtitulo da Seção'

  const isDark = theme === 'dark'
  const isGray = theme === 'gray'

  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-32 overflow-hidden',
        isDark && 'bg-slate-900 text-white',
        isGray && 'bg-slate-50 text-gray-900',
        theme === 'light' && 'bg-white text-gray-900'
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'grid md:grid-cols-2 gap-12 md:gap-20 items-center',
            alignment === 'right' && 'md:grid-flow-dense'
          )}
        >
          <div
            className={cn(
              'relative',
              alignment === 'right' && 'md:col-start-2'
            )}
          >
            <div
              className={cn(
                'relative aspect-4/5 w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl',
                isDark ? 'shadow-blue-900/20' : 'shadow-xl'
              )}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10" />
              <Image
                src={imageSrc}
                alt={displayHeadline}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-900">
                    +10k Alunos
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 leading-tight">
                  Impactados pela metodologia em todo o Brasil.
                </p>
              </div>
            </div>

            <div
              className={cn(
                'absolute -z-10 w-full h-full top-6 -left-6 rounded-2xl border-2',
                isDark ? 'border-slate-700' : 'border-slate-200',
                alignment === 'right' && 'left-auto -right-6'
              )}
            />
          </div>

          <div
            className={cn(
              'space-y-8',
              alignment === 'right' && 'md:col-start-1'
            )}
          >
            <div className="space-y-4">
              <div
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase',
                  isDark
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-blue-50 text-blue-700'
                )}
              >
                <BadgeCheck size={14} />
                Autoridade
              </div>

              <h2
                className={cn(
                  'text-3xl md:text-5xl font-bold tracking-tight leading-tight',
                  isDark ? 'text-white' : 'text-gray-900'
                )}
              >
                {displayHeadline}
              </h2>

              <p
                className={cn(
                  'text-xl',
                  isDark ? 'text-blue-200' : 'text-blue-600'
                )}
              >
                {displaySubheadline}
              </p>
            </div>

            <div
              className={cn(
                'prose prose-lg',
                isDark ? 'prose-invert text-gray-400' : 'text-gray-600'
              )}
            >
              {bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              {ctaLabel && ctaLink && (
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
                  asChild
                >
                  <a href={resolveMagicLink(ctaLink, branding)}>{ctaLabel}</a>
                </Button>
              )}

              <div className="flex items-center gap-4 px-4 py-2">
                <a
                  href="#"
                  className={cn(
                    'transition-colors',
                    isDark
                      ? 'text-gray-500 hover:text-white'
                      : 'text-gray-400 hover:text-gray-900'
                  )}
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className={cn(
                    'transition-colors',
                    isDark
                      ? 'text-gray-500 hover:text-white'
                      : 'text-gray-400 hover:text-gray-900'
                  )}
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
