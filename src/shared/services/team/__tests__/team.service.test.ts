import { createAdminClient } from '@/lib/supabase/admin'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { teamService } from '../team.service'

jest.mock('@/shared/api-handlers/team/team.handler')
jest.mock('@/lib/supabase/admin', () => ({
  createAdminClient: jest.fn()
}))

describe('TeamService', () => {
  const mockSupabase = {
    auth: {
      admin: {
        getUserById: jest.fn(),
        listUsers: jest.fn()
      }
    }
  }

  const mockProfiles = [
    { id: 'u-1', full_name: 'Ana', email: 'ana@test.com', role: 'admin' },
    { id: 'u-2', full_name: 'Beto', email: 'beto@test.com', role: 'editor' }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createAdminClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  it('deve enriquecer perfis com o status de confirmação do e-mail (Auth)', async () => {
    mockSupabase.auth.admin.getUserById
      .mockResolvedValueOnce({
        data: { user: { email_confirmed_at: '2026-03-01' } },
        error: null
      })
      .mockResolvedValueOnce({
        data: { user: { email_confirmed_at: null } },
        error: null
      })

    const result = await teamService.enrichMembersWithAuthStatus(
      mockSupabase as any,
      mockProfiles as any
    )

    expect(result).toHaveLength(2)
    expect(result[0].email_confirmed_at).toBe('2026-03-01') // Ativa
    expect(result[1].email_confirmed_at).toBeNull() // Pendente
  })

  it('deve lançar erro se falhar na listagem geral via handler', async () => {
    ;(teamHandler.list as jest.Mock).mockRejectedValue(new Error('DB Error'))

    await expect(teamService.listTeamMembers('tenant-123')).rejects.toThrow(
      'DB Error'
    )
  })

  it('deve formatar membros como objetos planos no listTeamMembers', async () => {
    ;(teamHandler.list as jest.Mock).mockResolvedValue(mockProfiles)
    mockSupabase.auth.admin.getUserById.mockResolvedValue({
      data: { user: { email_confirmed_at: '2026-03-01' } },
      error: null
    })

    const result = await teamService.listTeamMembers('tenant-123')

    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('fullName', 'Ana')
    expect(result[0]).toHaveProperty('isActive', true)
  })
})
