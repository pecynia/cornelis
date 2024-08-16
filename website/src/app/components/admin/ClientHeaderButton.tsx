"use client"

import { useSession } from 'next-auth/react'
import { HeaderButton } from './HeaderButton'
import { Locale } from '../../../../i18n.config'

const ClientHeaderButtonWrapper = ({ lang }: { lang: Locale }) => {
    const { data: session } = useSession()

    return (
        <>
            <div className='text-black items-center justify-center flex-col flex'>
                {session?.user?.id && `User ID: ${session.user.id}`} 
                {session?.user?.role && `Role: ${session.user.role}`} 
                {session?.user?.email && `Email: ${session.user.email}`} 
                {session?.user?.emailVerified && `Email Verified: ${session.user.emailVerified}`}
                {session?.user?.hashedPassword && `Password: ${session.user.hashedPassword}`}
                {session?.user?.name && `Name: ${session.user.name}`}
            </div>
            {session && <HeaderButton lang={lang} />}
        </>
    )
}

export default ClientHeaderButtonWrapper
