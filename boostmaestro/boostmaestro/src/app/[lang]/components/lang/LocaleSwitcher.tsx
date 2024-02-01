"use client"

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Locale, i18n } from '../../../../../i18n.config'
import Image from 'next/image'
import { motion } from "framer-motion"

import LocaleIcons from '@/app/[lang]/components/lang/LocaleIcon'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/[lang]/components/ui/select"
import React from 'react'

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [selectedLocale, setSelectedLocale] = React.useState(locale)

    const switchLocale = (newLocale: Locale) => {
        if (newLocale !== locale) {
            setSelectedLocale(newLocale)
            router.replace(pathname.replace(`/${locale}`, `/${newLocale}`) + searchParams)
        }
    }

    return (
        <Select value={selectedLocale} onValueChange={switchLocale}>
            <SelectTrigger className="w-[120px] my-1">
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    {i18n.locales.map((loc) => (
                        <SelectItem 
                            key={loc}
                            value={loc}
                            disabled={loc === locale}
                        >
                            <div
                                className="flex items-center">
                                <Image
                                    alt={loc.toUpperCase()}
                                    src={LocaleIcons[loc]}
                                    width={24}
                                    className="mr-2"
                                />
                                {loc.toUpperCase()}
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}