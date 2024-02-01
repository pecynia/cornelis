import { Locale } from "@../../../i18n.config"
import EditorWrapper from "@/app/[lang]/components/editor/EditorWrapper"
import { Button } from "@/app/[lang]/components/ui/button"
import Link from "next/link"



const CustomOverview = ({ lang, pricing, navigation }: { lang: Locale, pricing: any, navigation: any }) => {

    return (
        <div className='flex flex-col items-center justify-center py-10'>
            <div className='relative rounded-xl bg-white shadow-right-secondary w-full md:w-2/3'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8'>
                    <h1 className='text-3xl font-bold pb-4'>
                        {pricing.type2.title}
                    </h1>
                    <hr className='' />
                    <EditorWrapper initialLocale={lang} documentId='pricing-card-2' />
                    <Button size='lg' variant='secondary' className='text-md'>
                        <Link href={`/${lang}${navigation.contact.href}`} className='flex items-center'>
                            {pricing.type2.buttonText}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CustomOverview
