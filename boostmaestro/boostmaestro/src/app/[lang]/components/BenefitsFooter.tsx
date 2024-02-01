import React from 'react'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import Groep2 from '@/../public/imgs/groep-2.jpg'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/[lang]/components/ui/button'


const BenefitsFooter: React.FC<{ lang: Locale }> = async ({ lang }) => {
    
    const { navigation } = await getDictionary(lang)

    return (
        <div className='flex flex-col relative pb-10'>
            <Image 
                src={Groep2}
                alt="Image" 
                fill
                className="object-cover object-center"
                style={{ objectPosition: 'center 15%' }}
            />
            <div className='relative container mx-auto px-4 py-36'>
                <div className='bg-white shadow-xl py-10 px-4 rounded-xl flex flex-col items-center justify-center text-center w-full lg:w-2/3 mx-auto'>
                    <EditorWrapper initialLocale={lang} documentId='benefits-footer' />
                    <div className='flex flex-col md:flex-row md:space-x-4 mt-4 gap-2 md:py-0'>
                        <Button size='lg' variant='secondary' className='text-md'>
                            <Link href={`/${lang}${navigation.success.href}`} className='flex items-center'>
                                {navigation.success.label}
                            </Link>
                        </Button>
                        <Button size='lg' variant='secondary' className='text-md'>
                            <Link href={`/${lang}${navigation.transformation.href}`} className='flex items-center'>
                                {navigation.transformation.label}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BenefitsFooter