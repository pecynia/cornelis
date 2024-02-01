import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import PricingOverview from '@/app/[lang]/components/PricingOverview'
import AgendaOverview from '@/app/[lang]/components/AgendaOverview'
import CustomOverview from '@/app/[lang]/components/CustomOverview'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const { navigation, pricing, agenda } = await getDictionary(lang)

  return (
    <div className='bg-background pb-20 pt-10'>
      <div className='relative max-w-5xl mx-auto px-4 py-4 '>
        <div className='mx-auto w-full sm:w-2/3 md:w-full justify-center space-y-6 md:space-y-10'>
          <PricingOverview lang={lang} navigation={navigation} pricing={pricing} />
          <CustomOverview lang={lang} navigation={navigation} pricing={pricing} />
          <AgendaOverview lang={lang} navigation={navigation} agenda={agenda} />
        </div>
      </div>
    </div>
  )
}