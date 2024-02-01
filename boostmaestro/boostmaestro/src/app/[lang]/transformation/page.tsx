import React from 'react'
import { Locale } from '@/app/../../../i18n.config'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import { getDictionary } from '@/lib/dictionary'
import TransformationEventOverview from '@/app/[lang]/components/TransformationEventOverview'
import Image from 'next/image'
import Groep3 from '@/../public/imgs/uitleg-intens.png'

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
                        {agenda.transformation}
                    </h1>
                </div>
            </div>
            {/* Section with Background Image at the Bottom */}
            <div className="relative w-full bg-background pt-12 pb-36">
                <div className='flex flex-col max-w-5xl mx-auto px-8 pt-8 pb-40 md:pb-32 lg:pb-24 min-h-screen'>
                    <EditorWrapper documentId='transformation-day-planning' initialLocale={lang} />
                </div>
                {/* Absolute positioned Image at the bottom */}
                <div className="absolute top-0 right-0 lg:bottom-0 lg:left-0 w-1/2 md:w-1/3 lg:w-1/4 -z-1">
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
                        {agenda.upcomingTransformationMasterclasses}
                    </h1>
                    <hr />
                    <TransformationEventOverview lang={lang} agenda={agenda} />
                </div>
            </div>

        </div>
    )
}