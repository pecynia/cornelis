"use client"

import { useSession } from 'next-auth/react'
import { HeaderButton } from './HeaderButton'
import { Locale } from '../../../../i18n.config'

const ClientHeaderButtonWrapper = ( { lang }: { lang: Locale } ) => {
    const { data: session } = useSession()

    return (
        <>
            {session && <HeaderButton lang={lang} />}
        </>
    )
}

export default ClientHeaderButtonWrapper