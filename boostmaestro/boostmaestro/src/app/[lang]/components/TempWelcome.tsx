"use client"

import React, { Suspense } from 'react'
import ClientContactForm from '@/app/[lang]/components/ClientContactForm'
import { Locale } from '@../../../i18n.config'
import LocaleSwitchButton from '@/app/[lang]/components/lang/LocaleSwitcher'
import { motion } from 'framer-motion'

export default function TempWelcome({ lang, contact, errorMessages }: { lang: Locale, contact: any, errorMessages: any }) {

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen relative overflow-hidden'>
            <div className='absolute top-0 right-0 px-4 py-4'>
                <Suspense fallback={<div></div>}>
                    <LocaleSwitchButton locale={lang} />
                </Suspense>
            </div>

            <div className='absolute top-0 left-0 px-4 py-4'>
                <h1 className='text-3xl sm:text-4xl font-normal font-primary'>Boost Maestro</h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", ease: "easeInOut", duration: 0.5, delay: 0.2}}
                viewport={{ once: true }}
            >
                <h1 className='text-3xl sm:text-4xl font-normal font-primary pb-4 pt-14 sm:pt-0 z-10'>{contact.title}</h1>
            </motion.div>

            <ClientContactForm localization={contact} errorMessages={errorMessages} />
        </div>
    )
}