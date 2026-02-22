import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap'
})

import { Inter } from 'next/font/google'
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  display: 'swap'
})

import { Playfair_Display } from 'next/font/google'
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    template: '%s | Rodrigo Anastacio',
    default: 'Rodrigo Anastacio | Desenvolvimento e Estratégia Digital'
  },
  description:
    'Soluções de alta performance e tecnologia em desenvolvimento e estratégia digital.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rodrigoanastacio.com/',
    siteName: 'Rodrigo Anastacio'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${manrope.variable} ${inter.variable} ${playfair.variable} font-manrope antialiased bg-white text-gray-900 min-h-screen selection:bg-lp-primary selection:text-white`}
      >
        {children}
      </body>
    </html>
  )
}
