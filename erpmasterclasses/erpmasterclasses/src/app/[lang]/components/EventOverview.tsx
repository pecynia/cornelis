// EventOverview.tsx
import React from 'react'
import { EventProps } from "@/../../../../typings"
import LocaleIcons from "@/app/[lang]/components/lang/LocaleIcon"
import Image from "next/image"
import { Badge } from '@/app/[lang]/components/ui/badge'
import Link from 'next/link'
import { Locale } from '@../../../i18n.config'

const EventOverview: React.FC<{ allEvents: EventProps[], lang: Locale, agenda: any }> = ({ allEvents, lang, agenda }) => {
  return (
    <div className='flex flex-col gap-6 pt-6'>
      {allEvents.length === 0 && <p className='italic text-sm text-white'>{agenda.noFound}</p>}
      {allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event, index) => (
        <Link href={`/${lang}/agenda/${event.eventSlug}`} key={index} className=''>
            <div className='flex flex-row  items-center p-2 pl-4 rounded-md bg-white' key={index}>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                    <p className='text-lg font-bold'>{event.title}</p>
                    <Badge variant='secondary'>
                        <Image alt={event.language} src={LocaleIcons[event.language]} width={16} />
                        <p className='text-sm pl-1'>{event.language.toUpperCase()}</p>
                    </Badge>
                    </div>
                    <p className='text-sm'>{new Date(event.date).toLocaleDateString()}</p>
                </div>
            </div>
        </Link>
      ))}
    </div>
  )
}

export default EventOverview
