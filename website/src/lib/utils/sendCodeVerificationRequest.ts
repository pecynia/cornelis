import MagicCodeEmail from '@/emails/MagicCodeEmail'
import { resend } from '@/lib/resend'
import crypto from 'crypto'
import { User, VerificationToken } from '@prisma/client'
import prisma from '@/lib/prisma'

export async function sendCodeVerificationRequest({ user }: { user: User }) {
  const verificationToken = crypto.randomInt(10000, 100000).toString() // Generate a 5-digit numeric code
  const verificationTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // Set expiration to 10 minutes

  // Store the verification token and expiration in the database
  await prisma.verificationToken.create({
    data: {
      token: verificationToken,
      expires: verificationTokenExpiresAt,
      identifier: user.id,
    } as VerificationToken,
  })

  try {
    const data = await resend.emails.send({
      from: 'onboarding@boostmaestro.com',
      to: user.email!,
      subject: `Your ${process.env.NEXT_PUBLIC_URL} verification code`,
      text: text({ code: verificationToken }),
      react: MagicCodeEmail({ code: verificationToken, user }),
    })
    return { success: true, data }
  } catch (error) {
    console.log('Failed to send the verification email.', error)
    return { success: false, error }
  }
}

function text({ code }: { code: string }) {
  return `Use the following code to verify your email address: ${code}`
}
