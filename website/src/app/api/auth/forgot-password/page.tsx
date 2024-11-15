"use client"

import React from 'react'
import { initiateEmailVerification } from '@/app/_actions'

export default function Page() {
    return (
        <div>
            TODO: Implement forgot password, use the initiateEmailVerification to send the magic link 
            to the user's email address. This page should have an input field for the email address, but 
            should also have a searchparameter for the email address in case the user already filled it in 
            in for example the login page.

            It should also have conditional rendering for the success message, when the message is sent 
            to the user's email address, but also an error message when the email address is not found in
            the database, or if too many requests are made in a short period of time. 

            For this last part we will use the rate limiting middleware in the api/auth/verify-email.ts file.

        </div>
    )
}