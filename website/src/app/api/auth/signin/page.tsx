// /api/auth/signin/page.tsx
"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { LogIn, UserPlus } from "lucide-react"
import { ReloadIcon } from "@radix-ui/react-icons"
import Link from "next/link"

let validationSchema = yup.object().shape({
    password: yup.string()
        .required('Wachtwoord is vereist')
        .min(6, 'Wachtwoord moet minimaal 6 karakters bevatten')
        .max(12, 'Wachtwoord mag maximaal 32 karakters bevatten'),
    email: yup.string()
        .required('E-mail is vereist')
        .email('E-mail is onjuist')
})

const SignInPage = () => {
    const router = useRouter()
    const { setError, register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const handleFormSubmit = async (data: { password: string, email: string }) => {
        const result = await signIn('credentials', {
            redirect: false,
            password: data.password,
            email: data.email
        })

        if (result!.error) {
            setError('password', {
                type: 'manual',
                message: 'Password is incorrect'
            })
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <section className='flex min-h-screen overflow-hidden pt-16 sm:py-28'>
            <div className='mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6 items-center my-auto'>
                <div className='bg-white rounded-xl sm:rounded-5xl w-full -mx-4 flex-auto bg-background px-4 header-shadow-right sm:mx-0 sm:flex-none sm:p-10'>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className='space-y-2'>
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
                                autoFocus
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
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                                </>

                            ) : (
                                <>
                                    <LogIn className="h-5 w-5 mr-2" /> Log in
                                </>
                            )}
                        </Button>
                        <Link href='/api/auth/register'>
                            <p className='text-center mt-4 text-sm text-gray-600 hover:text-gray-900 hover:underline'>
                                <UserPlus className="h-4 w-4 inline-block -mt-1" /> Nog geen account? Registreer
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignInPage
