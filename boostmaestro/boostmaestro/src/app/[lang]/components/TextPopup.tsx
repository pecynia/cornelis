"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import { Locale } from '../../../../i18n.config'


interface Props {
  documentId: string
  currentLocale: Locale
  imgPath: string
  link?: string;
  buttonText?: string;
}

function TextPopup({ documentId, currentLocale, imgPath, link, buttonText }: Props) {
  return (
    <div className='flex flex-col items-center justify-center w-full py-32 relative'>
        <Image 
            src={imgPath}
            alt="Image" 
            fill
            className="object-cover object-center"
        />
        <motion.div 
          initial={{ opacity: 0, y: '100%' }} // Starts off-screen to the left
          whileInView={{ opacity: 1, y: '0%' }} // Comes in to view
          transition={{ type: "spring", ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: true }}
          className='header-shadow-right min-w-[50%] min-h-[20%] max-w-[70%] bg-secondary mb-20 pb-10 flex px-10 pt-4 z-10'
        >
            <EditorWrapper documentId={documentId} link={link} buttonText={buttonText} initialLocale={currentLocale} />
        </motion.div>
      </div>
  )
}

export default TextPopup