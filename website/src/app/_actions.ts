"use server"

import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { sendCodeVerificationRequest } from "@/lib/utils/sendCodeVerificationRequest"
import { sendVerificationRequest } from "@/lib/utils/sendVerificationRequest"
import { User } from "@prisma/client"

export async function registerNewUser(
  name: string,
  email: string,
  password: string
) {
  /**
   * This function is used to register a new user
   *
   * @param {string} name - The name of the user
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   *
   * @returns {object} - A JSON object with the success status and a message or an error
   */

  try {
    // Check if name, email and password are provided
    if (!name || !email || !password) {
      return {
        success: false,
        message: "Name, email and password are required",
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save the user to the database with the hashed password
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return {
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: "Error registering user"}
  }
}

export async function userExists(email: string) {
  /**
   * This function is used to check if a user exists
   *
   * @param {string} email - The email of the user
   *
   * @returns {object} - A JSON object with the success status and a message or an error
   */
  try {
    // Connect to database and check if user extists based on the email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return { success: true, userExists: !!user }
  } catch (error) {
    console.log(error)
    return { success: false, userExists: false, message: "Error checking if user exists" }
  }
}

export async function emailIsVerified(email: string) {
  /**
   * Check if the email is verified
   *
   * @param {string} email - The email of the user
   * @returns {object} - A JSON object with the success status and a message or an error
   */
  try {
    // Connect to database and check if user extists based on the email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return { success: false, emailVerified: false, message: "User not found" }
    }
    // user.emailVerified is a DateTime object
    const emailVerified = !!user.emailVerified
    return { success: true, emailVerified: emailVerified }
  }
  catch (error) {
    console.log(error)
    return { success: false, emailVerified: false, message: "Error checking if email is verified" }
  }
}

export async function initiateEmailVerification(email: string, type: "code" | "link") {
  /**
   * This function is used to add a verification token to the user
   *
   * @param {string} email - The email of the user
   * @param {string} type - The type of verification (code or link)
   * @returns {object} - A JSON object with the success status and a message or an error
   */
  try {
    // Connect to database and check if user exists based on the email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return { success: false, message: "User not found" }
    }
    // Send the verification request
    if (type === "code") {
      await sendCodeVerificationRequest({ user })
    } else if (type === "link") {
      await sendVerificationRequest({ user })
    }

    return { success: true, message: "Verification request sent" }
  }
  catch (error) {
    console.log(error)
    return { success: false, message: "Error sending verification request" }
  }
}

export async function verifyEmail(email: string, token: string) {
  /**
   * This function is used to verify the email
   * 
   * @param {string} email - The email of the user
   * @param {string} token - The verification token
   * @returns {object} - A JSON object with  the success status, expired status and a message or an error
   */
  try {
    // Find the userId using the email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    }) as User

    // Find the verification token using the compound unique identifier
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: user.id,
          token: token,
        },
      },
    })

    if (!verificationToken) {
      return { success: false, expired: false, message: "Token not found" }
    }

    // Check if the token is expired
    if (verificationToken.expires < new Date()) {
      // Remove the expired token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: user.id,
            token: token,
          },
        },
      })
      // TODO: check if this edge case is handled and a new link can be send
      return { success: false, expired: true, message: "Token expired" }
    }

    // Update the user's emailVerified field
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
      },
    })

    // Delete the used verification token to prevent reuse
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: user.id,
          token: token,
        },
      },
    })

    return { success: true, expired: false, message: "Email verified" }
  } catch (error) {
    console.log(error)
    return { success: false, expired: false, message: "Error verifying email" }
  }
}