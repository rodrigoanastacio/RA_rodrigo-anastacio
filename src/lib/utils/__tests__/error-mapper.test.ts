import { mapErrorMessage } from '@/lib/utils/error-mapper'

describe('error-mapper.ts', () => {
  it('deve retornar mensagem amigável para rate limit de e-mail', () => {
    const error = { message: 'email rate limit exceeded' }
    const result = mapErrorMessage(error)
    expect(result).toBe(
      'Muitas tentativas em pouco tempo. Por favor, aguarde alguns minutos antes de tentar novamente.'
    )
  })

  it('deve retornar mensagem amigável para e-mail já registrado', () => {
    const error = { message: 'User already registered' }
    const result = mapErrorMessage(error)
    expect(result).toBe('Este e-mail já está cadastrado em nossa plataforma.')
  })

  it('deve lidar com erros no formato de string', () => {
    const error = 'Invalid login credentials'
    const result = mapErrorMessage(error)
    expect(result).toBe('E-mail ou senha inválidos.')
  })

  it('deve retornar mensagem genérica para erros desconhecidos', () => {
    const error = { message: 'Something very weird happened' }
    const result = mapErrorMessage(error)
    expect(result).toContain('Ocorreu um erro ao processar sua solicitação')
  })
})
