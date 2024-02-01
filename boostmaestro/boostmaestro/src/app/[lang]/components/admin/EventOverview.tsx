"use client"

import { Badge } from '@/app/[lang]/components/ui/badge'
import { EventData, RegistrationFormProps } from "@/../../../../typings"
import LocaleIcons from "@/app/[lang]/components/lang/LocaleIcon"
import Image from "next/image"
import DeleteEvent from "@/app/[lang]/components/admin/DeleteEvent"
import React, { useState } from 'react'
import UpdateEvent from "@/app/[lang]/components/admin/UpdateEvent"
import { Coins, UserRound, Trash2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/app/[lang]/components/ui/dialog"
import { removeRegistration } from '@/app/_actions'
import { toast } from 'sonner'


const EventOverview: React.FC<{ allEvents: EventData[], setEventData: React.Dispatch<React.SetStateAction<EventData[]>> }> = ({ allEvents, setEventData }) => {
    const [selectedEventRegistrations, setSelectedEventRegistrations] = useState<RegistrationFormProps[]>([])
    const [isParticipantsDialogOpen, setIsParticipantsDialogOpen] = useState(false)

    const openParticipantsDialog = (registrations: RegistrationFormProps[]) => {
        setSelectedEventRegistrations(registrations)
        setIsParticipantsDialogOpen(true)
    }

    const handleDeleteRegistration = async (eventId: string, registrationId: string) => {
        const result = await removeRegistration(eventId, registrationId)

        if (result?.success) {
            const updatedEvents = allEvents.map(event => {
                if (event._id === eventId) {
                    return { ...event, registrations: event.registrations.filter(reg => reg._id !== registrationId) }
                }
                return event
            })
            setEventData(updatedEvents)
            setIsParticipantsDialogOpen(false)
            toast.success('Registration deleted')
        } else {
            toast.error('Something went wrong while deleting the registration')
        }
    }

    return (
        <div className='flex flex-col gap-4 pt-2'>
            <div className='flex flex-col gap-4 overflow-y-auto h-screen'>
                {allEvents.sort((a, b) => a.date.getTime() - b.date.getTime()).map((event, index) => (
                    <div className='bg-gray-50 flex flex-row gap-4 items-center p-2 pl-4 rounded-md' key={index}>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row gap-2 items-center'>
                                <p className='text-lg font-bold'>{event.title}</p>
                                <Badge variant='secondary'>
                                    <Image alt={event.language} src={LocaleIcons[event.language]} width={16} />
                                    <p className='text-sm pl-1'>{event.language.toUpperCase()}</p>
                                </Badge>
                                {event.stripePriceId && <Badge variant='success'><Coins className='mx-1' size={20} /></Badge>}
                            </div>
                            <div className='flex flex-row gap-2 items-center'>
                                <p className='text-sm'>{event.date.toLocaleDateString()}</p>
                                <p className='text-sm'>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
                            </div>
                            {/* Participants Dialog Trigger */}
                            {event.registrations?.length > 0 ?

                                <button onClick={() => openParticipantsDialog(event.registrations)}>
                                    <div className='flex flex-row gap-2 items-center hover:underline'>
                                        <UserRound className='-mt-1' size={16} />
                                        <p className='text-sm font-semibold'>{event.registrations?.length} Participant(s)</p>
                                    </div>
                                </button>
                                : <p className='text-sm font-light'>No registrations</p>
                            }
                        </div>
                        <div className='flex flex-row gap-2 ml-auto mr-2'>
                            <UpdateEvent existingEvent={event} allEvents={allEvents} setEventData={setEventData} />
                            <DeleteEvent eventId={event._id} allEvents={allEvents} setEventData={setEventData} />
                        </div>
                    </div>
                ))}
            </div>
            {/* Participants Dialog */}
            {isParticipantsDialogOpen && (
                <Dialog open={isParticipantsDialogOpen} onOpenChange={setIsParticipantsDialogOpen}>
                    <DialogContent className='h-[60vh]'>
                        <DialogHeader>
                            <DialogTitle>Participants</DialogTitle>
                            <DialogClose />
                        </DialogHeader>
                        <div className='overflow-y-auto'>
                            {selectedEventRegistrations.map(registration => (
                                <div key={registration._id} className='flex items-start justify-between p-2 m-2 border-2 rounded-xl'>
                                    <div>
                                        <p className='flex flex-row gap-1 font-semibold'>
                                            <UserRound className='' size={20} />
                                            {registration.nameParticipant} ({registration.email})
                                        </p>
                                        {registration.additionalParticipants!.length > 0 && <div className='text-sm ml-4 p-1 border-2 rounded-xl'>
                                            {registration.additionalParticipants?.map((participant, index) => (
                                                <p key={index} className='pl-2'>{participant.nameParticipant} ({participant.email})</p>
                                            ))}
                                        </div>
                                        }
                                    </div>
                                    <Badge variant='destructive' onClick={() => handleDeleteRegistration(registration.selectedEvent._id, registration._id)} className="hover:cursor-pointer">
                                        <Trash2 size={16} />
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}

export default EventOverview
