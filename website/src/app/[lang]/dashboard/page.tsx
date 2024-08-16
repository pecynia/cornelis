import React from 'react'
import { Locale } from '@../../../i18n.config'

export default function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <div>
      {lang}
    </div>
  )
}