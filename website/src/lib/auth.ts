import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { User } from "@prisma/client"
import { DefaultSession } from "next-auth";


// Extend the default session user type to include custom properties
declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

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

          return user as User
        } catch (e) {
          console.error(e)
          return null
        }
      },
    }),    
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/api/auth/signin',
    verifyRequest: '/api/auth/verify-email',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as User).role
        token.emailVerified = (user as User).emailVerified
      }

      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }

      return token
    },
    async session({ session, token }) {
      // Don't put the hashed password in the session
      session.user.emailVerified = token.emailVerified as Date
      session.user.role = token.role as string
      return session;
    },
  },
}
