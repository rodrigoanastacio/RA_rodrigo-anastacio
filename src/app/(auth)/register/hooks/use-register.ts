'use client'

import { signUpAction } from '@/app/actions/auth/auth.actions'
import { RegisterInput } from '@/lib/zod/auth.schema'
import { useState } from 'react'
import { toast } from 'sonner'

export function useRegister() {
  const [formData, setFormData] = useState<RegisterInput>({
    fullName: '',
    email: '',
    password: '',
    companyName: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signUpAction(formData)

      if (result?.error) {
        setError(result.error)
      }
    } catch {
      toast.error('Erro ao realizar cadastro', {
        description: 'Verifique os dados e tente novamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    handleChange,
    isLoading,
    error,
    handleRegister
  }
}
