import { loginAction } from '@/app/actions/auth/auth.actions'
import { useState } from 'react'
import { toast } from 'sonner'

export function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await loginAction({ email, password })

      if (result?.error) {
        setError(result.error)
      }
    } catch {
      toast.error('Erro ao realizar login', {
        description: 'Verifique suas credenciais e tente novamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin
  }
}
