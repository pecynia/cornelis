"use client"

import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Uitleg from '@/../public/imgs/uitleg.jpg'

const AboutTopSection = () => {
    const ref = useRef(null)
    const changingWords = ['Business Trainer', 'Consultant', 'Business Transformer', 'Presenter']

    // Switch between words every 2 seconds
    const [index, setIndex] = React.useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => (index + 1) % changingWords.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [changingWords.length])

    return (
        <div ref={ref} className="relative h-[80vh] mb-10 overflow-hidden flex justify-center">
            {/* Image */}
            <motion.div className="absolute inset-0">
                <Image
                    src={Uitleg}
                    alt="About Image"
                    fill
                    className='object-cover object-center'
                    style={{ objectPosition: 'center 30%' }}
                />
            </motion.div>

            {/* Enhanced Description */}
            <motion.div layout
                className="mt-auto bottom-0 p-10 lg:p-10 lg:px-20 w-3/4 sm:w-2/3 lg:w-1/3 bg-white backdrop-blur-sm rounded-t-xl">
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-center">
                        Guus Krabbenborg
                    </h1>
                    <div className='flex justify-center'>
                        <div className='flex flex-col items-center'>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={changingWords[index]}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.25 }}
                                    className='text-secondary font-bold italic text-2xl'
                                >
                                    {changingWords[index]}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AboutTopSection