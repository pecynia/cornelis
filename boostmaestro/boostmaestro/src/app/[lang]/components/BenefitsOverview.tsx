"use client"

import React from 'react'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import { Locale } from '@../../../i18n.config'
import { motion, useScroll, useTransform } from 'framer-motion'

const BenefitsOverview: React.FC<{ lang: Locale }> = ({ lang }) => {
    const documentIds = [
        'benefits-description-1',
        'benefits-description-2',
        'benefits-description-3',
        'benefits-description-4',
        'benefits-description-5'
    ]
    const { scrollYProgress } = useScroll()
    const disappearRight = useTransform(scrollYProgress, [0, 0.3], ['0%', '-30%'])

    return (
        <motion.div layout className='relative container px-4 mx-auto'>
            {/* Descriptive Div */}
            <motion.div
                className="relative mt-40 md:mt-48 ml-auto text-left w-2/3 flex flex-col items-center justify-center"
                style={{ x: disappearRight }}
            >
                <EditorWrapper documentId='benefit-description' initialLocale={lang} />
            </motion.div>

            {/* Overview */}
            <div className="relative -mt-16 w-full md:w-3/4 lg:w-4/5 mx-auto px-16 overflow-hidden">
                {/* <Image 
                    src={Groep4}
                    alt="Groep 4"
                    className="absolute object-cover mt-44 left-0 w-3/4 sm:max-h-[400px] sm:w-2/3 md:1/3 lg:w-2/5 aspect-square opacity-50"
                />
                <Image 
                    src={Groep5}
                    alt="Groep 5"
                    height={500}
                    className="absolute object-cover bottom-0 mb-24 right-0 w-3/4 sm:w-2/3 sm:max-h-[400px] md:1/3 lg:w-2/5 aspect-square opacity-50"
                /> */}
                {documentIds.map((documentId, index) => (
                    <motion.div layout
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: '0%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
                        className={`relative flex items-center max-w-5xl w-4/5 md:w-4/5 lg:2/3 px-4 my-16 md:my-24 bg-white ${index % 2 === 0 ? 'shadow-right-secondary ml-auto' : 'shadow-left-secondary mr-auto'}`}
                    >
                        <EditorWrapper documentId={documentId} initialLocale={lang} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default BenefitsOverview