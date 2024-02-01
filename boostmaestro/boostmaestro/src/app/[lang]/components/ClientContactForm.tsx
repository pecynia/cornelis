"use client"

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ContactFormSchema } from '@/lib/schema'
import { sendContactEmail } from '@/app/_actions'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export type ContactFormInputs = z.infer<typeof ContactFormSchema>

export type ClientContactFormProps = {
  localization: {
    namePlaceholder: string
    emailPlaceholder: string
    companyNamePlaceholder: string
    messagePlaceholder: string
    submitButtonText: string
    emailSentToast: string
    errorToast: string
  }
  errorMessages: {
    companyNameRequired: string
    nameRequired: string
    emailRequired: string
    invalidEmail: string
    messageRequired: string
    messageMinLength: string
  }
}

const ClientContactForm: React.FC<ClientContactFormProps> = ({ localization, errorMessages }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema)
  })

  const processForm: SubmitHandler<ContactFormInputs> = async data => {
    const result = await sendContactEmail(data)

    if (result?.success) {
      toast.success(localization.emailSentToast)
      reset()
    } else {
      console.error(result?.error)
      toast.error(localization.errorToast)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", ease: "easeInOut", duration: 0.5 }}
      viewport={{ once: true }}
      className='relative min-w-[70%] lg:min-w-[40%] min-h-[20%] max-w-[80%] mb-20 pb-10 flex px-10 pt-4 rounded-xl  bg-white shadow-xl'
    >
      <div className='w-full pt-2'>
        <form onSubmit={handleSubmit(processForm)} className='mx-auto flex flex-1 flex-col gap-4'>
          {/* Company Name Input */}
          <input
            {...register('companyName')}
            placeholder={localization.companyNamePlaceholder}
            className='w-1/2 rounded-lg p-2 border-2 border-gray-100'
          />
          {errors.companyName && <p className='text-sm text-red-400'>{errorMessages.companyNameRequired}</p>}

          {/* Name Input */}
          <input
            {...register('name')}
            placeholder={localization.namePlaceholder}
            className='w-1/2 rounded-lg p-2 border-2 border-gray-100'
          />
          {errors.name && <p className='text-sm text-red-400'>{errorMessages.nameRequired}</p>}

          {/* Email Input */}
          <input
            {...register('email')}
            placeholder={localization.emailPlaceholder}
            className='w-2/3 rounded-lg p-2 border-2 border-gray-100'
          />
          {errors.email && <p className='text-sm text-red-400'>
            {errors.email.message === '1' ? errorMessages.emailRequired : errorMessages.invalidEmail}
          </p>}

          {/* Message Input */}
          <textarea
            {...register('message')}
            rows={5}
            placeholder={localization.messagePlaceholder}
            className='w-full rounded-lg p-2 border-2 border-gray-100'
          />
          {errors.message && <p className='text-sm text-red-400'>
            {errors.message.message === '1' ? errorMessages.messageRequired : errorMessages.messageMinLength}
          </p>}

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            className='rounded-lg bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isSubmitting ? 'Sending...' : localization.submitButtonText}
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default ClientContactForm
