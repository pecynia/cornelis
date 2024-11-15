import React from 'react'
import { Locale } from '@../../../i18n.config'

export default function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-4xl font-bold text-left'>
        Welcome to GIT Delta
      </h1>
    </div>
  )
}