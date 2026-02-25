'use client'

import React from 'react'

interface ToolButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export function ToolButton({ icon, label, onClick }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center gap-3 border border-transparent hover:border-[#4F46E5]/40 hover:bg-[#4F46E5]/03 text-left transition-all duration-150 px-3 py-2.5 cursor-pointer"
    >
      {/* Icon square */}
      <div className="w-7 h-7 bg-gray-100 group-hover:bg-[#4F46E5] border border-gray-200 group-hover:border-[#4F46E5] flex items-center justify-center shrink-0 transition-all duration-150">
        <span className="text-gray-500 group-hover:text-white transition-colors duration-150 [&>svg]:w-3.5 [&>svg]:h-3.5">
          {icon}
        </span>
      </div>

      <span className="text-xs font-bold text-gray-600 group-hover:text-[#111827] tracking-wide transition-colors duration-150 flex-1">
        {label}
      </span>

      <span className="text-[9px] font-bold text-gray-300 group-hover:text-[#4F46E5]/60 uppercase tracking-widest transition-colors duration-150">
        + add
      </span>
    </button>
  )
}
