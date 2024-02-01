import React from 'react'
import { Locale } from '@../../../i18n.config'
import SuccessEventOverview from '@/app/[lang]/components/SuccessEventOverview'
import TransformationEventOverview from '@/app/[lang]/components/TransformationEventOverview'
import Link from 'next/link'

const AgendaSection = ({ lang, title, link, children }: { lang: Locale, title: string, link: any, children: React.ReactNode }) => (
    
    <div className='flex flex-col max-w-5xl mx-auto px-8 py-8'>
        <Link href={`/${lang}${link}`}>
            <h1 className='text-2xl font-bold pb-6 hover:text-secondary cursor-pointer'>{title}</h1>
        </Link>
        <hr />
        {children}
    </div>
)

const AgendaOverview = ({ lang, agenda, navigation }: { lang: Locale, agenda: any, navigation: any }) => {
    return (
        <div 
            id='agenda'
            className='relative rounded-xl bg-white shadow-right-secondary'
        >
            {/* Success Agenda Section */}
            <AgendaSection lang={lang} title={agenda.upcomingSuccessMasterclasses} link={navigation.success.href}>
                <SuccessEventOverview lang={lang} agenda={agenda} />
            </AgendaSection>

            {/* Transformation Agenda Section */}
            <AgendaSection lang={lang} title={agenda.upcomingTransformationMasterclasses} link={navigation.transformation.href}>
                <TransformationEventOverview lang={lang} agenda={agenda} />
            </AgendaSection>
        </div>
    )
}

export default AgendaOverview
