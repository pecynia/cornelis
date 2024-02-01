import React from 'react'
import { Locale } from '@/app/../../../i18n.config'
import { getEvents } from '@/lib/utils/db'
import { getDictionary } from '@/lib/dictionary'
import EventOverview from '@/app/[lang]/components/EventOverview'
import { Separator } from '@/app/[lang]/components/ui/separator'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const events = await getEvents(lang)
  const { agenda } = await getDictionary(lang)

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 py-8 bg-background">
      <h1 className='text-4xl font-bold pb-6'>{agenda.title}</h1>
      <Separator />
      <EventOverview allEvents={events} lang={lang} agenda={agenda} />
    </div>
  )
}