import { LayoutTemplate } from 'lucide-react'
import { LoginForm } from './components/login-form'

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </div>
  )
}
