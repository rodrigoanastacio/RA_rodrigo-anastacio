import { createAdminClient } from '@/lib/supabase/admin'
import { teamHandler } from '../team.handler'

jest.mock('@/lib/supabase/admin', () => ({
  createAdminClient: jest.fn()
}))

describe('TeamHandler', () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    is: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    auth: {
      admin: {
        inviteUserByEmail: jest.fn()
      }
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createAdminClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  it('deve listar membros da equipe de um tenant corretamente', async () => {
    const mockProfiles = [
      { id: '1', full_name: 'Ana', email: 'ana@test.com', role: 'admin' },
      { id: '2', full_name: 'Beto', email: 'beto@test.com', role: 'editor' }
    ]

    mockSupabase.from.mockReturnThis()
    mockSupabase.select.mockReturnThis()
    mockSupabase.is.mockReturnThis()
    mockSupabase.order.mockReturnThis()
    mockSupabase.eq.mockResolvedValue({ data: mockProfiles, error: null })

    const result = await teamHandler.list(mockSupabase as any, 'tenant-123')

    expect(mockSupabase.from).toHaveBeenCalledWith('profiles')
    expect(mockSupabase.eq).toHaveBeenCalledWith('tenant_id', 'tenant-123')
    expect(result).toHaveLength(2)
    expect(result[0].full_name).toBe('Ana')
  })

  it('deve convidar um novo usuário por e-mail no Supabase', async () => {
    const mockInviteData = {
      full_name: 'Novo Membro',
      email: 'novo@gmail.com',
      role: 'editor' as const
    }

    mockSupabase.auth.admin.inviteUserByEmail.mockResolvedValue({
      data: { user: { id: 'new-id' } },
      error: null
    })

    const result = await teamHandler.invite(mockSupabase as any, mockInviteData)

    expect(mockSupabase.auth.admin.inviteUserByEmail).toHaveBeenCalledWith(
      'novo@gmail.com',
      expect.objectContaining({
        data: expect.objectContaining({ full_name: 'Novo Membro' })
      })
    )
    expect(result.success).toBe(true)
  })

  it('deve lançar erro se o convite falhar no Supabase', async () => {
    const mockInviteData = {
      full_name: 'Novo Membro',
      email: 'novo@gmail.com',
      role: 'editor' as const
    }

    mockSupabase.auth.admin.inviteUserByEmail.mockResolvedValue({
      data: { user: null },
      error: new Error('Rate Limit Exceeded')
    })

    await expect(
      teamHandler.invite(mockSupabase as any, mockInviteData)
    ).rejects.toThrow('Rate Limit Exceeded')
  })
})
