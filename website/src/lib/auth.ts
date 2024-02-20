import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string, password: string };

        try {
          await connectMongoDB()
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

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
