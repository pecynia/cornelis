"use client"

import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import * as z from 'zod'
import { initiateEmailVerification, registerNewUser, userExists } from "@/app/_actions"
import { i18n, Locale } from "@../../../i18n.config"
import { useSearchParams } from 'next/navigation'


const registerSchema = z.object({
    name: z.string().min(1, 'Naam is vereist'),
    email: z.string().email('E-mail is onjuist'),
    password: z.string().min(6, 'Wachtwoord moet minimaal 6 karakters bevatten').max(32, 'Wachtwoord mag maximaal 32 karakters bevatten')
})

type RegisterFormInputs = z.infer<typeof registerSchema>

function validLocale(locale: string): locale is Locale {
    return i18n.locales.includes(locale as Locale)
}

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    let lang = searchParams.get('lang') as Locale
    if (!validLocale(lang)) {
        lang = i18n.defaultLocale
    }

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema)
    })

    const handleFormSubmit = async (data: RegisterFormInputs) => {
        const userExistsResponse = await userExists(data.email)

        if (userExistsResponse.success && userExistsResponse.userExists) {
            setError('email', {
                type: 'manual',
                message: 'Een gebruiker met dit e-mailadres bestaat al'
            })
            return
        }

        const result = await registerNewUser(data.name, data.email, data.password)

        if (result.success) {
            initiateEmailVerification(data.email, 'code')
            router.push(`/api/auth/verify-email?lang=${lang}&email=${encodeURIComponent(data.email)}`)
        } else {
            setError('name', {
                type: 'manual',
                message: 'Er is iets misgegaan. Probeer het opnieuw.'
            })
        }
    }

    return (
        <section className='flex min-h-screen overflow-hidden pt-16 sm:py-28'>
            <div className='mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6 items-center my-auto'>
                <div className='bg-white rounded-xl sm:rounded-5xl w-full -mx-4 flex-auto bg-background px-4 header-shadow-right sm:mx-0 sm:flex-none sm:p-10'>
                    <h1 className='text-2xl font-bold text-center text-gray-900'>Registreer</h1>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className='space-y-2'>
                            <label htmlFor='name' className='block text-md font-medium text-gray-700 -mb-1'>
                                Naam
                            </label>
                            <Input
                                id='name'
                                type='text'
                                required
                                className='mt-1 block w-full text-sm py-2 px-3 border border-gray-300 rounded-md'
                                placeholder='Vul je naam in'
                                {...register('name')}
                                autoFocus
                            />
                            {errors['name'] ? (
                                <div className='text-sm text-red-500'>{errors['name'].message}</div>
                            ) : null}
                        </div>

                        <div className='space-y-2 mt-2'>
                            <label htmlFor='email' className='block text-md font-medium text-gray-700 -mb-1'>
                                E-mail
                            </label>
                            <Input
                                id='email'
                                type='email'
                                required
                                className='mt-1 block w-full text-sm py-2 px-3 border border-gray-300 rounded-md'
                                placeholder='Vul je e-mail in'
                                {...register('email')}
                            />
                            {errors['email'] ? (
                                <div className='text-sm text-red-500'>{errors['email'].message}</div>
                            ) : null}
                        </div>

                        {/* Password  */}
                        <div className='space-y-2 mt-2'>
                            <label htmlFor='password' className='block text-md font-medium text-gray-700 -mb-1'>
                                Wachtwoord
                            </label>
                            <Input
                                id='password'
                                type='password'
                                required
                                className='mt-1 block w-full text-sm py-2 px-3 border border-gray-300 rounded-md'
                                placeholder='Vul je wachtwoord in'
                                {...register('password')}
                            />
                            {errors['password'] ? (
                                <div className='text-sm text-red-500'>{errors['password'].message}</div>
                            ) : null}
                        </div>
                        <Button
                            type='submit'
                            className='mt-3 w-full py-2 px-4 rounded'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Registreren...
                                </>

                            ) : (
                                <>
                                    <UserPlus className="h-5 w-5 mr-2" /> Registreer
                                </>
                            )}
                        </Button>
                        <Link href={`/api/auth/signin?lang=${lang}`}>
                            <p className='text-center mt-4 text-sm text-gray-600 hover:text-gray-900 hover:underline'>
                                Al een account? Log in
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    )
}
