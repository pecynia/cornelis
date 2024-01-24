"use client"

import { EventProps } from "@/../../../../typings"
import LocaleIcons from "@/app/[lang]/components/lang/LocaleIcon"
import Image from "next/image"
import { Badge } from '@/app/[lang]/components/ui/badge'
import Link from 'next/link'
import { Locale } from '@../../../i18n.config'
import Lenis from '@studio-freight/lenis'
import React, { useEffect, useState } from 'react'
import { Button } from "./ui/button"


const EventOverview: React.FC<{ allEvents: EventProps[], lang: Locale, agenda: any }> = ({ allEvents, lang, agenda }) => {
    const [dimension, setDimension] = useState({ width: 0, height: 0 })
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothTouch: true,
            normalizeWheel: true,
        })

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener('resize', resize)
        requestAnimationFrame(raf)
        resize()

        return () => {
            lenis.destroy()
            window.removeEventListener('resize', resize)
        }
    }, [])
    return (
        <div className='flex flex-col gap-6 pt-6'>
            {allEvents.length === 0 && <p className='italic text-sm text-white'>{agenda.noFound}</p>}
            {allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event, index) => (
                <div className='flex flex-row justify-between items-center p-2 px-4 rounded-md bg-white' key={index}>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row gap-2 items-center'>
                            <p className='text-lg font-bold'>{event.title}</p>
                            <Badge variant='secondary'>
                                <Image alt={event.language} src={LocaleIcons[event.language]} width={16} />
                                <p className='text-sm pl-1'>{event.language.toUpperCase()}</p>
                            </Badge>
                        </div>
                        <p className='text-sm'>{event.date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <Link href={`/${lang}/register/${event.eventSlug}`}>
                        <Button>
                            <p className="text-sm font-bold">
                                {agenda.registerButton}
                            </p>
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default EventOverview
