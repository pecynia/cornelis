import { Locale } from '@/app/../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import HomeTopSection from '@/app/[lang]/components/HomeTopSection'
import HomeOverview from '@/app/[lang]/components/HomeOverview'

export default async function Home({
    params: { lang }
  }: {
    params: { lang: Locale }
  }) {
    
    return (
      <div className=''>
        <HomeTopSection lang={lang} />
        <HomeOverview lang={lang} />
      </div>
  )
}
