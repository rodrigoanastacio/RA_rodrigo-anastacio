import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  companyName: z
    .string()
    .min(2, 'O nome da empresa deve ter pelo menos 2 caracteres')
})

export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória')
})

export type LoginInput = z.infer<typeof loginSchema>
