import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import OrderOverview from '@/app/[lang]/components/OrderOverview'
import { Suspense } from 'react'

export default async function Page({
    params: { lang }
  }: {
    params: { lang: Locale }
  }) {

    const { payments } = await getDictionary(lang)

    return (
        <div className='bg-background pb-20 pt-10'>
            <div className='relative max-w-5xl mx-auto px-4 py-4 '>
                <div className='mx-auto w-full sm:w-2/3 justify-center space-y-6 md:space-y-10'>
                    <Suspense fallback={<div></div>}>
                        <OrderOverview payments={payments} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
