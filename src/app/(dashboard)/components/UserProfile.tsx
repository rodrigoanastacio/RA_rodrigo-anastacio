'use client'

import { getInitials } from '@/lib/utils'
import Image from 'next/image'

interface IUserProfileProps {
  name: string
  role: string
  avatarUrl: string
}

export function UserProfile({ name, role, avatarUrl }: IUserProfileProps) {
  return (
    <div className="flex items-center gap-3 p-1">
      <div className="relative w-9 h-9 rounded-lg overflow-hidden shadow-sm bg-blue-100 flex items-center justify-center shrink-0">
        {avatarUrl && avatarUrl !== '/assets/avatar.jpg' ? (
          <Image
            src={avatarUrl}
            alt={`Avatar de ${name}`}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-blue-700 font-bold text-xs">
            {getInitials(name)}
          </span>
        )}
      </div>
      <div className="hidden md:flex flex-col items-start leading-tight">
        <span className="text-[13px] font-bold text-gray-900">{name}</span>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          {role}
        </span>
      </div>
    </div>
  )
}
