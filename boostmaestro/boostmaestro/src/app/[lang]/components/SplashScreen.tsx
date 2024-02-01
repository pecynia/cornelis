"use client"

import { motion } from 'framer-motion'
import { Locale } from '@../../../i18n.config'

import React from 'react'

function SplashScreen() {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen bg-primary-foreground z-50'>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
        >
            <h1 className='text-5xl font-bold mb-4'>TITLE</h1>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
        >
            <h2 className='text-2xl font-bold mb-4'>SUBTITLE</h2>
        </motion.div>
    </div>
  )
}

export default SplashScreen