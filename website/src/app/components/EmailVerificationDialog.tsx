"use client"

import { toast } from 'sonner'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogTitle } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { verifyEmail } from "@/app/_actions"

const verificationSchema = z.object({
  code: z.string()
    .min(5, 'Code moet 5 cijfers bevatten')
    .max(5, 'Code moet 5 cijfers bevatten')
    .regex(/^\d{5}$/, 'Code moet alleen cijfers bevatten')
})

type VerificationFormInputs = z.infer<typeof verificationSchema>;

interface EmailVerificationDialogProps {
  userId: string;
  email: string;
  lang: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EmailVerificationDialog: React.FC<EmailVerificationDialogProps> = ({ userId, email, lang, isOpen, onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<VerificationFormInputs>({
    resolver: zodResolver(verificationSchema)
  })
  
  const handleFormSubmit = async (data: VerificationFormInputs) => {
    const result = await verifyEmail(userId, data.code)

    if (result.success) {
      onSuccess()
    } else {
      // Handle error
      toast(result.message || 'Failed to verify email')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Verifieer je E-mail</DialogTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='space-y-2'>
            <label htmlFor='code' className='block text-md font-medium text-gray-700'>
              Verificatiecode
            </label>
            <Input
              id='code'
              type='text'
              inputMode='numeric'
              maxLength={5}
              placeholder='Voer de 5-cijferige code in'
              {...register('code')}
            />
            {errors.code ? (
              <div className='text-sm text-red-500'>{errors.code.message}</div>
            ) : null}
          </div>
          <Button
            type='submit'
            className='mt-4 w-full py-2 px-4 rounded'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Verifiëren...
              </>
            ) : (
              'Verifiëren'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EmailVerificationDialog
