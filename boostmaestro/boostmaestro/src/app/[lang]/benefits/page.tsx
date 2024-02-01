import React from 'react'
import { Locale } from '../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import BenefitsTopSection from '@/app/[lang]/components/BenefitsTopSection'
import BenefitsOverview from '@/app/[lang]/components/BenefitsOverview'
import BenefitsFooter from '@/app/[lang]/components/BenefitsFooter'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { benefits } = await getDictionary(lang)

  return (
    <>
      <BenefitsTopSection benefits={benefits} lang={lang} />
      <BenefitsOverview lang={lang} />
      <BenefitsFooter lang={lang} />
    </>
  )
}