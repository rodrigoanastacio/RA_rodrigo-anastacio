'use client'

import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pass: string) => {
    let score = 0
    if (!pass) return 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    return score
  }

  const strength = getStrength(password)
  const colors = [
    'bg-gray-200',
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500'
  ]

  const labels = ['Muito fraca', 'Fraca', 'Média', 'Boa', 'Forte']

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={cn(
              'flex-1 rounded-full transition-all duration-500',
              strength >= step ? colors[strength] : 'bg-gray-100'
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          'text-[10px] font-bold uppercase tracking-wider transition-colors duration-500',
          strength > 0 ? 'text-gray-500' : 'text-transparent'
        )}
      >
        {strength > 0 ? `Força: ${labels[strength]}` : '.'}
      </p>
    </div>
  )
}
