"use client"

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/[lang]/components/ui/alert-dialog"
import { removeEvent } from '@/app/_actions'
import { toast } from 'sonner'
import { EventData } from '@/../typings'
import { Badge } from '@/app/[lang]/components/ui/badge'
import { Trash2 } from 'lucide-react'

type DeleteEventProps = {
    eventId: string
    allEvents: EventData[]
    setEventData: React.Dispatch<React.SetStateAction<EventData[]>>
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ eventId, allEvents, setEventData }) => {
    const handleDelete = async () => {
        try {
            const result = await removeEvent(eventId)
            if (result?.success) {
                setEventData(allEvents.filter(event => event._id !== eventId)) // Remove event
                toast.success('Event successfully deleted')
            } else {
                toast.error('Failed to delete event')
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred while deleting the event. Refresh the page and try again.')
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Badge variant='destructive' className="hover:cursor-pointer">
                    <Trash2 size={16} />
                </Badge>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the event from your agenda.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteEvent