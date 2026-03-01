import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { authService } from '../auth.service'

jest.mock('@/lib/supabase/server')
jest.mock('@/lib/supabase/client')

describe('authService', () => {
  const mockSupabase = {
    auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      getUser: jest.fn()
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createServerClient as jest.Mock).mockResolvedValue(mockSupabase)
    ;(createBrowserClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  describe('signIn', () => {
    it('deve realizar login com sucesso', async () => {
      const loginData = { email: 'test@example.com', password: 'password123' }
      const mockResult = { data: { user: { id: '123' } }, error: null }
      mockSupabase.auth.signInWithPassword.mockResolvedValue(mockResult)

      const result = await authService.signIn(loginData)

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: loginData.email,
        password: loginData.password
      })
      expect(result).toEqual(mockResult.data)
    })

    it('deve lançar erro se o login falhar', async () => {
      const loginData = {
        email: 'error@example.com',
        password: 'wrongpassword'
      }
      const mockError = { message: 'Invalid credentials' }
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: mockError
      })

      await expect(authService.signIn(loginData)).rejects.toEqual(mockError)
    })
  })

  describe('signOut', () => {
    it('deve realizar logout com sucesso', async () => {
      mockSupabase.auth.signOut.mockResolvedValue({ error: null })
      await authService.signOut()
      expect(mockSupabase.auth.signOut).toHaveBeenCalled()
    })
  })
})
