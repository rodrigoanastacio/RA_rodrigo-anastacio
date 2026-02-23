'use server'

import { tenantService } from '@/shared/services/tenant/tenant.service'
import { userService } from '@/shared/services/user/user.service'
import { revalidatePath } from 'next/cache'

export async function updateProfileAction(fullName: string) {
  try {
    await userService.updateProfile(fullName)
    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (error: any) {
    console.error('Failed to update profile:', error)
    return {
      success: false,
      message: error.message || 'Erro ao atualizar perfil'
    }
  }
}

export async function uploadLogoAction(formData: FormData) {
  try {
    const file = formData.get('logo') as File
    if (!file) {
      return { success: false, message: 'Nenhum arquivo enviado' }
    }

    const publicUrl = await tenantService.uploadLogo(file)
    revalidatePath('/dashboard/settings')
    return { success: true, logoUrl: publicUrl }
  } catch (error: any) {
    console.error('Failed to upload logo:', error)
    return {
      success: false,
      message: error.message || 'Erro ao fazer upload da logo'
    }
  }
}
