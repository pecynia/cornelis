import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { verifyEmail } from "@/app/_actions";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    emailVerified?: Date | null;
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
        verificationToken: { label: "Verification Token", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, verificationToken } = credentials as {
          email: string;
          password?: string;
          verificationToken?: string;
        };

        try {
          // Find the user
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            console.log("User not found");
            return null;
          }

          // Verification token flow
          if (verificationToken) {
            // Instead of verifying again, check if email is verified
            if (user.emailVerified) {
              return user;
            }
            console.log("Email not verified");
            return null;
          }

          // Regular password login flow
          if (password) {
            if (!user.hashedPassword) {
              console.log("User has no password set");
              return null;
            }

            const passwordValid = await bcrypt.compare(
              password,
              user.hashedPassword
            );
            if (!passwordValid) {
              console.log("Invalid password");
              return null;
            }

            if (!user.emailVerified) {
              console.log("Email not verified");
              return null;
            }

            return user;
          }

          console.log("No authentication method provided");
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/api/auth/signin",
    verifyRequest: "/api/auth/verify-email",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as User).role;
        token.emailVerified = (user as User).emailVerified;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.emailVerified = token.emailVerified as Date | null;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
