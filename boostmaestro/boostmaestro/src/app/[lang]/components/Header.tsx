import React from 'react'
import { Locale } from '@/app/../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { HeaderClient } from '@/app/[lang]/components/HeaderClient'
import MobileNav from '@/app/[lang]/components/MobileNav'
import DesktopNav from '@/app/[lang]/components/DesktopNav'

interface Route {
  label: string;
  href: string;
}

export interface Navigation {
  [key: string]: Route
}

interface Dictionary {
  navigation: Navigation
}

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang) as Dictionary
  return (
    <HeaderClient className='sticky z-50 top-0 left-0 w-full bg-secondary-foreground px-10 py-5 transition-transform duration-300'>
      <MobileNav routes={navigation} lang={lang} />
      <DesktopNav routes={navigation} lang={lang} />
    </HeaderClient>
  )
}
