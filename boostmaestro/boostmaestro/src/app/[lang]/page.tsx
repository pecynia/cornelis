import { Locale } from '@/app/../../i18n.config'
import EditorServer from '@/app/[lang]/components/editor/EditorServer'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'

export default function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  return (
    <div className='bg-background relative'>
      <div className="relative container mx-auto px-4">
        <EditorServer documentId='home-letter' initialLocale={lang} />
        {/* <EditorServer documentId='home-letter-2' initialLocale={lang} />
        <EditorServer documentId='home-letter-3' initialLocale={lang} />
        <EditorServer documentId='home-letter-4' initialLocale={lang} /> */}
      </div>
    </div>
  )
}
