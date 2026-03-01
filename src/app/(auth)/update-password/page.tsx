'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LayoutTemplate } from 'lucide-react'
import { PasswordStrength } from './components/password-strength'
import { useUpdatePassword } from './hooks/use-update-password'

export default function UpdatePasswordPage() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    isVerifying,
    handleSubmit
  } = useUpdatePassword()

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="md:w-1/2 bg-[#111827] flex items-center justify-center p-8 md:p-12 order-2 md:order-1">
        <div className="max-w-md w-full text-center md:text-left flex flex-col items-center md:items-start transition-all duration-700 animate-in fade-in slide-in-from-left-8">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 mb-8 border border-white/10 group hover:scale-105 transition-transform duration-300">
            <LayoutTemplate className="w-8 h-8" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Gestão <span className="text-blue-400">Leads</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium mt-4 uppercase text-[12px] tracking-[4px]">
            Plataforma de Alta Performance
          </p>

          <div className="mt-12 space-y-6 hidden md:block">
            <div className="flex items-center gap-4 text-gray-400 group">
              <div className="w-1 h-8 bg-blue-500/30 rounded-full group-hover:bg-blue-500 transition-colors" />
              <p className="text-sm font-medium">
                Controle Total da sua Presença Digital
              </p>
            </div>
            <div className="flex items-center gap-4 text-gray-400 group">
              <div className="w-1 h-8 bg-blue-500/30 rounded-full group-hover:bg-blue-500 transition-colors" />
              <p className="text-sm font-medium">
                Gestão de Leads Integrada e Inteligente
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12 order-1 md:order-2 bg-[#F9FAFB]">
        <div className="max-w-[400px] w-full animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Definir Nova Senha
            </h2>
            <p className="text-gray-500 mt-3 font-medium">
              Crie uma senha segura para acessar o painel de gestão.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]"
              >
                Nova Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="digite sua nova senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
              />
              <PasswordStrength password={password} />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]"
              >
                Confirmar Senha
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="confirme sua senha"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading || isVerifying}
                className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-extrabold text-sm tracking-widest uppercase shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
              >
                {isVerifying
                  ? 'Verificando link...'
                  : isLoading
                    ? 'Salvando...'
                    : 'Salvar Senha'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
