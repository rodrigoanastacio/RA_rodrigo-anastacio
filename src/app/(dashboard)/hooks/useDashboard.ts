'use client'

import { signOutAction } from '@/app/actions/auth/auth.actions'
import { useState } from 'react'

/**
 * Hook para centralizar a lógica de comportamento do Dashboard.
 */
export function useDashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await signOutAction()
    } catch (error) {
      console.error('Falha ao deslogar:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return {
    handleLogout,
    isLoggingOut
  }
}
