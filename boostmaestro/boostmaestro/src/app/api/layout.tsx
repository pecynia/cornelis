import '../../styles/globals.css'

export const metadata = {
  title: 'Login',
  description: 'Welkom bij de login pagina',
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
