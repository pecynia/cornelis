import React from 'react'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { socialMedia } from '@/dictionaries/contactInfo'
import Link from 'next/link'
import { Button } from '@/app/[lang]/components/ui/button'
import { Linkedin } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'


const AboutFooter: React.FC<{ lang: Locale }> = async ({ lang }) => {
    
    const { about } = await getDictionary(lang)

    return (
        <div className='flex flex-col relative pb-10 bg-secondary'>
            {/* <Image 
                src={Groep2}
                alt="Image" 
                fill
                className="object-cover object-center"
                style={{ objectPosition: 'center 15%' }}
            /> */}
            <div className='relative container mx-auto px-4 py-16'>
                <div className='py-10 rounded-xl flex flex-col items-center justify-center text-center w-full lg:w-2/3 mx-auto'>
                    <Button size='lg' variant='outline' className='text-md md:text-xl text-white'>
                        <Link href={socialMedia.linkedin!} className='flex items-center' rel='noopener noreferrer' target='_blank'>
                            <Linkedin size={24} className='mr-4 -mt-1' />
                            {about.linkedin}
                            <ArrowUpRight size={24} className='ml-2' />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AboutFooter