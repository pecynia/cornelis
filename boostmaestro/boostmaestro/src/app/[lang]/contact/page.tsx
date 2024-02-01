import React from 'react'
import ClientContactForm from '@/app/[lang]/components/ClientContactForm'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Image from 'next/image'
import Groep3 from '@/../public/imgs/groep-3.jpg'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const { contact, errorMessages } = await getDictionary(lang);

  return (
    <div className='flex flex-col items-center justify-center w-full py-20 relative'>
      <Image
        src={Groep3}
        alt="Image"
        fill
        className="object-cover object-center blur-sm scale-105"
        style={{ objectPosition: 'center 15%' }}
      />
      <ClientContactForm localization={contact} errorMessages={errorMessages} />
    </div>
  )
}