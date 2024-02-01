"use client"

import React, { Suspense, useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent } from '@/app/[lang]/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Locale } from '@../../../i18n.config'
import LocaleSwitchButton from '@/app/[lang]/components/lang/LocaleSwitcher'
import ClientHeaderButtonWrapper from '@/app/[lang]/components/admin/ClientHeaderButtonWrapper'
import { Navigation } from '@/app/[lang]/components/Header'

const MobileNav = ({ routes, lang }: { routes: Navigation, lang: Locale }) => {
    const [open, setOpen] = useState(false)
    const closeSheet = () => setOpen(false)

    const routesArray = Object.values(routes);

    return (
        <div className='lg:hidden flex flex-col items-end'>
            <div className='flex items-center gap-4 w-full justify-end'>
                {/* Admin tool and locale switcher  */}
                <ClientHeaderButtonWrapper />
                
                <Suspense fallback={<div></div>}>
                    <LocaleSwitchButton locale={lang} />
                </Suspense>

                {/* Sheet  */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <div className='flex rounded-full p-2 cursor-pointer'>
                            <Menu className="h-6 text-primary" />
                        </div>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className='flex flex-col gap-4 p-4'>
                            {routesArray.map((route, i) => (
                                <Link key={i} href={`/${lang}${route.href}`} onClick={closeSheet}>
                                    <p className='text-xl'>{route.label}</p>
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default MobileNav
