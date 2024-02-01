import 'server-only'
import type { Locale } from '@/app/../../i18n.config'
import { i18n } from '@/app/../../i18n.config'

const dictionaries = {
  en: () => import('@/app/../dictionaries/en.json').then(module => module.default),
  nl: () => import('@/app/../dictionaries/nl.json').then(module => module.default),
  de: () => import('@/app/../dictionaries/de.json').then(module => module.default),
}

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
      throw new Error(`Invalid locale: ${locale}. Expected one of: ${i18n.locales.join(', ')}`)
  }
  return dictionaries[locale]()
}
