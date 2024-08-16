import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { NextAuthProvider } from "@/lib/providers"
import Header from "@/app/components/Header"
import { Locale, i18n } from '@/app/../../i18n.config'


const inter = Inter({ subsets: ['latin'] })
  
export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: 'Baseline',
  description: 'Insert a description of your site here',
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
      <body className='flex min-h-full flex-col font-poppins'>
        <NextAuthProvider>
          <Header lang={params.lang} />
          <main className="flex-grow">{children}</main>
          {/* <Footer /> */}
        </NextAuthProvider>
      </body>
    </html>
  )
}
