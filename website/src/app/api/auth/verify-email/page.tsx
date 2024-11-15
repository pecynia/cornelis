"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"
import { verifyEmail, emailIsVerified, initiateEmailVerification } from "@/app/_actions"
import { Locale, i18n } from "@../../../i18n.config"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

let validationSchema = yup.object().shape({
    email: yup.string().email('E-mail is onjuist').required('E-mail is vereist'),
    token: yup.string().min(5, 'Token moet 5 karakters bevatten').max(5, 'Token moet 5 karakters bevatten').required('Token is vereist'),
})

function validLocale(locale: string): locale is Locale {
    return i18n.locales.includes(locale as Locale)
}

export default function VerifyEmailPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [verificationError, setVerificationError] = useState<string | null>(null)
    const [isTokenExpired, setIsTokenExpired] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    let lang = searchParams.get('lang') as Locale
    if (!validLocale(lang)) {
        lang = i18n.defaultLocale
    }
    const email = searchParams.get('email') || ''
    const token = searchParams.get('token') || ''

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: email,
            token: token // Initialize token if provided in URL
        }
    })

    // Check if the email is already verified
    useEffect(() => {
        const checkEmailVerification = async () => {
            if (email && !token) {
                const emailVerificationResult = await emailIsVerified(email)
                if (emailVerificationResult.success && emailVerificationResult.emailVerified) {
                    toast('Email already verified, please log in.')
                    router.push(`/api/auth/signin?lang=${lang}&email=${encodeURIComponent(email)}`)
                }
            }
        }
        checkEmailVerification()
    }, [email, token, lang, router])

    // Set form values from URL parameters
    useEffect(() => {
        if (email) setValue('email', email)
        if (token) setValue('token', token)
    }, [email, token, setValue])

    // Automatically submit if both email and token are provided
    useEffect(() => {
        if (email && token) {
            handleFormSubmit({ email, token })
        }
    }, [email, token])

    const handleFormSubmit = async (data: { email: string, token: string }) => {
        setIsSubmitting(true)
        setVerificationError(null)
        setIsTokenExpired(false)

        try {
            // First verify the email
            const verifyResult = await verifyEmail(data.email, data.token)

            if (!verifyResult.success) {
                if (verifyResult.expired) {
                    setIsTokenExpired(true)
                }
                setVerificationError(verifyResult.message)
                return
            }

            // Only attempt sign in if verification was successful
            const signInResult = await signIn('credentials', {
                email: data.email,
                verificationToken: data.token,
                redirect: false,
            })

            if (signInResult?.error) {
                console.error('Sign in error:', signInResult.error)
                setVerificationError("Error signing in after verification")
                return
            }

            if (signInResult?.ok) {
                router.push(`/${lang}/dashboard`)
            }
        } catch (error) {
            console.error('Verification error:', error)
            setVerificationError("Error during verification process")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResendToken = async () => {
        if (!email) return

        try {
            const result = await initiateEmailVerification(email, 'code')
            if (result.success) {
                toast('Verification code has been resent to your email.')
                setIsTokenExpired(false) // Reset expired state after sending new token
                setVerificationError(null) // Clear any existing errors
            } else {
                setVerificationError(result.message)
            }
        } catch (error) {
            console.error('Error resending token:', error)
            setVerificationError("Error sending verification code")
        }
    }

    return (
        <section className='flex min-h-screen overflow-hidden pt-16 sm:py-28'>
            <div className='mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6 items-center my-auto'>
                <div className='bg-white rounded-xl sm:rounded-5xl w-full -mx-4 flex-auto bg-background px-4 header-shadow-right sm:mx-0 sm:flex-none sm:p-10'>
                    <h1 className='text-2xl font-bold text-center'>Verify your Email</h1>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className='space-y-2'>
                            <label htmlFor='email' className='block text-md font-medium text-gray-700 -mb-1'>
                                E-mail
                            </label>
                            <Input
                                id='email'
                                type='email'
                                disabled={!!email}
                                className='mt-1 block w-full text-sm py-2 px-3 border border-gray-300 rounded-md'
                                placeholder='Vul je e-mail in'
                                {...register('email')}
                            />
                            {errors.email && (
                                <div className='text-sm text-red-500'>{errors.email.message}</div>
                            )}
                        </div>

                        <div className='space-y-2 mt-2'>
                            <label htmlFor='token' className='block text-md font-medium text-gray-700 -mb-1'>
                                Verificatie Token
                            </label>
                            <Input
                                id='token'
                                type='text'
                                className='mt-1 block w-full text-sm py-2 px-3 border border-gray-300 rounded-md'
                                placeholder='Vul je token in'
                                {...register('token')}
                            />
                            {errors.token && (
                                <div className='text-sm text-red-500'>{errors.token.message}</div>
                            )}
                        </div>

                        {verificationError && (
                            <div className='text-sm text-red-500 mt-2'>{verificationError}</div>
                        )}

                        <Button
                            type='submit'
                            className='mt-3 w-full py-2 px-4 rounded'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                                </>
                            ) : (
                                'Verify Email'
                            )}
                        </Button>

                        {(isTokenExpired || verificationError) && (
                            <Button
                                type='button'
                                variant="outline"
                                onClick={handleResendToken}
                                className='mt-3 w-full py-2 px-4 rounded'
                            >
                                Resend Verification Code
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}