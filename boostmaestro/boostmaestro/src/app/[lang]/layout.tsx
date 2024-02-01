import '../../styles/globals.css'
import { NextAuthProvider } from "@/lib/providers"
import { HeaderVisibilityProvider } from '@/contexts/HeaderVisibilityContext'
import { Locale, i18n } from '@/app/../../i18n.config'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import Header from '@/app/[lang]/components/Header'
import Footer from "@/app/[lang]/components/Footer"

const inter = Inter({ subsets: ['latin'] })
  
export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: 'ERP Masterclasses',
  description: 'Guus Krabbenborg nodigt u uit voor masterclasses over ERP en digitale transformatie.',
  metadataBase: new URL('https://erpmasterclasses.com'),
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {

  return (
    <html lang={params.lang} className={`${inter.className} h-full`}>
      <body className='flex min-h-full flex-col font-exo'>
        <NextAuthProvider>
          <Header lang={params.lang} />
          <main className='flex-grow'>{children}</main>
          <Footer lang={params.lang} />
        </NextAuthProvider>
      </body>
    </html>
  )
}
