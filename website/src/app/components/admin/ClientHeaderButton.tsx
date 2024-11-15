"use client"

import { useSession } from 'next-auth/react'
import { HeaderButton } from './HeaderButton'
import { Locale } from '../../../../i18n.config'

const ClientHeaderButtonWrapper = ({ lang }: { lang: Locale }) => {
    const { data: session } = useSession()

    return (
        <>
            {session && <HeaderButton lang={lang} />}
            <div className='text-black items-left justify-center flex-col flex p-10'>
                <p>{session?.user?.id && `User ID: ${session.user.id}`} </p>
                <p>{session?.user?.role && `Role: ${session.user.role}`} </p>
                <p>{session?.user?.email && `Email: ${session.user.email}`} </p>
                <p>{session?.user?.emailVerified && `Email Verified: ${session.user.emailVerified}`}</p>
                <p>{session?.user?.hashedPassword && `Password: ${session.user.hashedPassword}`}</p>
                <p>{session?.user?.name && `Name: ${session.user.name}`}</p>
            </div>
        </>
    )
}

export default ClientHeaderButtonWrapper
