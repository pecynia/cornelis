// /api/auth/signin/page.tsx
"use client"

import { NextPage } from "next"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from "@/app/[lang]/components/ui/button"
import { Input } from "@/app/[lang]/components/ui/input"
import { LogIn } from "lucide-react"
import { ReloadIcon } from "@radix-ui/react-icons"
import Image from 'next/image'
import Logo from '@/../public/logo.png'

let validationSchema = yup.object().shape({
  password: yup.string()
      .required('Wachtwoord is vereist')
      .min(6, 'Wachtwoord moet minimaal 6 karakters bevatten')
      .max(12, 'Wachtwoord mag maximaal 32 karakters bevatten')
})

const SignInPage: NextPage = () => {
  const router = useRouter()
  const { setError, register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
      resolver: yupResolver(validationSchema)
  })

  const handleFormSubmit = async (data: { password: string }) => {
      const result = await signIn('credentials', {
          redirect: false,
          password: data.password
      })

      if (result!.error) {
          setError('password', {
              type: 'manual',
              message: 'Wachtwoord is onjuist'
          })
      } else {
          router.push('/admin')
      }
  }

  return (
      <section className='flex min-h-screen overflow-hidden pt-16 sm:py-28'>
          <div className='mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6 items-center my-auto'>
            <Image 
                src={Logo}
                alt='logo'
                width={200}
                height={200}
            />
              <div className='bg-white rounded-xl sm:rounded-5xl w-full -mx-4 flex-auto bg-background px-4 header-shadow-right sm:mx-0 sm:flex-none sm:p-10'>
                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                      <div className='space-y-2'>
                          <label htmlFor='password' className='block text-md font-medium text-gray-700'>
                              Wachtwoord
                          </label>
                          <Input
                              id='password'
                              type='password'
                              required
                              className='mt-1 block w-full text-md py-2 px-3 border border-gray-300 rounded-md'
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
                  </form>
              </div>
          </div>
      </section>
  )
}

export default SignInPage
