import { ReactNode } from 'react'

interface SectionHeaderProps {
  icon: ReactNode
  label: string
}

export function SectionHeader({ icon, label }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
      <span className="text-[#4F46E5]">{icon}</span>
      <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  )
}
