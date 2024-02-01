"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@../../../i18n.config'
import Spokeperson from '@/../public/imgs/spokeperson.jpg'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type ReviewProps = {
    title: string
    subTitle: string
    description: string
    beOurNextSuccessStory: string
    rating: string
}

const ReviewTopSection: React.FC<{ review: ReviewProps, lang: Locale, navigation: any }> = ({ review, lang, navigation }) => {
    return (
        <div className='bg-background pb-28'>
            <div className='max-w-7xl mx-auto px-6 pt-5 lg:pt-0 lg:px-10'>
                <div className='mx-auto w-full sm:w-2/3 lg:w-full flex items-center flex-col lg:flex-row justify-center gap-10'>
                    {/* Text Column */}
                    <div className="flex-1">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                        >
                            <h1 className="text-3xl text-tertiary font-bold">{review.subTitle}</h1>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h2 className="text-2xl mt-4">{review.title}</h2>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button variant="ghost" className="rounded-lg mt-2 -ml-4 underline hover:bg-inherit">
                                <Link href={`/${lang}${navigation.investment.href}`}>
                                    {review.beOurNextSuccessStory} <ArrowRight className="inline-block" size={16} />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Image Column */}
                    <div className="relative flex-1 mt-10 lg:mt-0 hidden lg:block pt-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 }}
                            className='relative'
                        > 
                            <Image src={Spokeperson} alt="Spokesperson" className='object-contain' width={600} />
                        </motion.div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="absolute top-2/3 -right-10 mt-8 px-4"
                            > 
                                <p className="bg-white text-primary py-2 px-6 shadow-right-tertiary">
                                    {review.rating}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ReviewTopSection
