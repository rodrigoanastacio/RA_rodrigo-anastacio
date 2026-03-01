import { createClient } from '@/lib/supabase/server'
import { tenantHandler } from '@/shared/api-handlers/tenant/tenant.handler'
import { userHandler } from '@/shared/api-handlers/user/user.handler'
import { tenantService } from '../tenant.service'

jest.mock('@/lib/supabase/server')
jest.mock('@/shared/api-handlers/tenant/tenant.handler')
jest.mock('@/shared/api-handlers/user/user.handler')

describe('tenantService.registerTenantAdmin', () => {
  const mockSupabase = {
    auth: {
      signUp: jest.fn()
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.Mock).mockResolvedValue(mockSupabase)
  })

  it('deve orquestrar o registro completo com sucesso', async () => {
    const registrationData = {
      email: 'teste@empresa.com',
      password: 'password123',
      fullName: 'Admin Teste',
      companyName: 'Empresa Teste'
    }

    const mockAuthUser = { id: 'user-123', email: registrationData.email }
    const mockTenant = {
      id: 'tenant-123',
      name: registrationData.companyName,
      slug: 'empresa-teste'
    }

    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: mockAuthUser },
      error: null
    })
    ;(tenantHandler.create as jest.Mock).mockResolvedValue(mockTenant)
    ;(userHandler.createProfile as jest.Mock).mockResolvedValue({})

    const result = await tenantService.registerTenantAdmin(registrationData)

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: registrationData.email,
      password: registrationData.password,
      options: {
        data: { full_name: registrationData.fullName }
      }
    })

    expect(tenantHandler.create).toHaveBeenCalledWith(mockSupabase, {
      name: registrationData.companyName,
      slug: 'empresa-teste'
    })

    expect(userHandler.createProfile).toHaveBeenCalledWith(mockSupabase, {
      id: mockAuthUser.id,
      full_name: registrationData.fullName,
      tenant_id: mockTenant.id,
      role: 'admin'
    })

    expect(result).toEqual({ user: mockAuthUser, tenant: mockTenant })
  })

  it('deve lançar erro se o signUp do auth falhar', async () => {
    const errorMsg = 'Auth failed'
    const mockError = new Error(errorMsg)

    mockSupabase.auth.signUp.mockResolvedValueOnce({
      data: { user: null },
      error: mockError
    })

    await expect(
      tenantService.registerTenantAdmin({
        email: 'erro@teste.com',
        password: 'password123',
        fullName: 'User Test',
        companyName: 'Company Test'
      })
    ).rejects.toThrow(errorMsg)
  })
})
