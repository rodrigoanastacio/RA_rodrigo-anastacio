'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRegister } from '../hooks/use-register'

export function RegisterForm() {
  const { formData, handleChange, isLoading, error, handleRegister } =
    useRegister()

  return (
    <div className="max-w-[400px] w-full animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Criar sua Conta
        </h2>
        <p className="text-gray-500 mt-3 font-medium">
          Comece a gerenciar seus leads com alta performance hoje mesmo.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-300">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label
            htmlFor="fullName"
            className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]"
          >
            Nome Completo
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="digite seu nome completo"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="companyName"
            className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]"
          >
            Nome da Empresa
          </label>
          <Input
            id="companyName"
            name="companyName"
            type="text"
            placeholder="nome da sua organização"
            required
            value={formData.companyName}
            onChange={handleChange}
            className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]"
          >
            E-mail
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]"
          >
            Senha
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="mínimo 6 caracteres"
            required
            value={formData.password}
            onChange={handleChange}
            className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-extrabold text-sm tracking-widest uppercase shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            {isLoading ? 'Criando Conta...' : 'Começar Agora'}
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400 font-medium">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="text-blue-600 font-bold hover:underline"
          >
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  )
}
