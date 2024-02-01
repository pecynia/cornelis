"use client"

import React, { useRef } from 'react'
import { Locale } from '@../../../i18n.config'
import { motion, useScroll, useTransform } from 'framer-motion'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import Image from 'next/image'
import Groep3 from '@/../public/imgs/groep-3.jpg'


const HomeOverview: React.FC<{ lang: Locale }> = ({ lang }) => {

    return (
        <div className='bg-background relative'>
            <div className="relative container mx-auto px-4">
                <motion.div className="flex flex-col md:flex-row md:space-x-4 mt-4 gap-2 pt-6 pb-2"
                >
                    <EditorWrapper documentId='home-description' initialLocale={lang} />
                </motion.div>
            </div>
            <div className='relative mt-10 px-4 md:px-12 overflow-hidden'>
                <Image
                    src={Groep3}
                    alt="Image"
                    fill
                    className="object-cover object-center blur-sm scale-105 "
                    style={{ objectPosition: 'center 15%' }}
                />                
                <div className="relative w-full pb-36">
                    <div className='rounded-b-3xl flex bg-background flex-col pt-4 container px-8 md:px-16 pb-40 md:pb-32 lg:pb-24 min-h-screen'>
                        <EditorWrapper documentId='home-letter' initialLocale={lang} />
                    </div>
                </div>
            </div>
        </div>
    )
}







export default HomeOverview