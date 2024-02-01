"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import React from "react"

export function NextAuthProvider({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-center" duration={1500} richColors expand closeButton />
    </SessionProvider>
  )
}