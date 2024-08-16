import '@/styles/globals.css'

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
        {children}
      </body>
    </html>
  )
}
