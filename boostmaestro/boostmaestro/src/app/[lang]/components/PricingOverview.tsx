"use client"

import React from 'react'
import { Locale } from '@../../../i18n.config'
import Link from 'next/link'
import { Button } from '@/app/[lang]/components/ui/button'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import { motion } from 'framer-motion'

function PricingOverview({ lang, navigation, pricing }: { lang: Locale, navigation: any, pricing: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className='relative shadow-right-tertiary rounded-xl bg-white pb-10  flex flex-col md:flex-row justify-between items-center md:items-start md:justify-start'
        >
            <div className='w-full md:w-1/2'>
                <h1 className='text-3xl font-bold px-12 pt-10 pb-4'>
                    {pricing.type1.title}
                </h1>
                <hr className='mx-12' />
                <p className='px-12 pt-5'>
                    {pricing.type1.description}
                </p>
                <div className='pl-12 flex flex-col md:flex-row items-start md:items-center md:gap-10 justify-start py-4'>
                    <h1 className='text-3xl md:text-2xl lg:text-3xl text-end font-bold mt-2'>
                        {pricing.type1.price}<span className='text-sm font-light pl-2'>{pricing.type1.perPerson}</span>
                    </h1>
                    <Button variant='tertiary' className="rounded-lg mt-4" size='lg'>
                        <Link href={`/${lang}${navigation.investment.href}#agenda`}>
                            {pricing.type1.buttonText}
                        </Link>
                    </Button>
                </div>
                <p className='text-md font-bold text-tertiary mt-2 px-12 pb-2'>
                    {pricing.type1.discountText}
                </p>

                <hr className='mx-12' />
                <div className='px-8 pt-5'>
                    <EditorWrapper initialLocale={lang} documentId='pricing-card-1-features' />
                </div>
            </div>
            <div className='w-full md:w-1/2 px-8 md:pl-0 md:pr-12'>
                <hr className='block md:hidden mx-4' />
                <div className='mb-5 pt-0 md:pt-12'>
                    <EditorWrapper initialLocale={lang} documentId='pricing-card-1-content' />
                </div>
            </div>
        </motion.div>
    )
}

export default PricingOverview