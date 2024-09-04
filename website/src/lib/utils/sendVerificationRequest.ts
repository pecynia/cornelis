import MagicLinkEmail from "@/emails/MagicLinkEmail"
import { resend } from "@/lib/resend"
import crypto from "crypto"
import { User, VerificationToken } from "@prisma/client"
import prisma from "@/lib/prisma"

export async function sendVerificationRequest({ user }: { user: User }) {
  const verificationToken = crypto.randomBytes(16).toString("hex") // Generate a 32-character hexadecimal string
  const verificationTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // Set expiration to 1 hour

  // Check if there is no other verification token for the user id
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: user.id,
    },
  })

  if (existingToken) {
    // Remove the existing token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: existingToken.identifier,
          token: existingToken.token,
        },
      },
    })
  }

  // Store the verification token and expiration in the database
  await prisma.verificationToken.create({
    data: {
      token: verificationToken,
      expires: verificationTokenExpiresAt,
      identifier: user.id,
    } as VerificationToken,
  })

  try {
    const url = `${process.env.NEXT_PUBLIC_URL}/api/auth/verify-email?email=${user.email}&token=${verificationToken}`
    const data = await resend.emails.send({
      from: "onboarding@boostmaestro.com",
      to: user.email!,
      subject: `Your ${process.env.NEXT_PUBLIC_URL} verification code`,
      text: text({ url }),
      react: MagicLinkEmail({ url, host: process.env.NEXT_PUBLIC_URL! }),
    })
    return { success: true, data }
  } catch (error) {
    console.log("Failed to send the verification email.", error)
    return { success: false, error }
  }
}

function text({ url }: { url: string }) {
  return `Use the following link to verify your email address: ${url}`
}
