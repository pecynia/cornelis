"use client"

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateEventSchema } from '@/lib/schema'
import { updateEventInDatabase } from '@/app/_actions'
import { Locale, i18n } from '@../../../i18n.config'
import { eventTypes, EventType } from '@../../../event.config'
import { CreateEventProps, EventData } from '@/../typings'
import LocaleIcons from '@/app/[lang]/components/lang/LocaleIcon'
import { toast } from 'sonner'

import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Pencil } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/app/[lang]/components/ui/calendar"
import { Checkbox } from "@/app/[lang]/components/ui/checkbox"
import { Label } from "@/app/[lang]/components/ui/label"
import { Badge } from '@/app/[lang]/components/ui/badge'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/[lang]/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/app/[lang]/components/ui/select"
import Image from 'next/image'
import { Button } from '@/app/[lang]/components/ui/button'
import { Input } from '@/app/[lang]/components/ui/input'
import { Textarea } from '@/app/[lang]/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/app/[lang]/components/ui/dialog"

const UpdateEvent: React.FC<{ existingEvent: EventData, allEvents: EventData[], setEventData: React.Dispatch<React.SetStateAction<EventData[]>> }> = ({ existingEvent, allEvents, setEventData }) => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<CreateEventProps>({
        resolver: zodResolver(CreateEventSchema),
        defaultValues: {
            ...existingEvent,
        }
    })

    // Register the date, language, and shownLanguages fields
    React.useEffect(() => {
        register('type')
        register('date')
        register('language')
        register('shownLanguages')
    }, [register])

    const processForm: SubmitHandler<CreateEventProps> = async (data) => {
        try {
            // Take the _id from the existing event and overwrite the rest of the data
            const updatedEvent = { ...data, _id: existingEvent._id, stripeProductId: existingEvent.stripeProductId, stripePriceId: existingEvent.stripePriceId } as EventData

            const result = await updateEventInDatabase(updatedEvent)

            // Set the updated priceId
            updatedEvent.stripePriceId = result.stripePriceId!

            // Update the event in the state updatedEvents (EventData[])
            const updatedEvents = allEvents.map(event => event._id === updatedEvent._id ? updatedEvent : event)
            setEventData(updatedEvents)

            // Close the dialog
            closeSheet()

            // Show a success toast
            toast.success("Event updated successfully")

        } catch (error) {
            console.error(error)
            toast.error("Failed to update event")
        }
    }

    const [selectedLocale, setSelectedLocale] = React.useState<Locale>(existingEvent.language)
    const [selectedEventType, setSelectedEventType] = React.useState<EventType>(existingEvent.type)
    const [date, setDate] = React.useState<Date | undefined>(new Date(existingEvent.date))
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    const [shownLanguages, setShownLanguages] = React.useState<Locale[]>(existingEvent.shownLanguages)
    const [open, setOpen] = React.useState(false)

    const closeSheet = () => setOpen(false)

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate)
            setValue('date', selectedDate) // Update the registered field
            setIsPopoverOpen(false) // Close the popover on date selection
        }
    }

    const switchLocale = (newLocale: Locale) => {
        setSelectedLocale(newLocale)
        setValue('language', newLocale) // Update the registered field
    }

    const switchEventType = (newEventType: EventType) => {
        setSelectedEventType(newEventType)
        setValue('type', newEventType) // Update the registered field
    }

    const toggleLanguage = (loc: Locale) => {
        const newShownLanguages = shownLanguages.includes(loc)
            ? shownLanguages.filter((l) => l !== loc)
            : [...shownLanguages, loc]
        setShownLanguages(newShownLanguages)
        setValue('shownLanguages', newShownLanguages) // Update the registered field
    }

    // Custom register for requiredRegistrations
    React.useEffect(() => {
        register('requiredRegistrations', {
            setValueAs: (value) => parseInt(value, 10) || 0
        })
        register('price', {
            setValueAs: (value) => parseInt(value, 10) || 0
        })
    }, [register])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Badge className="hover:cursor-pointer">
                    <Pencil size={16} />
                </Badge>
            </DialogTrigger>
            <DialogContent className='h-[80vh]'>
                <DialogHeader>
                    <DialogTitle>
                        Update Event
                    </DialogTitle>
                </DialogHeader>
                <div className='overflow-y-auto'>
                    <form onSubmit={handleSubmit(processForm)} className='flex flex-1 flex-col gap-3 p-2'>
                        <Input {...register('title')} placeholder='Title' className='w-full rounded-lg p-2 border-2 border-gray-100' />
                        {errors.title && <p className='text-sm text-red-400 -mt-2'>{errors.title.message}</p>}

                        <Input {...register('eventSlug')} placeholder='Event Slug' className='w-full rounded-lg p-2 border-2 border-gray-100' />
                        {errors.eventSlug && <p className='text-sm text-red-400 -mt-2'>{errors.eventSlug.message}</p>}

                        <Textarea {...register('description')} placeholder='Description' className='w-full rounded-lg p-2 border-2 border-gray-100' />
                        {errors.description && <p className='text-sm text-red-400 -mt-2'>{errors.description.message}</p>}

                        {/* Price (number) */}
                        <div className='flex flex-col gap-2 w-[240px] '>
                            <div className='pt-2'>
                                <p className='text-sm '>Price</p>
                            </div>
                            <Input
                                placeholder='Price'
                                type='number'
                                {...register('price')}
                                className='w-full rounded-lg p-2 border-2 border-gray-100'
                                min="0"
                                onChange={(e) => setValue('price', parseInt(e.target.value))}
                            />
                            {errors.price && <p className='text-sm text-red-400 -mt-2'>{errors.price.message}</p>}
                        </div>
                        {/* Event Type */}
                        <div className='flex flex-col gap-2 w-[240px] '>
                            <div className='pt-2'>
                                <p className='text-sm '>Event Type</p>
                            </div>
                            <Select value={selectedEventType} onValueChange={switchEventType}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {selectedEventType ? (
                                            <div className="flex items-center">
                                                {selectedEventType.charAt(0).toUpperCase() + selectedEventType.slice(1)}
                                            </div>
                                        ) : (
                                            "Choose Event Type"
                                        )}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {eventTypes.types.map((type, index) => (
                                            <SelectItem key={index} value={type}>
                                                <div className="flex items-center">
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date Picker */}
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date || undefined}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>

                            {/* Error Message */}
                            {errors.date && <p className='text-sm text-red-400 -mt-2'>{errors.date.message}</p>}
                        </Popover>

                        {/* Location */}
                        <Input {...register('location')} placeholder='Location (optional)' className='w-full rounded-lg p-2 border-2 border-gray-100' />
                        {errors.location && <p className='text-sm text-red-400 -mt-2'>{errors.location.message}</p>}

                        {/* Required Registrations (number) */}
                        <div className='flex flex-col gap-2 w-[240px] '>
                            <div className='pt-2'>
                                <p className='text-sm '>Required Registrations</p>
                            </div>
                            <Input
                                placeholder='Required Registrations'
                                type='number'
                                {...register('requiredRegistrations')}
                                className='w-full rounded-lg p-2 border-2 border-gray-100'
                                min="1"
                                onChange={(e) => setValue('requiredRegistrations', parseInt(e.target.value, 10))}
                            />
                            {errors.requiredRegistrations && <p className='text-sm text-red-400 -mt-2'>{errors.requiredRegistrations.message}</p>}
                        </div>

                        {/* Language */}
                        <div className='flex flex-col gap-2 w-[240px] '>
                            <div className='pt-2'>
                                <p className='text-sm '>Event language</p>
                            </div>
                            <Select value={selectedLocale} onValueChange={switchLocale}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {selectedLocale ? (
                                            <div className="flex items-center">
                                                <Image
                                                    src={LocaleIcons[selectedLocale]}
                                                    alt={selectedLocale.toUpperCase()}
                                                    width={24}
                                                    height={24}
                                                    className="mr-2"
                                                />
                                                {selectedLocale.toUpperCase()}
                                            </div>
                                        ) : (
                                            "Choose Language"
                                        )}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {i18n.locales.map((loc) => (
                                            <SelectItem key={loc} value={loc}>
                                                <div className="flex items-center">
                                                    <Image
                                                        src={LocaleIcons[loc]}
                                                        alt={loc.toUpperCase()}
                                                        width={24}
                                                        height={24}
                                                        className="mr-2"
                                                    />
                                                    {loc.toUpperCase()}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>


                        {/* Multiple Languages Selector */}
                        <div className='flex flex-col gap-2'>
                            <div className='pt-2'>
                                <p className='text-sm '>Show event in site versions</p>
                            </div>
                            <div className='flex flex-wrap'>
                                {i18n.locales.map((loc) => (
                                    <div key={loc} className="flex items-center mr-2 mb-2">
                                        <Badge className="p-2" variant="outline">
                                            <Checkbox
                                                checked={shownLanguages.includes(loc)}
                                                onCheckedChange={() => toggleLanguage(loc)}
                                            />
                                            <Label className="flex items-center ml-3">
                                                <Image src={LocaleIcons[loc]} alt={loc.toUpperCase()} width={24} height={24} />
                                                <span className='ml-2'>{loc.toUpperCase()}</span>
                                            </Label>
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                            {errors.shownLanguages && <p className='text-sm text-red-400 -mt-2'>{errors.shownLanguages.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <Button
                            disabled={isSubmitting}
                            className='rounded-lg bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                            {isSubmitting ? 'Updating...' : 'Update Event'}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateEvent