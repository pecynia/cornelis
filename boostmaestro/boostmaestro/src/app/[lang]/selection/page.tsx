import React from 'react'
import { Locale } from '@/app/../../../i18n.config'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import { getDictionary } from '@/lib/dictionary'
import SuccessEventOverview from '@/app/[lang]/components/SuccessEventOverview'
import Image from 'next/image'
import Groep3 from '@/../public/imgs/spokeperson2.png'

export default async function Page({
    params: { lang }
}: {
    params: { lang: Locale }
}) {

    const { agenda } = await getDictionary(lang)

    return (
        <div className=''>
            <div className='w-full bg-secondary pt-12 pb-6'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8 '>
                    <h1 className='text-4xl font-bold pb-6 text-white'>
                        {agenda.success}
                    </h1>
                </div>
            </div>
            {/* Section with Background Image at the Bottom */}
            <div className="relative w-full bg-background pt-12 pb-36">
                <div className='flex flex-col max-w-5xl mx-auto px-8 pt-8 pb-40 md:pb-32 lg:pb-24 min-h-screen'>
                    <EditorWrapper documentId='success-day-planning' initialLocale={lang} />
                </div>
                {/* Absolute positioned Image at the bottom */}
                <div className="absolute bottom-0 right-0 w-1/2 md:w-1/3 lg:w-1/4 -z-1">
                    <Image
                        src={Groep3}
                        alt="Background Image"
                        layout="responsive"
                        className="object-cover object-bottom"
                        style={{ zIndex: -1 }}
                    />
                </div>
            </div>
            <div className='w-full bg-secondary pt-12 pb-36'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8 '>
                    <h1 className='text-4xl font-bold pb-6 text-white'>
                        {agenda.upcomingSuccessMasterclasses}
                    </h1>
                    <hr />
                    <SuccessEventOverview lang={lang} agenda={agenda} />
                </div>
            </div>

        </div>
    )
}