import React from 'react'
import AboutOverview from '@/app/[lang]/components/AboutOverview'
import AboutTopSection from '@/app/[lang]/components/AboutTopSection'
import { Locale } from '@../../../i18n.config'
import AboutFooter from '@/app/[lang]/components/AboutFooter'

export default function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <div className='bg-white'>
      <AboutTopSection />
      <AboutOverview lang={lang} />
      <AboutFooter lang={lang} />
    </div>
  )
}

