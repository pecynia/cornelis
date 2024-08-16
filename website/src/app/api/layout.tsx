import '@/styles/globals.css'
import { Suspense } from 'react'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Login',
  description: 'This is the Auth path',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
        <Toaster position="top-center" duration={1500} richColors expand closeButton />
      </body>
    </html>
  )
}
