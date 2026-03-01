'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useLogin } from '../hooks/use-login'

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin
  } = useLogin()

  return (
    <div className="max-w-[400px] w-full animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Acessar o Painel
        </h2>
        <p className="text-gray-500 mt-3 font-medium">
          Gerencie e acompanhe todas as suas informações no painel de gestão.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-300">
            {error}
          </div>
        )}
        <div className="space-y-2">
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
            placeholder="digite seu e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]"
            >
              Senha
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-extrabold text-blue-600 hover:text-blue-700 tracking-widest uppercase transition-colors"
            >
              Esqueceu?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="digite sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-extrabold text-sm tracking-widest uppercase shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
          </Button>
        </div>
      </form>

      <div className="mt-10 pt-10 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400 font-medium">
          Não tem acesso?{' '}
          <Link href="/" className="text-blue-600 font-bold hover:underline">
            Fale com o suporte
          </Link>
        </p>
      </div>
    </div>
  )
}
