'use server'

import { RegisterInput, registerSchema } from '@/lib/zod/auth.schema'
import { tenantService } from '@/services/tenant/tenant.service'
import { redirect } from 'next/navigation'

import { mapErrorMessage } from '@/lib/utils/error-mapper'

export async function signUpAction(data: RegisterInput) {
  const result = registerSchema.safeParse(data)

  if (!result.success) {
    return {
      error: 'Dados inválidos. Verifique os campos e tente novamente.'
    }
  }

  try {
    await tenantService.registerTenantAdmin({
      email: result.data.email,
      password: result.data.password,
      fullName: result.data.fullName,
      companyName: result.data.companyName
    })
  } catch (error: unknown) {
    console.error('[signUpAction] Error:', error)
    return {
      error: mapErrorMessage(error)
    }
  }

  redirect('/dashboard')
}
