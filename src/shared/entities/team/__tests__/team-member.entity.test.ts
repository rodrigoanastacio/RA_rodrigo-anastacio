import { UserRole } from '@/shared/enums/UserRole'
import { TeamMember } from '../team-member.entity'

describe('TeamMember Entity', () => {
  const mockData = {
    id: 'user-123',
    full_name: 'Usuário Teste',
    email: 'teste@exemplo.com',
    role: UserRole.EDITOR,
    avatar_url: 'https://exemplo.com/avatar.jpg',
    tenant_id: 'tenant-456',
    email_confirmed_at: '2026-03-01T22:00:00Z',
    created_at: '2026-03-01T20:00:00Z',
    updated_at: '2026-03-01T20:00:00Z'
  }

  it('deve instanciar um membro da equipe com os dados corretos', () => {
    const member = new TeamMember(mockData)

    expect(member.id).toBe(mockData.id)
    expect(member.fullName).toBe(mockData.full_name)
    expect(member.email).toBe(mockData.email)
    expect(member.role).toBe(mockData.role)
    expect(member.avatarUrl).toBe(mockData.avatar_url)
  })

  it('deve retornar isActive true quando o e-mail estiver confirmado', () => {
    const member = new TeamMember(mockData)
    expect(member.isActive).toBe(true)
  })

  it('deve retornar isActive false quando o e-mail não estiver confirmado (Pendente)', () => {
    const member = new TeamMember({
      ...mockData,
      email_confirmed_at: null
    })
    expect(member.isActive).toBe(false)
  })

  it('deve converter para um objeto plano corretamente', () => {
    const member = new TeamMember(mockData)
    const plain = member.toPlainObj()

    expect(plain.id).toBe(mockData.id)
    expect(plain.fullName).toBe(mockData.full_name)
    expect(plain.isActive).toBe(true)
  })
})
