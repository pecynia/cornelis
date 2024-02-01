import Link from 'next/link'
import { Locale } from '@/app/../../i18n.config'
import Image from 'next/image'
import { getDictionary } from '@/lib/dictionary'
import { contactInfo, socialMedia } from '@/dictionaries/contactInfo'
import { Linkedin, Mail, Phone } from 'lucide-react'
import Logo from '@/../public/logo.png'


export default async function Footer({ lang }: { lang: Locale }) {    
    const { navigation, footer } = await getDictionary(lang)
    return (
        <footer className="relative bg-primary py-8 px-16 text-primary-foreground">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">

                {/* Logo & Description */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-center text-2xl mt-4 mb-2">{footer.description.label}</p>
                    <div className="flex space-x-2 pt-2">
                        <p className="font-light">
                            {footer.description.linkedin}
                        </p>
                        <Link href={socialMedia.linkedin!} target="_blank" className='hover:text-secondary'>
                            <Linkedin className="cursor-pointer -mt-1" />
                        </Link>
                    </div>
                </div>

                {/* Navigation */}
                <div className=''>
                    <h1 className="font-exo text-2xl text-secondary-foreground mb-4">{footer.navigation.label}</h1>
                    {Object.values(navigation).map((navItem, index) => (
                        <Link key={index} href={`/${lang}${navItem.href}`}>
                            <div className="mb-2 hover:underline cursor-pointer">{navItem.label}</div>
                        </Link>
                    ))}
                </div>

                {/* Contact */}
                <div className='space-y-2'>
                    <h1 className="font-exo text-2xl text-secondary-foreground mb-4">{footer.contact.label}</h1>
                    <p>{contactInfo.name}</p>
                    <div className="flex items-center mb-2 hover:text-secondary-foreground">
                        <Mail className="mr-2" />
                        <Link href={`mailto:${contactInfo.email}`}>
                            {contactInfo.email}
                        </Link>
                    </div>
                    <div className="flex items-center hover:text-secondary-foreground">
                        <Phone className="mr-2" />
                        <Link href={`tel:${contactInfo.phone}`}>
                            {contactInfo.phone}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 flex justify-center font-thin items-center space-x-4">
                <p>kvk: {contactInfo.kvk}</p>
                <p>&copy; ERP Masterclasses {new Date().getFullYear()}</p>
                <p>{footer.credit.label} <span className="font-bold">Humainly</span></p>
            </div>
        </footer>
    );
}
