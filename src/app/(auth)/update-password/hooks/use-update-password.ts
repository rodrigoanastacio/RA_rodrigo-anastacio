import { updatePasswordAction } from '@/app/actions/auth/auth.actions'
import { createClient } from '@/lib/supabase/client'
import { updatePasswordSchema } from '@/lib/zod/auth.schema'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useUpdatePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    async function exchangeCode() {
      if (code) {
        setIsVerifying(true)
        const supabase = createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          toast.error('O link de recuperação parece inválido ou expirou')
          console.error('[UpdatePassword] Code exchange error:', error.message)
        } else {
          const url = new URL(window.location.href)
          url.searchParams.delete('code')
          window.history.replaceState({}, '', url.toString())
          toast.success('Sessão de recuperação iniciada')
        }
        setIsVerifying(false)
      }
    }
    exchangeCode()
  }, [code])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validation = updatePasswordSchema.safeParse({
      password,
      confirmPassword
    })

    if (!validation.success) {
      const error = validation.error.issues[0]?.message || 'Dados inválidos'
      toast.error(error)
      return
    }

    setIsLoading(true)

    try {
      const result = await updatePasswordAction({ password })

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Senha atualizada com sucesso!')
      }
    } catch {
      toast.error('Ocorreu um erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    isVerifying,
    handleSubmit
  }
}
