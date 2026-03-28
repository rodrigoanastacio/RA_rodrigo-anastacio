import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { teamHandler } from '@/shared/api-handlers/team/team.handler'
import { teamService } from '@/shared/services/team/team.service'
import { DELETE, GET, POST } from '../route'

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn()
}))

jest.mock('@/lib/supabase/admin', () => ({
  createAdminClient: jest.fn()
}))

jest.mock('@/shared/api-handlers/team/team.handler', () => ({
  teamHandler: {
    list: jest.fn(),
    delete: jest.fn()
  }
}))

jest.mock('@/shared/services/team/team.service', () => ({
  teamService: {
    enrichMembersWithAuthStatus: jest.fn()
  }
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}))

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => {
      return {
        status: init?.status ?? 200,
        json: async () => body
      }
    }),
    redirect: jest.fn()
  }
}))

describe('/api/team', () => {
  const mockCreateClient = createClient as jest.Mock
  const mockCreateAdminClient = createAdminClient as jest.Mock

  const mockAuthGetUser = jest.fn()
  const mockSupabaseServer = {
    auth: { getUser: mockAuthGetUser }
  }

  const mockAdminFrom = jest.fn().mockReturnThis()
  const mockAdminSelect = jest.fn().mockReturnThis()
  const mockAdminEq = jest.fn().mockReturnThis()
  const mockAdminSingle = jest.fn()
  const mockAdminAuthInvite = jest.fn()
  const mockAdminUpsert = jest.fn()
  const mockAdminAuthUpdateUser = jest.fn()

  const mockSupabaseAdmin = {
    from: mockAdminFrom,
    select: mockAdminSelect,
    eq: mockAdminEq,
    single: mockAdminSingle,
    upsert: mockAdminUpsert,
    auth: {
      admin: {
        inviteUserByEmail: mockAdminAuthInvite,
        updateUserById: mockAdminAuthUpdateUser
      }
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockCreateClient.mockResolvedValue(mockSupabaseServer)
    mockCreateAdminClient.mockReturnValue(mockSupabaseAdmin)
  })

  describe('GET', () => {
    it('deve retornar 401 se nao estiver autenticado', async () => {
      mockAuthGetUser.mockResolvedValueOnce({ data: { user: null } })

      const response = await GET()
      expect(response.status).toBe(401)
    })

    it('deve listar membros do mesmo tenant protegido por RLS bypass mitigado', async () => {
      mockAuthGetUser.mockResolvedValueOnce({
        data: { user: { id: 'user-1' } }
      })

      mockAdminSingle.mockResolvedValueOnce({ data: { tenant_id: 'tenant-1' } })

      const mockProfiles = [{ id: '1' }]
      const mockEnriched = [{ id: '1', email_confirmed_at: '2023-01-01' }]

      ;(teamHandler.list as jest.Mock).mockResolvedValueOnce(mockProfiles)
      ;(
        teamService.enrichMembersWithAuthStatus as jest.Mock
      ).mockResolvedValueOnce(mockEnriched)

      const response = await GET()
      const json = await response.json()

      expect(mockAdminFrom).toHaveBeenCalledWith('profiles')
      expect(mockAdminEq).toHaveBeenCalledWith('id', 'user-1')
      expect(teamHandler.list).toHaveBeenCalledWith(
        mockSupabaseAdmin,
        'tenant-1'
      )
      expect(json).toEqual(mockEnriched)
    })
  })

  describe('POST', () => {
    it('deve validar schema zod no body e lancar 400 se invalido', async () => {
      mockAuthGetUser.mockResolvedValueOnce({
        data: { user: { id: 'user-1' } }
      })
      mockAdminSingle.mockResolvedValueOnce({
        data: { role: 'admin', tenant_id: 'tenant-1' }
      })

      const req = new Request('http://localhost:3000/api/team', {
        method: 'POST',
        body: JSON.stringify({ role: 'admin' })
      })

      const response = await POST(req)
      expect(response.status).toBe(400)
    })
  })

  describe('DELETE', () => {
    it('deve retornar 403 se tentar apagar um usuario de outro tenant', async () => {
      mockAuthGetUser.mockResolvedValueOnce({
        data: { user: { id: 'user-admin' } }
      })

      mockAdminSingle.mockResolvedValueOnce({
        data: { role: 'admin', tenant_id: 'tenant-A' }
      })
      mockAdminSingle.mockResolvedValueOnce({ data: { tenant_id: 'tenant-B' } })

      const req = new Request('http://localhost:3000/api/team?id=target-123', {
        method: 'DELETE'
      })

      const response = await DELETE(req)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('Forbidden')
      expect(teamHandler.delete).not.toHaveBeenCalled()
    })

    it('deve apagar apenas usuarios do mesmo tenant_id', async () => {
      mockAuthGetUser.mockResolvedValueOnce({
        data: { user: { id: 'user-admin' } }
      })

      mockAdminSingle.mockResolvedValueOnce({
        data: { role: 'admin', tenant_id: 'tenant-A' }
      })
      mockAdminSingle.mockResolvedValueOnce({ data: { tenant_id: 'tenant-A' } })

      mockAdminAuthUpdateUser.mockResolvedValueOnce({ error: null })
      ;(teamHandler.delete as jest.Mock).mockResolvedValueOnce({
        success: true
      })

      const req = new Request('http://localhost:3000/api/team?id=target-123', {
        method: 'DELETE'
      })

      const response = await DELETE(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(teamHandler.delete).toHaveBeenCalledWith(
        mockSupabaseAdmin,
        'target-123'
      )
    })
  })
})
