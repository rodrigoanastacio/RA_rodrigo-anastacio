'use client'

import { forgotPasswordAction } from '@/app/actions/auth/auth.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, LayoutTemplate, MailCheck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await forgotPasswordAction({ email })

    if (result?.error) {
      setError(result.error)
      toast.error(result.error)
    } else {
      setIsSent(true)
      toast.success('E-mail de recuperação enviado!')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - Branding */}
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

      {/* Right Side - Form Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12 order-1 md:order-2 bg-[#F9FAFB]">
        <div className="max-w-[400px] w-full animate-in fade-in slide-in-from-right-8 duration-700">
          <Link
            href="/login"
            className="inline-flex items-center text-[11px] font-extrabold text-gray-400 hover:text-blue-600 tracking-widest uppercase transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para o Login
          </Link>

          {!isSent ? (
            <>
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Recuperar Senha
                </h2>
                <p className="text-gray-500 mt-3 font-medium">
                  Insira seu e-mail para receber um link de redefinição de
                  senha.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    disabled={isLoading}
                    className="h-12 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 font-medium px-4"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-extrabold text-sm tracking-widest uppercase shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center md:text-left animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-8 mx-auto md:mx-0">
                <MailCheck className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                E-mail Enviado!
              </h2>
              <p className="text-gray-500 mt-4 font-medium leading-relaxed">
                Verifique sua caixa de entrada (e a pasta de spam) para
                encontrar as instruções de redefinição de senha.
              </p>
              <div className="mt-10">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center w-full h-14 bg-white border-2 border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 text-gray-900 rounded-xl font-extrabold text-sm tracking-widest uppercase transition-all shadow-sm"
                >
                  Entendido
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
