import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider from 'next-auth/providers/email'
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string, password: string }

        try {
          // Check if the user exists in postgress database
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          })

          if (!user) {
            return null
          }

          // Check if the password is correct
          const passwordsMatch = bcrypt.compare(password, user.hashedPassword)

          if (!passwordsMatch) {
            return null
          }

          return user
        } catch (e) {
          console.error(e)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
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
