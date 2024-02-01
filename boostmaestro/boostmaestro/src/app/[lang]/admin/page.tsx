"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import Loading from './loading'
import Container from '@/app/[lang]/components/ui/container'
import AddEvent from '@/app/[lang]/components/admin/AddEvent'
import { getAllEventsAdmin } from '@/app/_actions'
import { EventData } from '@../../../typings'
import EventOverview from '@/app/[lang]/components/admin/EventOverview'
import { Separator } from '@/app/[lang]/components/ui/separator'

const Page = () => {
    const { status, data: session } = useSession()

    const [events, setEvents] = useState<EventData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEventsAdmin()
            setEvents(result)
        }

        fetchData()
    }, [])

    if (status === 'loading') {
        return <Loading />
    }

    return (
        <Container>
            <div className='min-h-[60vh] bg-white rounded-lg shadow-lg p-12 mt-10 mb-10 w-full max-w-4xl mx-auto'>
                <h1 className='font-bold text-4xl mb-8 text-secondary'>Agenda overview</h1>                
                
                {/* Event Overview  */}
                <div className='flex flex-col gap-4'>
                    <p className='text-xl'>Current active events</p>
                    <AddEvent allEvents={events} setEventData={setEvents} />
                </div>
                <Separator className='mt-4 mb-2'/>
                <EventOverview allEvents={events} setEventData={setEvents} />
            </div>
        </Container>
    )
    
}

export default Page
