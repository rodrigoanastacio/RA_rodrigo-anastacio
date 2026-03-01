export function mapErrorMessage(error: unknown): string {
  if (!error) return 'Ocorreu um erro inesperado.'

  let message = ''
  let code = ''

  if (typeof error === 'string') {
    message = error
  } else if (error && typeof error === 'object') {
    const errObj = error as Record<string, unknown>
    message = String(errObj.message || errObj.error_description || '')
    code = String(errObj.code || '')
  }

  if (message.includes('email rate limit exceeded')) {
    return 'Muitas tentativas em pouco tempo. Por favor, aguarde alguns minutos antes de tentar novamente.'
  }

  if (
    message.includes('User already registered') ||
    message.includes('already exists')
  ) {
    return 'Este e-mail já está cadastrado em nossa plataforma.'
  }

  if (message.includes('Signup disabled')) {
    return 'O cadastro de novos usuários está temporariamente desativado.'
  }

  if (message.includes('Invalid login credentials')) {
    return 'E-mail ou senha inválidos.'
  }

  if (message.includes('Password should be')) {
    return 'A senha não atende aos requisitos de segurança.'
  }

  if (code === '23505') {
    if (message.includes('slug')) {
      return 'Este nome de empresa já está em uso ou é muito similar a um existente. Tente um nome diferente.'
    }
    return 'Já existe um registro com estes dados.'
  }

  if (message) {
    return 'Ocorreu um erro ao processar sua solicitação. Verifique os dados e tente novamente.'
  }

  return 'Erro inesperado. Se o problema persistir, entre em contato com o suporte.'
}
