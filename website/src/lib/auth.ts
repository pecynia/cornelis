import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        password: { label: "Wachtwoord", type: "password" },
      },
      async authorize(credentials) {
        const { password } = credentials as { password: string }
                if (password === process.env.ADMIN_PASSWORD) {
                    return { id: "1", name: "Admin" }
                } else {
                    return null
                }
      },
    }),
  ],
  pages: {
    signIn: '/api/auth/signin',
  },
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }

      return token
    }
  },
}
