'use client'

import { DynamicForm } from '@/components/forms/dynamic-form'
import { FormSchema } from '@/components/forms/types'
import { cn } from '@/lib/utils'
import { Check, ClipboardList, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'sonner'

export interface HeroSectionProps {
  id?: string
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaLink?: string
  backgroundImage?: string
  theme?: 'light' | 'dark'
  layout?: 'centered' | 'split'
  benefits?: string[]
  form?: FormSchema
}

export function HeroSection({
  id,
  headline = 'Transforme sua Gestão Agora',
  subheadline = 'Potencialize seus resultados com a plataforma mais completa do mercado. Unificamos automação, análise e crescimento em um único lugar.',
  backgroundImage,
  theme = 'light',
  benefits = [],
  form
}: HeroSectionProps) {
  const searchParams = useSearchParams()

  /* Render headline — wrap *text* in an indigo gradient accent */
  const renderHeadline = (text: string) => {
    if (!text.includes('*')) return text
    return text.split('*').map((part, i) =>
      i % 2 === 0 ? (
        part
      ) : (
        <span
          key={i}
          className="text-transparent bg-clip-text bg-linear-to-r from-[#4F46E5] to-[#7C3AED]"
        >
          {part}
        </span>
      )
    )
  }

  const submitLead = useCallback(
    async (data: Record<string, unknown>) => {
      if (!form?.id) throw new Error('ID do formulário não encontrado')
      const payload = {
        answers: data,
        form_id: form.id,
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
        utm_content: searchParams.get('utm_content'),
        utm_term: searchParams.get('utm_term'),
        referrer: document.referrer
      }
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Falha ao enviar formulário')
      }
    },
    [form, searchParams]
  )

  const handleEmbeddedSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        await submitLead(data)
        toast.success('Recebemos seus dados! Entraremos em contato em breve.')
      } catch (error) {
        console.error('Erro ao enviar formulário:', error)
        toast.error('Ocorreu um erro ao enviar. Tente novamente.')
      }
    },
    [submitLead]
  )

  const isDark = theme === 'dark'

  return (
    <section
      id={id}
      className={cn(
        'relative min-h-[90vh] flex items-center pt-20 overflow-hidden transition-colors duration-300',
        isDark ? 'bg-gray-950' : 'bg-white'
      )}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(79,70,229,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />
        {/* Soft gradient orb — top right */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-linear-to-br from-[#4F46E5]/10 via-violet-500/5 to-transparent blur-3xl" />
        {/* Soft gradient orb — bottom left */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-linear-to-tr from-[#4F46E5]/8 to-transparent blur-2xl" />
      </div>

      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover opacity-10"
          />
        </div>
      )}

      <div className="@container relative w-full max-w-7xl mx-auto px-4 @xl:px-6 @4xl:px-8 py-8 @4xl:py-20 z-10">
        <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-10 @4xl:gap-16 items-center">
          {/* ── LEFT COLUMN ─────────────────────────────────── */}
          <div className="@3xl:col-span-7 flex flex-col justify-center space-y-7 animate-in slide-in-from-left duration-700">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/25 bg-linear-to-r from-[#4F46E5]/8 to-violet-500/5 px-4 py-2 w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span className="text-xs font-semibold text-[#4F46E5] uppercase tracking-wide">
                Plataforma #1 em Eficiência
              </span>
            </div>

            {/* Headline */}
            <h1
              className={cn(
                'text-4xl @2xl:text-5xl @4xl:text-6xl font-extrabold tracking-tight leading-[1.08]',
                isDark ? 'text-white' : 'text-gray-900'
              )}
            >
              {renderHeadline(headline)}
            </h1>

            {/* Subheadline */}
            <p
              className={cn(
                'text-base @2xl:text-lg max-w-xl leading-relaxed',
                isDark ? 'text-gray-400' : 'text-gray-500'
              )}
            >
              {subheadline}
            </p>

            {/* Benefits */}
            {benefits && benefits.length > 0 && (
              <ul className="flex flex-col gap-3 pt-1">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 group">
                    <div
                      className={cn(
                        'shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200',
                        isDark
                          ? 'bg-[#4F46E5]/15 border-[#4F46E5]/30 group-hover:bg-[#4F46E5] group-hover:border-[#4F46E5]'
                          : 'bg-[#4F46E5]/08 border-[#4F46E5]/20 group-hover:bg-[#4F46E5] group-hover:border-[#4F46E5]'
                      )}
                    >
                      <Check className="w-3 h-3 text-[#4F46E5] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span
                      className={cn(
                        'text-sm font-medium leading-snug',
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      )}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Social Proof */}
            <div
              className={cn(
                'flex items-center gap-0 border-t pt-7',
                isDark ? 'border-white/8' : 'border-gray-100'
              )}
            >
              {[
                { value: '+150', label: 'Escritórios' },
                { value: 'R$ 50M+', label: 'Geridos' },
                { value: '12 Anos', label: 'Experiência' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && (
                    <div
                      className={cn(
                        'w-px h-9 mx-6',
                        isDark ? 'bg-white/10' : 'bg-gray-200'
                      )}
                    />
                  )}
                  <div>
                    <p className="text-xl @4xl:text-2xl font-extrabold text-[#4F46E5]">
                      {stat.value}
                    </p>
                    <p
                      className={cn(
                        'text-[10px] font-bold uppercase tracking-widest mt-0.5',
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      )}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Form ──────────────────────────── */}
          <div className="@3xl:col-span-5 relative animate-in slide-in-from-right duration-700 delay-100">
            {/* Glow ring behind card */}
            <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-[#4F46E5]/20 to-violet-500/10 blur-xl opacity-70 pointer-events-none" />

            {form ? (
              <div
                className={cn(
                  'relative rounded-2xl overflow-hidden shadow-2xl border',
                  isDark
                    ? 'bg-gray-900 border-gray-800'
                    : 'bg-white border-gray-100/80'
                )}
              >
                {/* Indigo accent bar */}
                <div className="h-1.5 w-full bg-linear-to-r from-[#4F46E5] to-violet-500" />

                <div className="p-6 @4xl:p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-md bg-linear-to-br from-[#4F46E5] to-violet-600 flex items-center justify-center">
                        <ClipboardList className="w-3 h-3 text-white" />
                      </div>
                      <h2
                        className={cn(
                          'text-lg font-bold',
                          isDark ? 'text-white' : 'text-gray-900'
                        )}
                      >
                        {form.name || 'Comece sua avaliação'}
                      </h2>
                    </div>
                    <p
                      className={cn(
                        'text-sm leading-relaxed',
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      )}
                    >
                      {form.description ||
                        'Preencha o formulário e agende uma demonstração com nossos especialistas.'}
                    </p>
                  </div>

                  <DynamicForm
                    schema={form}
                    onSubmit={handleEmbeddedSubmit}
                    className="space-y-4"
                  />

                  <p
                    className={cn(
                      'text-[11px] text-center mt-5',
                      isDark ? 'text-gray-600' : 'text-gray-400'
                    )}
                  >
                    Sem cartão de crédito. Teste grátis por 14 dias.
                  </p>
                </div>
              </div>
            ) : (
              /* Empty state */
              <div
                className={cn(
                  'relative rounded-2xl w-full min-h-[380px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed transition-all',
                  isDark
                    ? 'border-gray-700 bg-gray-900/40'
                    : 'border-gray-200 bg-gray-50/60 hover:bg-white hover:border-[#4F46E5]/30'
                )}
              >
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border',
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-gray-400'
                      : 'bg-white border-gray-100 shadow-sm text-gray-400'
                  )}
                >
                  <ClipboardList className="w-6 h-6 opacity-50" />
                </div>
                <h3
                  className={cn(
                    'text-base font-bold mb-2',
                    isDark ? 'text-gray-300' : 'text-gray-800'
                  )}
                >
                  Nenhum formulário vinculado
                </h3>
                <p
                  className={cn(
                    'text-sm max-w-[240px] leading-relaxed',
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  )}
                >
                  Selecione um formulário nas configurações ao lado para
                  exibi-lo aqui.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
