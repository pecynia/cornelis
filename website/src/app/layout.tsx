import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import { NextAuthProvider } from "@/lib/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zwemles Planner",
  description: "Log in en plan uw zwemlessen in!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${inter.className} h-full`}>
      <body className='flex min-h-full flex-col font-poppins'>
        <NextAuthProvider>
          {/* <Header /> */}
          <main className="flex-grow">{children}</main>
          {/* <Footer /> */}
        </NextAuthProvider>
      </body>
    </html>
  )
}
