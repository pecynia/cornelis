import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import ReviewTopSection from '@/app/[lang]/components/ReviewTopSection'
import ReviewOverview from '@/app/[lang]/components/ReviewOverview'
import ReviewFooter from '@/app/[lang]/components/ReviewFooter'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const { review, navigation } = await getDictionary(lang)

  return (
    <div className='bg-white'>
      <ReviewTopSection lang={lang} review={review} navigation={navigation}/>
      <ReviewOverview lang={lang} review={review} />
      <ReviewFooter lang={lang} />
    </div>
  )
}