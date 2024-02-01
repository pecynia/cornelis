

"use client"

import React, { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ClientHeaderButtonWrapper from '@/app/[lang]/components/admin/ClientHeaderButtonWrapper'
import LocaleSwitchButton from '@/app/[lang]/components/lang/LocaleSwitcher'
import { Locale } from '../../../../i18n.config'
import { Navigation } from '@/app/[lang]/components/Header'

const DesktopNav = ({ routes, lang }: { routes: Navigation, lang: Locale }) => {
    const pathname = usePathname()
    const path = pathname.split('#')[0]

    const routesArray = Object.values(routes);

    return (
        <div className='hidden lg:block'>
            <nav className='flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                    {routesArray.map((navItem, index) => (
                        <button key={index}>
                            <Link key={index} href={`/${lang}${navItem.href}`} className='px-2'>
                                <span className={`textWithAnimatedUnderline transition-colors text-primary text-md ${path === `/${lang}${navItem.href}` ? 'textWithUnderline' : ''}`} >
                                    {navItem.label}
                                </span>
                            </Link>
                        </button>
                    ))}
                </div>
                <div className='flex items-center gap-4 pr-4'>
                    <ClientHeaderButtonWrapper />
                    <Suspense fallback={<div></div>}>
                        <LocaleSwitchButton locale={lang} />
                    </Suspense>                </div>
            </nav>
        </div>

    )
}

export default DesktopNav
