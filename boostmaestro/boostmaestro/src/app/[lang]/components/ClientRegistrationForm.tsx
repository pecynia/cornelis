"use client"

import React, { useState } from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { RegistrationFormSchema } from '@/lib/schema'
import { Trash2 } from 'lucide-react'
import { Badge } from '@/app/[lang]/components/ui/badge'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { EventProps, RegistrationFormProps } from '@../../../typings'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/app/[lang]/components/ui/select"
import { Locale } from '@../../../i18n.config'
import { checkout } from '@/lib/checkout'

export type RegistrationFormInputs = z.infer<typeof RegistrationFormSchema>

export type ClientRegistrationFormProps = {
    lang: Locale
    selectedEvent?: EventProps
    events: EventProps[]
    localization: {
        registrationFormTitle: string
        selectMasterclass: string
        companyNamePlaceholder: string
        addressPlaceholder: string
        countryPlaceholder: string
        namePlaceholder: string
        phonePlaceholder: string
        emailPlaceholder: string
        companyWebsitePlaceholder: string
        positionPlaceholder: string
        vatPlaceholder: string
        poPlaceholder: string
        submitButtonText: string
        submitButtonTextSending: string
        emailSentToast: string
        errorToast: string
        additionalParticipantButton: string
        additionalParticipants: string
        registerButtonText: string
        registerButtonTextSending: string
        priceOverview: string
        pricePerParticipant: string
        totalParticipants: string
        totalPrice: string
    }
    errorMessages: {
        companyNameRequired: string
        companyWebsiteRequired: string
        nameRequired: string
        phoneRequired: string
        emailRequired: string
        addressRequired: string
        countryRequired: string
        positionRequired: string
        vatNumberRequired: string
        invalidEmail: string
        messageRequired: string
        messageMinLength: string
        eventRequired: string
    }
}

const ClientRegistrationForm: React.FC<ClientRegistrationFormProps> = ({ lang, selectedEvent, events, localization, errorMessages }) => {
    const { register, control, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<RegistrationFormInputs>({
        resolver: zodResolver(RegistrationFormSchema),
        defaultValues: {
            selectedEvent: selectedEvent // If you want to change the props here, also adjust the RegistrationFormSchema.selectedEvent
        }
    })

    const processForm: SubmitHandler<RegistrationFormInputs> = async data => {
        const _id = Math.random().toString(36)
        const registrationData = { ...data, _id } as RegistrationFormProps
        try {
            await checkout(lang, registrationData)
            reset()
        } catch (error) {
            toast.error(localization.errorToast)
        }
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: "additionalParticipants"
    })
    // Add participants
    const handleAddParticipant = () => {
        append({ nameParticipant: '', email: '', phone: '', position: '' })
    }
    // Remove participants
    const handleRemoveParticipant = (index: number) => {
        remove(index)
    }

    // Event selection
    const [event, setEvent] = useState<EventProps | undefined>(selectedEvent)
    React.useEffect(() => {
        register('selectedEvent')
    }, [register])
    const switchEvent = (eventId: string) => {
        const newEvent = events.find(event => event._id === eventId)
        setEvent(newEvent)
        setValue('selectedEvent', newEvent!)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ease: "easeInOut", duration: 0.5 }}
            viewport={{ once: true }}
            className='relative min-w-[70%] lg:min-w-[40%] min-h-[20%] max-w-[90%] mb-20 pb-10 flex px-10 pt-4 rounded-xl  bg-white shadow-xl'
        >
            <div className='w-full pt-2'>
                <h1 className='text-xl font-semibold pb-4 pt-2'>
                    {localization.registrationFormTitle}
                </h1>
                <form onSubmit={handleSubmit(processForm)} className='mx-auto flex flex-1 flex-col gap-4'>

                    {/* Event Type */}
                    <div className='flex flex-col gap-2 w-full '>
                        <div className='pt-2'>
                            <p className='text-sm'>Masterclass</p>
                        </div>
                        <Select value={event?._id} onValueChange={switchEvent}>
                            <SelectTrigger>
                                <SelectValue>
                                    {event ? (
                                        <div className="flex items-center">
                                            <span className='font-normal'>{event.title}</span>: {event.date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <span className='font-normal'>{localization.selectMasterclass}</span>
                                        </div>
                                    )}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Masterclasses</SelectLabel>
                                    {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((masterclass, index) => (
                                        <SelectItem key={index} value={masterclass._id} disabled={masterclass === event}>
                                            <div className="flex items-center">
                                                <span className='font-normal'>{masterclass.title}</span>: {masterclass.date.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                            {errors.selectedEvent && <p className='text-sm text-red-400'>{errorMessages.eventRequired}</p>}
                        </Select>
                    </div>
                    <hr />

                    {/* Company Name Input */}
                    <input
                        {...register('companyName')}
                        placeholder={localization.companyNamePlaceholder}
                        className='w-1/2 rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.companyName && <p className='text-sm text-red-400'>{errorMessages.companyNameRequired}</p>}

                    {/* Address Input */}
                    <input
                        {...register('address')}
                        placeholder={localization.addressPlaceholder}
                        className='w-full rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.address && <p className='text-sm text-red-400'>{errorMessages.addressRequired}</p>}

                    {/* Country Input */}
                    <input
                        {...register('country')}
                        placeholder={localization.countryPlaceholder}
                        className='w-1/2 rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.country && <p className='text-sm text-red-400'>{errorMessages.countryRequired}</p>}

                    {/* VAT Number Input */}
                    <input
                        {...register('vatNumber')}
                        placeholder={localization.vatPlaceholder}
                        className='w-2/3 rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.vatNumber && <p className='text-sm text-red-400'>{errorMessages.vatNumberRequired}</p>}

                    {/* Company website  */}
                    <input
                        {...register('companyWebsite')}
                        placeholder={localization.companyWebsitePlaceholder}
                        className='w-2/3 rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.companyWebsite && <p className='text-sm text-red-400'>{errorMessages.companyWebsiteRequired}</p>}


                    {/* Name Input */}
                    <input
                        {...register('nameParticipant')}
                        placeholder={localization.namePlaceholder}
                        className='w-1/2 rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.nameParticipant && <p className='text-sm text-red-400'>{errorMessages.nameRequired}</p>}

                    {/* Email Input */}
                    <input
                        {...register('email')}
                        placeholder={localization.emailPlaceholder}
                        className='w-2/3 rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.email && <p className='text-sm text-red-400'>
                        {errors.email.message === '1' ? errorMessages.emailRequired : errorMessages.invalidEmail}
                    </p>}

                    {/* Phone Input */}
                    <input
                        {...register('phone')}
                        placeholder={localization.phonePlaceholder}
                        className='w-2/3 rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.phone && <p className='text-sm text-red-400'>{errorMessages.phoneRequired}</p>}

                    {/* Position Input */}
                    <input
                        {...register('position')}
                        placeholder={localization.positionPlaceholder}
                        className='w-2/3 rounded-lg p-2 border-2 border-gray-100'
                    />
                    {errors.position && <p className='text-sm text-red-400'>{errorMessages.positionRequired}</p>}

                    {/* PO Number Input */}
                    <input
                        {...register('poNumber')}
                        placeholder={localization.poPlaceholder}
                        className='w-full rounded-lg p-2 border-2 border-gray-100'
                    />

                    {/* Additional Participants */}
                    {fields.length > 0 && (
                        <hr />
                    )}
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <div className='flex flex-row justify-between items-center gap-4 mb-2'>
                                <h1 className='font-semibold'>
                                    {localization.additionalParticipants} {index + 1}
                                </h1>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveParticipant(index)}
                                >
                                    <Badge variant='destructive' className="hover:cursor-pointer">
                                        <Trash2 size={16} />
                                    </Badge>
                                </button>
                            </div>
                            <div className='flex flex-row gap-2 pb-2'>
                                <div className='w-full'>
                                    <input
                                        {...register(`additionalParticipants.${index}.nameParticipant` as const)}
                                        placeholder={localization.namePlaceholder}
                                        className='w-full rounded-lg p-2 border-2 border-gray-100'
                                    />
                                    {errors.additionalParticipants?.[index]?.nameParticipant?.message && (
                                        <p className='text-sm text-red-400'>
                                            {errors.additionalParticipants[index]?.nameParticipant?.message && errorMessages.nameRequired}
                                        </p>
                                    )}
                                </div>
                                <div className='w-full'>
                                    <input
                                        {...register(`additionalParticipants.${index}.email` as const)}
                                        placeholder={localization.emailPlaceholder}
                                        className='w-full rounded-lg p-2 border-2 border-gray-100'
                                    />
                                    {errors.additionalParticipants?.[index]?.email?.message && (
                                        <p className='text-sm text-red-400'>
                                            {errors.additionalParticipants[index]?.email?.message === '1' ? errorMessages.emailRequired : errorMessages.invalidEmail}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='w-full'>
                                    <input
                                        {...register(`additionalParticipants.${index}.phone` as const)}
                                        placeholder={localization.phonePlaceholder}
                                        className='w-full rounded-lg p-2 border-2 border-gray-100'
                                    />
                                    {errors.additionalParticipants?.[index]?.phone?.message && (
                                        <p className='text-sm text-red-400'>
                                            {errors.additionalParticipants[index]?.phone?.message && errorMessages.phoneRequired}
                                        </p>
                                    )}
                                </div>
                                <div className='w-full'>
                                    <input
                                        {...register(`additionalParticipants.${index}.position` as const)}
                                        placeholder={localization.positionPlaceholder}
                                        className='w-full rounded-lg p-2 border-2 border-gray-100'
                                    />
                                    {errors.additionalParticipants?.[index]?.position?.message && (
                                        <p className='text-sm text-red-400'>
                                            {errors.additionalParticipants[index]?.position?.message && errorMessages.positionRequired}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Participant Button */}
                    <button type="button" onClick={handleAddParticipant} className='rounded-lg bg-secondary py-2.5 font-medium text-white transition-colors hover:bg-secondary/80'>
                        {localization.additionalParticipantButton}
                    </button>

                    {/* Price overview (use event.price * number of participants )*/}
                    <hr />
                    <div className='flex flex-row justify-between items-center mb-2'>
                        <h1 className='font-semibold'>
                            {localization.priceOverview}
                        </h1>
                    </div>

                    {/* Price */}
                    <div className=''>
                        {fields.length > 0 && (
                            <div>
                                <div className='flex flex-row gap-4'>
                                    <div className='w-full'>
                                        <p className='text-sm'>{localization.pricePerParticipant}</p>
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-sm text-right'>€ {event!.price} </p>
                                    </div>
                                </div>

                                {/* Total participants */}
                                <div className='flex flex-row gap-4 justify-between'>
                                    <div className='w-full'>
                                        <p className='text-sm'>{localization.totalParticipants}</p>
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-sm text-right'>{fields.length + 1}</p>
                                    </div>
                                </div>
                                <hr className='my-1' />
                            </div>
                        )}

                        {/* Total price */}
                        {event && (
                            <div className='flex flex-row gap-4'>
                                <div className='w-full'>
                                    <p className='text-sm'>{localization.totalPrice}</p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-sm text-right'>€ {(fields.length + 1) * event.price} </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isSubmitting}
                        className='rounded-lg bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        {isSubmitting ? localization.registerButtonTextSending : localization.registerButtonText}
                    </button>
                </form>
            </div>
        </motion.div>
    )
}

export default ClientRegistrationForm

