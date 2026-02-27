'use client'

import { cn } from '@/lib/utils'
import {
  BarChart3,
  Bot,
  CheckCircle2,
  Clock,
  Globe2,
  Layout,
  Lock,
  LucideIcon,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Zap
} from 'lucide-react'

// Map string names to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  rocket: Rocket,
  zap: Zap,
  chart: BarChart3,
  globe: Globe2,
  lock: Lock,
  shield: ShieldCheck,
  bot: Bot,
  clock: Clock,
  layout: Layout,
  message: MessageSquare,
  check: CheckCircle2
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface FeaturesSectionProps {
  id?: string
  headline?: string
  subheadline?: string
  features?: FeatureItem[]
  columns?: 2 | 3 | 4
  theme?: 'light' | 'dark' | 'gray'
  branding?: {
    businessName?: string
    businessSlogan?: string
    whatsappNumber?: string
  }
}

export function FeaturesSection({
  id,
  headline = 'Por que escolher nossa solução?',
  subheadline = 'Recursos desenvolvidos para escalar seus resultados.',
  features = [
    {
      icon: 'zap',
      title: 'Automação Inteligente',
      description:
        'Automatize processos repetitivos e ganhe tempo para focar no que realmente importa: estratégia.'
    },
    {
      icon: 'chart',
      title: 'Analytics em Tempo Real',
      description:
        'Tome decisões baseadas em dados com dashboards intuitivos e relatórios detalhados.'
    },
    {
      icon: 'lock',
      title: 'Segurança de Dados',
      description:
        'Seus dados protegidos com criptografia de ponta a ponta e conformidade total com LGPD.'
    }
  ],
  columns = 3,
  theme = 'light',
  branding
}: FeaturesSectionProps) {
  const isDark = theme === 'dark'
  const isGray = theme === 'gray'

  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-32',
        isDark && 'bg-slate-900 text-white',
        isGray && 'bg-slate-50 text-gray-900',
        theme === 'light' && 'bg-white text-gray-900'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2
            className={cn(
              'text-3xl md:text-5xl font-bold tracking-tight',
              isDark ? 'text-white' : 'text-gray-900'
            )}
          >
            {headline}
          </h2>
          <p
            className={cn(
              'text-lg md:text-xl',
              isDark ? 'text-gray-400' : 'text-gray-500'
            )}
          >
            {subheadline}
          </p>
        </div>

        <div
          className={cn(
            'grid gap-8',
            columns === 2 && 'md:grid-cols-2',
            columns === 3 && 'md:grid-cols-3',
            columns === 4 && 'md:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {features.map((feature, idx) => {
            const IconComponent = ICON_MAP[feature.icon] || Rocket

            return (
              <div
                key={idx}
                className={cn(
                  'group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-750 border border-slate-700'
                    : 'bg-white border border-gray-100 shadow-sm'
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300',
                    isDark
                      ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20'
                      : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                  )}
                >
                  <IconComponent size={24} strokeWidth={2.5} />
                </div>

                <h3
                  className={cn(
                    'text-xl font-bold mb-3',
                    isDark ? 'text-white' : 'text-gray-900'
                  )}
                >
                  {feature.title}
                </h3>

                <p
                  className={cn(
                    'leading-relaxed',
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  )}
                >
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
